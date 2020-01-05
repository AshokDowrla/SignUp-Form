const express = require('express')
const app = express()

const db = require('./config/keys').mongoURI

const morgan = require('morgan')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')


const userRouter = require('./api/routes/users')
const authRouter = require('./api/routes/auth')
const listRouter = require('./api/routes/userlist')

mongoose.connect(db,


    {

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }

)


app.use(morgan('dev'))

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



///routes

app.use('/form', userRouter)

app.use('/form',authRouter)
app.use('/form', listRouter)

// error cathcers
app.use((req, res, next) => {
    const error = new Error('Not Found')

    error.status = 404

    next(error)


})

app.use((error, req, res, next) => {
    res.status = error.status || 500

    res.json({
        error: {
            message: error.message
        }
    })
})



module.exports=app