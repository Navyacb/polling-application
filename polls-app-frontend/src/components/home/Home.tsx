import { useContext } from "react";
import { UserAccountContextData } from "../../state-management/UserAccountContextData";
import { Button, Container, Group, Modal, Paper, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { CategoryContextData, ICategory } from "../../state-management/CategoryContextData";
import { IPolls } from "../../state-management/UserPollsContextData";import { DateTimePicker } from "@mantine/dates";
import CreatableSelect from 'react-select/creatable'
import { useMutation, useQueryClient } from "react-query";
import { addCategory } from "../../api/pollingAppApiMock";


const Home = ()=>{

    const {userAccount} = useContext(UserAccountContextData)
    const [opened, { open, close }] = useDisclosure(false)
    const {category} = useContext(CategoryContextData)

    const queryClient = useQueryClient();

    const mutation = useMutation(addCategory, {
        onSuccess: () => {
          queryClient.invalidateQueries("category");
        },
        onError: (error) => {
          console.error('Error adding category:', error);
        },
    })

    const form = useForm<IPolls>({
        initialValues: {
          question: '',
          category: '',
          startDate: null,
          endDate:null ,
          options:[]
        },
    })

    const handleFormSubmit = (values: IPolls)=>{
        console.log(values)
    }

    const handleCreateCategory = (inputValue: string) => {
        form.setFieldValue('category', inputValue)
        mutation.mutate(inputValue)
    }

    const categoryList = category.map((ele: ICategory) => ({ value: ele.categoryName, label: ele.categoryName }));

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add Your Poll" size='lg' centered>
                <Paper shadow="md" p={30} mt={30} radius="md" withBorder>
                    <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
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
                                value={form.values.startDate }
                                onChange={(value) =>{form.setFieldValue('startDate', value)}} 
                                placeholder="Pick date and time"
                             /><br/>
                            <DateTimePicker 
                                label="End Date and Time" 
                                value={form.values.endDate} 
                                onChange={(value) => form.setFieldValue('endDate', value)}
                                placeholder="Pick date and time"
                             /><br/>
                             <Button type="submit" radius="xl">
                                Submit Poll
                            </Button>
                    </form>
                </Paper>
            </Modal>
            <Container p={30} m={50}>
              <Group>
                <Text size="xl">{userAccount._id ? 
                `Hi ${userAccount.username}! You can now create your own polls and view other polls and contribute on polling.` : 
                `Contribute towards the polling and view others opinion on various topic, Click on "Create your poll" to create a poll.`}</Text>
                {userAccount.username  && <Button onClick={open}>Create Poll</Button>}
                </Group>
            </Container>
        
        </>
    )
}

export default Home;