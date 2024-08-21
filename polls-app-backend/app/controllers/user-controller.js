const User = require('../models/user-model')
const { validationResult} = require('express-validator')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {}

userController.register= async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['username','email','password'])
    try{
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword
        await user.save()
        res.json({
            message : 'User registered successfully !!!',
            user : user
        })

    }
    catch(error){
        res.status(500).json(error)
    }
}

userController.login = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const body = _.pick(req.body,['email','password'])
    
    try{
        const user = await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({errors:[{ msg: 'invalid email or password' }]})
        }

        const result = await bcrypt.compare(body.password,user.password)
        if(!result){
            return res.status(404).json({errors:[{ msg: 'invalid email or password' }]})
        }
  
        const tokenData = { id: user._id }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:'5000s'})
        res.cookie("token",token,{
            httpOnly : true,
            sameSite : 'strict',
            expires : new Date(new Date().getTime() + 5000 * 1000),
            secure: process.env.NODE_ENV === 'production',
        }).json({ message: 'Login successful'})
    }
    catch(error){
        res.status(500).json(error)
    }

}

userController.account = async(req,res)=>{
    try{
        const user = await User.findById({_id : req.user.id})
        res.json(user)
    }
    catch(error){
        res.status(500).json(error)
    }
}

userController.verifyToken = async(req,res)=>{
    try{
        const user = await User.findById({_id : req.user.id})
        if (!user) {
            return res.status(401).json({ valid: false, msg: "User not found" })
        }
        res.json({ valid: true, user: user })
    }
    catch(error){
        res.status(401).json({ valid: false, msg: "Invalid token" })
    }
}

userController.logout = (req,res)=>{
    res.clearCookie('token')
    return res.status(200).json({ message: 'Logout successful' });
}

module.exports = userController