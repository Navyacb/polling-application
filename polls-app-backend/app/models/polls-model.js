const mongoose = require('mongoose')
const {Schema, model} = mongoose

const pollSchema = new Schema({
    question : String,
    created : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    category : {
        type: Schema.Types.ObjectId,
        ref:'Category'
    },
    endDate : Date,
    startDate : Date,
    options : [
        {
             optionText : String,
        }
    ],
},{timestamps:true})

const Polls = model('Polls',pollSchema)

module.exports = Polls