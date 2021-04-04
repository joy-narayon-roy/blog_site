require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const session = require("express-session");
const flash = require("express-flash");
var chalk = require("chalk");


const User = require('./models/user.js')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()


//Use Database start
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.yiali.mongodb.net/siteData?retryWrites=true&w=majority`
mongoose.connect(url, {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true
}).catch(e=> {
    console.log(chalk.red(e))})

var store = new MongoDBStore(
    {
        uri: url,
        databaseName: 'siteData',
        collection: 'sessionsData',
        expires: 1000 * 60 * 60 * 2
    })
//Use Database end


//Import Router

const useAllRouters = require("./routes/allRouters.js");

//routes.js
app.use(express.urlencoded({
    extended: true
}))

//My middle war start
function tinyLogger(req, res, next) {
    console.log(`${req.method} - ${req.url}`)
    next()
}

const {
    bindUserRequest
} = require("./middleWere/othMiddlewere.js");
const setLocals = require("./middleWere/setLocals.js")

//Use middlewar
const allMiddleWar = [express.static('public'),
    tinyLogger,
    express.json(),
    session({
        secret: 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserRequest(),
    setLocals(),
    flash()
]
app.use(allMiddleWar)
//My middle war end


app.set('view engine', 'ejs')

//Use Routes
useAllRouters(app)

app.get('*', (req, res)=> {
    res.send('<h1>404 Not Found</h1>')
})

app.listen(8080, (err)=> {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(chalk.green("Server is running at 8080."))
    }
})