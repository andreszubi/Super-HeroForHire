// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'Super-HeroForHire'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

// 👇 Start handling routes here
const indexRoutes = require('./routes/home.routes')
app.use('/', indexRoutes)

const proRoutes = require('./routes/pro-logged.routes')
app.use('/auth/pro', proRoutes)

const clientRoutes = require('./routes/client-logged.routes')
app.use('/auth/client', clientRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
