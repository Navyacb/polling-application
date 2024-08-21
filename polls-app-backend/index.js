require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {checkSchema} = require('express-validator')
const configDB = require('./config/database')
const userController = require('./app/controllers/user-controller')
const {userLoginValidationSchema,userRegisterValidationSchema} = require('./app/helper/user-validation')
const { authentication } = require('./app/middlewears/authentication')
const categoryController = require('./app/controllers/category-controller')
const categoryValidationSchema = require('./app/helper/category-validation')
const pollsValidationSchema = require('./app/helper/polls-validation')
const pollsController = require('./app/controllers/polls-controller')

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors({
    origin : process.env.FRONT_END_URL, 
    credentials : true
}))
app.use(cookieParser())
configDB()

app.post('/auth/register',checkSchema(userRegisterValidationSchema),userController.register)
app.post('/auth/login',checkSchema(userLoginValidationSchema),userController.login)
app.get('/users/account',authentication,userController.account)
app.get('/auth/verify-token', authentication,userController.verifyToken)
app.post('/auth/logout',userController.logout)
app.get('/users/category',categoryController.list)
app.post('/users/addCategory',authentication,checkSchema(categoryValidationSchema),categoryController.create)
app.post('/users/poll',authentication,checkSchema(pollsValidationSchema),pollsController.create)


app.listen(port,()=>{
    console.log(`server up and running on ${port}`)
})