import Login from "../Login/Login.tsx";
import Navbar from '../NavBar/NavBar';
import Register from "../Register/Register.tsx";
import {Route, Routes} from "react-router-dom";
import TemplatesList from "../TemplatesList/TemplatesList.tsx"
import TemplateCreatePage from "src/components/TemplateCreatePage/TemplateCreatePage.tsx";
import ProfilePage from "src/components/ProfilePage/ProfilePage.tsx";
import TemplateInfo from "src/components/TemplateInfo/TemplateInfo.tsx";
import AnswerFormPage from "src/components/AnswerFormPage/AnswerFormPage.tsx";

const App = () => {
  return (

    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<TemplatesList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/templates/new" element={<TemplateCreatePage/>}/>
        <Route path="/templates/:id" element={<TemplateInfo/>}/>
        <Route path="/templates/:id/answer" element={<AnswerFormPage/>}/>
      </Routes>
    </>

  );
};

export default App;
