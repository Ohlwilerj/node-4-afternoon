require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const middleware = require('./middlewares/checkForeSession')
const ctrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')
const {SERVER_PORT, SESSION_SECRET} = process.env


// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60* 60 * 24
    }
}))

// MIDDLEWARE
app.use(middleware.checkForSession)
app.use(express.static(`${__dirname}/../build`))


// ENDPOINTS
// SWAG
app.get('/api/swag',ctrl.read)
// AUTH
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)
// CART
app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)
// SEARCH
app.get('/api/search', searchCtrl.search)



app.listen(SERVER_PORT, () => console.log(`I made ${SERVER_PORT} dollars  yesterday`))