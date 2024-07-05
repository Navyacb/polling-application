const Category = require('../models/category-model')
const { validationResult} = require('express-validator')

const categoryController = {}

categoryController.list = async(req,res)=>{
    try{
        const categories = await Category.find()
        res.send(categories)
    }
    catch(error){
        res.status(500).json(error)
    }

}

categoryController.create = async(req,res)=>{
    const errors = validationResult(req)
    console.log('errors',errors.array())
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = req.body
    const category = new Category(body)
    try{
        await category.save()
        res.json(category)
    }catch(error){
        res.status(500).json(error)
    }
}



module.exports = categoryController