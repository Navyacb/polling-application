const Vote = require('../models/vote-model')

const voteCltr = {}

voteCltr.create = async (req,res)=>{
    const body = req.body
    const pollId = req.params.pollId
    const vote = new Vote(body)
    vote.user = req.user.id
    vote.poll = pollId
    try{
        await vote.save()
        res.json(vote)
    }
    catch(error){
        res.status(500).json(error)
    }
}


module.exports = voteCltr