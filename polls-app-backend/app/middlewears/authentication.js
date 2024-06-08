const jwt = require('jsonwebtoken')
const _= require('lodash')

exports.authentication = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.redirect('/login')
    }
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = _.pick(user,['id'])
        next()
    }
    catch(error){
        res.clearCookie('token')
        return res.redirect('/login')
    }
}