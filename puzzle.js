// Snippets de código para poder componer el programa

//Usado?: yes
  const middlewares = require('./middlewares');
//--- Explicación: en app.js, para poder usar middlewares en el programa

// -------------------------------------------------------------------------------------

//Usado?: yes 
const bodyParser = require('body-parser');
//--- Explicación: in middlewares.js, to parse the body of the request

// -------------------------------------------------------------------------------------

//Usado?: yes
const session = require('express-session');
//--- Explicación: in middlewares.js, to manage sessions in the app

// -------------------------------------------------------------------------------------

//Usado?: yes
const express = require('express');
//--- Explicación: lo he usado para importar express y poder usarlo en el programa

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: 
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes
const dotenv = require('dotenv');
//--- Explicación: in app.js, import dotenv to be able to read .env (environment variabels)

// -------------------------------------------------------------------------------------

//Usado?: yes
const middlewares = require('./middlewares');
//--- Explicación: in routes.js, import middlewares to be able to use them in the program

// -------------------------------------------------------------------------------------

//Usado?: yes
const routes = require('./routes');
//--- Explicación: in app.js, to be able to use routes in the program

// -------------------------------------------------------------------------------------

//Usado?: yes
dotenv.config();
//--- Explicación: in app.js, to intialize dotenv and be able to use it in the program

// -------------------------------------------------------------------------------------

//Usado?: yes
const app = express();
//--- Explicación: para inciar express y poder usarlo en el programa

// -------------------------------------------------------------------------------------

//Usado?: yes
const PORT = 4000;
//--- Explicación: en app.js para definir el puerto en el que se ejecutará el servidor

// -------------------------------------------------------------------------------------

//Usado?: 
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes
middlewares.setupApp(app);
//--- Explicación: in app.js, to setup/configure the app with middlewares

// -------------------------------------------------------------------------------------

//Usado?: yes
routes.setup(app);
//--- Explicación: in app.js, to configure the routes in the app

// -------------------------------------------------------------------------------------

//Usado?: yes
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: in middlewares.js, to validate the word entered by the user in the form, whether it is correct or not


// -------------------------------------------------------------------------------------


//Usado?: yes
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: in routes.js, to setup the routes in the app, in this case, the home route


// -------------------------------------------------------------------------------------


//Usado?: yes
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: inside the home route (const setup), to send the HTML response to the user with a form to enter the secret word


// -------------------------------------------------------------------------------------

//Usado?: yes
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: in middlewares.js, to setup the app with bodyParser and session middlewares

// -------------------------------------------------------------------------------------

//Usado?: yes
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: in route.js, to handle the POST request from the form in the home route, to validate the word entered by the user and redirect to the profile route if it is correct

// -------------------------------------------------------------------------------------

//Usado?:
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: yes
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: en app.js para que el servidor empiece a escuchar en el puerto configurado

// -------------------------------------------------------------------------------------

//Usado?: yes
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: in middlewares.js, to verify if the user is logged in or not, if not, redirect to the home page with an error message

// -------------------------------------------------------------------------------------


//Usado?: yes
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: in routes.js to handle the GET request to the profile route, to verify if the user is logged in or not, and if so, show the profile page with a logout button

// -------------------------------------------------------------------------------------


//Usado?: yes
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: in routes.js to handle the POST request to logout the user, destroy the session and redirect to the home page

// -------------------------------------------------------------------------------------

//Usado?: yes
module.exports = {
  setup,
};
//--- Explicación: to export the setup function to be used in app.js

// -------------------------------------------------------------------------------------

//Usado?: yes
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: to export the middlewares to be used in the app

// -------------------------------------------------------------------------------------

