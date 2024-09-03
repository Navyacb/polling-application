const Category = require('../models/category-model')


const categoryValidationSchema = {
    categoryName : {
        notEmpty: {
            errorMessage: 'category Name is required'
        },
        custom:{
            options : async(value)=>{
                const category = await Category.findOne({categoryName : {'$regex': value, $options :'i'}})
                if(category){
                    throw new Error('Category already present')
                }else{
                    return true
                }
            }
        }
    }
}

module.exports = categoryValidationSchema