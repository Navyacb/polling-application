require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {checkSchema} = require('express-validator')
const configDB = require('./config/database')
const userController = require('./app/controllers/user-controller')
const {userLoginValidationSchema,userRegisterValidationSchema} = require('./app/helper/user-validation')
const { authentication } = require('./app/middlewears/authentication')

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors({origin : 'http://localhost:5173', credentials : true}))
app.use(cookieParser())
configDB()

app.post('/auth/register',checkSchema(userRegisterValidationSchema),userController.register)
app.post('/auth/login',checkSchema(userLoginValidationSchema),userController.login)
app.get('/users/account',authentication,userController.account)
app.get('/auth/verify-token', authentication,userController.verifyToken)
app.post('/auth/logout',userController.logout)


app.listen(port,()=>{
    console.log(`server up and running on ${port}`)
})