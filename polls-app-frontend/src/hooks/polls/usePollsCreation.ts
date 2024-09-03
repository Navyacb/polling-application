import { useAddCategory, useAddPolls } from "../../api/pollingAppApiMock";
import { notifications } from '@mantine/notifications'
import { useContext, useState } from "react";
import { useForm } from "@mantine/form";
import { CategoryContextData, ICategory } from "../../state-management/CategoryContextData";
import { IOptions, IPolls } from "../../state-management/UserPollsContextData";

export const usePollsCreation = ()=>{
    const {category} = useContext(CategoryContextData)
    const [options, setOptions] = useState<IOptions[]>([{optionText:''},{optionText:''}])

    const mutationCategory = useAddCategory()

    const mutationPolls = useAddPolls()

    const form = useForm<IPolls>({
        initialValues: {
          question: '',
          category: '',
          startDate: null,
          endDate:null ,
          options:[]
        },
    })

    const handleFormSubmit = async (values: IPolls)=>{
        try{
            const pollData = { ...values, 
                options,
            }
            const catId = category.find(cat=> cat.categoryName === pollData.category)
            const poll = {...pollData,category:catId?._id ||''}
            await mutationPolls.mutateAsync(poll)
            notifications.show({
                title: 'Poll Added',
                message: 'Your poll has been added successfully!',
                color: 'green',
            });
            close()
        }catch(error){
            console.log(error)
            notifications.show({
                title: 'Error',
                message: 'There was an error adding your poll.',
                color: 'red',
            });
        }
    }

    const handleCreateCategory = (inputValue: string) => {
        form.setFieldValue('category', inputValue)
        mutationCategory.mutate(inputValue)
    }
    
    const handleAddOptions = ()=>{
        setOptions([...options, {optionText:''}])
    }

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    }
    
      const handleOptionChange = (index: number, newText: string) => {
        const newOptions = options.map((option, i) =>
          i === index ? { optionText: newText } : option
        )
        setOptions(newOptions);
    }

    const categoryList = category.map((ele: ICategory) => ({ value: ele.categoryName, label: ele.categoryName }));

    return ({
        handleFormSubmit,
        handleCreateCategory,
        handleAddOptions,
        handleRemoveOption,
        handleOptionChange,
        categoryList,
        form,
        options
    })
}