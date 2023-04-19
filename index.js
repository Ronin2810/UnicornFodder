const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const mysql = require('mysql')
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser')
const investor_router = require('./routes/investor')
const startup_router = require('./routes/startup')
const path = require('path')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use("/static",express.static("static"))
const static_path = path.join(__dirname,"static")
app.use(express.static(static_path))

app.use(express.static('data'))
app.use(cookieParser())

app.set('view engine','ejs')


const db_mongo = 'mongodb://127.0.0.1:27017/UFdb'
mongoose.connect(db_mongo)
.then(()=>{
    console.log("MongoDB Connection Successful");
})
.catch((err)=>{
    console.log(err);
})

const store = new MongoDBSession({
    uri: db_mongo,
    collection:'sessions'
})

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET,
    store:store
}))

const port = process.env.port || 5000
app.listen(port,()=>{
    console.log(`Server listening on port ${port} ...Go to http://localhost:${port}`);
})
app.use('/',investor_router)
app.use('/',startup_router)

