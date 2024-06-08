import { AppShell, Button, Group, Title } from '@mantine/core';
import RouterLinks from '../../RouterLinks';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserAccountContextData, defaultUserAccount } from '../../state-management/UserAccountContextData';
import {isEmpty} from 'lodash'
import { useLogoutApi } from '../../api/pollingAppApiMock';


const Header = ()=>{
    const {userAccount,userAccountDispatch} = useContext(UserAccountContextData)
    const { mutate } = useLogoutApi();

    const handleLogout = async () => {
        try {
            await mutate();
            userAccountDispatch({ type: 'remove', payload: defaultUserAccount });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
    

    return(
        <AppShell>
            <AppShell.Header>
            <Group justify="space-between">
                <Link to="/"><Title order={1} p={20} size="h1" c="#2d8ca5">Welcome to Polling App</Title></Link>
                {isEmpty(userAccount) || !userAccount._id ? (
                        <Link to="/login">
                            <Button m={20} variant="outline" w="8rem" size="md" radius="xl">Login</Button>
                        </Link>
                    ) : (
                        <Link to='/'>
                            <Button m={20} variant="outline" w="8rem" size="md" radius="xl" onClick={handleLogout}>Logout</Button>
                        </Link>
                    )}
            </Group>
            </AppShell.Header>
            <AppShell.Main pt={80}>
                <RouterLinks/>
            </AppShell.Main>
        </AppShell>
    )
}

export default Header;