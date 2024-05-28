import { useLocation } from "react-router-dom";

const Home = ()=>{

    const location = useLocation()
    const name = location?.state?.name

    return (
        <h1>{name ? `Hi ${name}!` : `Home component`}</h1>
    )
}

export default Home;