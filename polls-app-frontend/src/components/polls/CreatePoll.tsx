import { DateTimePicker } from "@mantine/dates";
import CreatableSelect from 'react-select/creatable'
import { Button, CloseButton, Group, Input, List, ListItem, Paper, Text, Textarea } from "@mantine/core";
import { usePollsCreation } from "../../hooks/polls/usePollsCreation";
import { useErrorMessage } from "../../hooks/errorMessage/useErrorMessage";
import { IPolls } from "../../state-management/UserPollsContextData";


interface CreatePollProps {
    close: () => void
  }

const CreatePoll : React.FC<CreatePollProps>= ({close})=>{

    const {
        categoryList,
        handleFormSubmit,
        handleCreateCategory,
        handleAddOptions,
        handleRemoveOption,
        handleOptionChange,
        form,
    options} = usePollsCreation()
    const {errors} = useErrorMessage()


  const handleSubmit = async (values: IPolls) => {
    await handleFormSubmit(values)
    close()
  }


    return (
                <Paper shadow="md" p={30} mt={30} radius="md" withBorder>
                    {errors?.length>0 &&       
                    <List withPadding mb={6}>
                        {errors.map((error:{type:string,value:string,msg:string},i:number)=>{
                            return <ListItem c="red" key={i}>{error.msg}</ListItem>
                        })}
                    </List> 
                    }
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                            <Textarea
                                required
                                label="Question"
                                placeholder="Enter your poll question here"
                                value={form.values.question}
                                onChange={(event) => form.setFieldValue('question', event.currentTarget.value)}
                                radius="md"
                            /><br/>
                            <CreatableSelect
                                placeholder="Select the poll category"
                                options={categoryList}
                                value={categoryList.find(c => c.value === form.values.category)}
                                onChange={(newValue) => {form.setFieldValue('category', newValue ? newValue.value : '')}}
                                onCreateOption={handleCreateCategory}
                            />    <br/>               
                            <DateTimePicker 
                                label="Start Date and Time" 
                                valueFormat="YYYY-MM-DD HH:mm"
                                value={form.values.startDate }
                                onChange={(value) =>{form.setFieldValue('startDate', value)}} 
                                placeholder="Pick date and time"
                             /><br/>
                            <DateTimePicker 
                                label="End Date and Time" 
                                valueFormat="YYYY-MM-DD HH:mm"
                                value={form.values.endDate} 
                                onChange={(value) => form.setFieldValue('endDate', value)}
                                placeholder="Pick date and time"
                             /><br/>
                             <Text fw={500}>Add Options to choose</Text>
                             {options.map((option,i)=>{
                                return <Group py={10} key={i}>
                                    <Input  value={option.optionText}
                                    onChange={(event) => handleOptionChange(i, event.currentTarget.value)}/>
                                    {i>1 && <CloseButton onClick={()=>handleRemoveOption(i)} />}
                                </Group>
                             })}<br/>
                             <Button onClick={handleAddOptions}>Add Options</Button><br/><br/>
                             <Button type="submit" radius="xl">
                                Submit Poll
                            </Button>
                    </form>
                </Paper>
    )
}


export default CreatePoll;