import { useContext, useReducer, useState } from "react";
import { UserAccountContextData } from "../../state-management/UserAccountContextData";
import { Button, Container, Group, Modal, Text } from "@mantine/core";
import CreatePoll from "../polls/CreatePoll";
import { useDisclosure } from "@mantine/hooks";
import PollList from "../polls/PollList";
import { IPolls, UserPollsContextData } from "../../state-management/UserPollsContextData";
import { fetchMyPollsData } from "../../api/pollingAppApiMock";

export const myPollsDefault:IPolls[] = []

const Home = ()=>{

    const myPollReducer = (state: IPolls[], action: { type: string, payload: IPolls[] }) => {
        switch (action.type) {
            case 'Add':
                return action.payload
            case 'Update':
                return [...state,...action.payload]
            default:
                return state
        }
    }

    const {userAccount} = useContext(UserAccountContextData)
    const [opened, { open, close }] = useDisclosure(false)
    const [myPoll , setMyPoll] = useState(false)
    const {polls} = useContext(UserPollsContextData)
    const [myPollList,myPollDispatch] = useReducer(myPollReducer,myPollsDefault)

    const handleMyPolls = async()=>{
        setMyPoll(!myPoll)
        if(!myPoll){
            try{

                    const response = await fetchMyPollsData()
                    myPollDispatch({type:'Add',payload : response})
                }
            catch(error){
                console.log('Error while fetching my polls list', error)
            }
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add Your Poll" size='lg' centered>
                <CreatePoll close={close} myPollDispatch={myPollDispatch}/>
            </Modal>
            <Container p={30} m={50}>
              <Group>
                    <Text size="xl">{userAccount._id ? 
                    `Hi ${userAccount.username}! You can now create your own polls and view other polls and contribute on polling.` : 
                    `Contribute towards the polling and view others opinion on various topic, Click on "Create your poll" to create a poll. Below are the list of active polls,`}</Text>
                    {userAccount.username  && 
                        <Group>
                            <Button onClick={open}>Create Poll</Button>
                            <Button onClick={handleMyPolls} >{myPoll ? 'Active Polls' : 'My Poll'}</Button>
                        </Group>
                    }
                </Group>
               <PollList polls = {(myPoll && userAccount._id)  ? myPollList : polls} />
            </Container>
        </>
    )
}

export default Home;