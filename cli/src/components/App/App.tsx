import Login from "../Login/Login.tsx";
import Navbar from '../NavBar/NavBar';
import Register from "../Register/Register.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TemplatesList from "../TemplatesList/TemplatesList.tsx"
const App = () => {
    return (

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<TemplatesList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
