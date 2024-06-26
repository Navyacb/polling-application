import {Routes,Route} from 'react-router-dom';
import { routePath } from './constants/routePath';
import Register from './pages/register/Register';
import Home from './components/home/Home';
import Login from './pages/login/Login';


const RouterLinks = ()=>{

    return(
        <Routes>
            <Route>
                <Route path={routePath.home} element={<Home/>}/>
                <Route path={routePath.register} element={<Register/>}/>
                <Route path={routePath.login} element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export default RouterLinks;