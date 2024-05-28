import { AppShell, Button, Group, Title } from '@mantine/core';
import RouterLinks from '../../RouterLinks';
import { Link } from 'react-router-dom';


const Header = ()=>{

    return(
        <AppShell>
            <AppShell.Header>
            <Group justify="space-between">
                <Link to="/"><Title order={1} p={20} size="h1" c="#2d8ca5">Welcome to Polling App</Title></Link>
                <Link to='/login'><Button m={20} variant="outline" w="8rem" size="md" radius="xl">Login</Button></Link>
            </Group>
            </AppShell.Header>
            <AppShell.Main pt={80}>
                <RouterLinks/>
            </AppShell.Main>
        </AppShell>
    )
}

export default Header;