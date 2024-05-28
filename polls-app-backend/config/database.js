const mongoose = require('mongoose')

const configDB = async()=>{
    try{
        const url = process.env.DB_URL || 'mongodb://localhost:27017'
        const db = await mongoose.connect(`${url}/${process.env.DB_NAME}`)
        console.log('db is connected')
    }
    catch(error){
        console.log('error in connecting to db',error)
    }
}

module.exports = configDB
