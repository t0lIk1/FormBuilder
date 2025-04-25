import Login from "../Login/Login.tsx";
import Navbar from '../NavBar/NavBar';
import Register from "../Register/Register.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TemplatesList from "../TemplatesList/TemplatesList.tsx"
import TemplateCreatePage from "src/components/TemplateCreatePage/TemplateCreatePage.tsx";
import ProfilePage from "src/components/ProfilePage/ProfilePage.tsx";

const App = () => {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<TemplatesList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/templates/new" element={<TemplateCreatePage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
