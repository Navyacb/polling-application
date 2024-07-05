const isValidFormat = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    return regex.test(value);
}

const pollsValidationSchema = {
    question:{
        notEmpty:{
            errorMessage: 'Poll question is required'
        },
    },
    createdDate:{
        custom:{
            options:(value)=>{
                if(!isValidFormat(value)){
                    throw new Error('Enter a valid date in the format YYYY-MM-DD HH:MM');
                }else if(new Date(value) < new Date()){
                    throw new Error('Create Date cant be before today')
                }else{
                    return true
                }
            }
        },
    },
    endDate:{
        custom:{
            options:(value,{req})=>{
                if(!isValidFormat(value)){
                    throw new Error('Enter a valid date in the format YYYY-MM-DD HH:MM');
                }else if(new Date(value)<new Date(req.body.createdDate)){
                    throw new Error('end Date cant be before created date')
                }else{
                    return true
                }
            }
        },
    },
    category:{
        isMongoId : {
            errorMessage:'Should have a valid category id'
        },
    },
    options:{
        isArray:{
            options : {min:2},
            errorMessage:'Enter minimum 2 options for every poll questions'
        },
        custom :{
            options : (value)=>{
                const result = value.every(ele=> ele.optionText.trim().length>0)
                if(result){
                    return true
                }else{
                    throw new Error('Option text can not be empty')
                }
            }
        },
    }
}


module.exports = pollsValidationSchema