import {Routes,Route} from 'react-router-dom';
import { routePath } from './constants/routePath';
import Home from './components/home/Home';
import AuthenticationForm from './pages/authenticateForm/AuthenticationForm';


const RouterLinks = ()=>{

    return(
        <Routes>
            <Route>
                <Route path={routePath.home} element={<Home/>}/>
                <Route path={routePath.authenticate} element={<AuthenticationForm/>}/>
            </Route>
        </Routes>
    )
}

export default RouterLinks;