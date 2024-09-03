import { useContext } from "react";
import { UserAccountContextData } from "../../state-management/UserAccountContextData";
import { Button, Container, Group, Modal, Text } from "@mantine/core";
import CreatePoll from "../polls/CreatePoll";
import { useDisclosure } from "@mantine/hooks";

const Home = ()=>{

    const {userAccount} = useContext(UserAccountContextData)
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add Your Poll" size='lg' centered>
                <CreatePoll close={close}/>
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