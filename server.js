// require

require('./connect-database')

const express = require('express')
const router = require('express-async-router').AsyncRouter()

const app = express()

// middleware

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.urlencoded({ extended: false }))

// router

router.get('/', require('./controllers/renderEmployees'))

app.use('/', router)

// listening

app.listen(3000, () => {
  console.log('App listening on http://127.0.0.1:3000')
})

// employees -> { _id, code, name, email, salary, gender, birthDate, isActive, departmentId }
  // E0001
  // E9999
// departments -> { _id, name, short }

// employees (1) -> departments (n)
