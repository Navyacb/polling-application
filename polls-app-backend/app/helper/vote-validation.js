const voteValidationSchema = {
    option: {
        in : ['body'],  //by default it will check in body
        notEmpty : {
            errorMessage: 'option is required'
        },
        isMongoId:{
            errorMessage:'option should be a valid mongo id'
        }
    },
    pollId:{
        in:['params'],
        notEmpty : {
            errorMessage: 'poll id is required'
        },
        isMongoId:{
            errorMessage:'poll should be a valid mongo id'
        }
    },
    user:{
        custom:{
            options: async (value,{req}) => { //we should specify value then req, this can be cached in typescript
                const vote = await Vote.findOne({users : req.user.id, poll: req.params.pollId})
                if(vote){
                    throw new Error("You have already casted a vote")
                }else{
                    return true
                }
            }
        }
    }
}