import { useContext } from "react";
import { UserAccountContextData } from "../../state-management/UserAccountContextData";

const Home = ()=>{

    const {userAccount} = useContext(UserAccountContextData)


    return (
        <h1>{userAccount ? `Hi ${userAccount.username}!` : `Home component`}</h1>
    )
}

export default Home;