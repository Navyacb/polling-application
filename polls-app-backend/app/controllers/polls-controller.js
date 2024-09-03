const { validationResult } = require('express-validator')
const Polls = require('../models/polls-model')

const pollsController = {}


pollsController.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body
    const poll = new Polls(body)
    poll.created = req.user.id
    try{
        await poll.save()
        res.json(poll)
    }
    catch(error){
        res.status(500).json(error)
    }

}

pollsController.list = async(req,res)=>{
    try{
        const polls = await Polls.find()
        res.send(polls)
    }
    catch(error){
        res.status(500).json(error)
    }
}


module.exports = pollsController