const isValidFormat = (value) => {
    if (!value) return false;

    const date = new Date(value);

    if (isNaN(date.getTime())) {
        return false;
    }

    // Define the expected format: YYYY-MM-DD HH:MM
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const formattedDate = formatDate(date);
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    return regex.test(formattedDate);
}


const pollsValidationSchema = {
    question:{
        notEmpty:{
            errorMessage: 'Poll question is required'
        },
    },
    startDate:{
        custom:{
            options:(value)=>{
                if(!isValidFormat(value)){
                    throw new Error('Enter a valid start date in the format YYYY-MM-DD HH:MM');
                }else if(new Date(value) <= new Date()){
                    throw new Error('Start Date cant be before today')
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
                    throw new Error('Enter a valid end date in the format YYYY-MM-DD HH:MM');
                }else if(new Date(value)<new Date(req.body.startDate)){
                    throw new Error('end Date cant be before start date')
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