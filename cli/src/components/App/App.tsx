import Login from "../Login/Login.tsx";
import Navbar from '../NavBar/NavBar';
import Register from "../Register/Register.tsx";
import {Route, Routes} from "react-router-dom";
import TemplatesList from "../TemplatesList/TemplatesList.tsx"
import TemplateCreatePage from "src/components/TemplateCreatePage/TemplateCreatePage.tsx";
import ProfilePage from "src/components/ProfilePage/ProfilePage.tsx";
import TemplateInfo from "src/components/TemplateInfo/TemplateInfo.tsx";
import AnswerFormPage from "src/components/AnswerFormPage/AnswerFormPage.tsx";
import EditProfile from "src/components/EditProfile/EditProfile.tsx";
import TemplateEditPage from "src/components/TemplateEditPage/TemplateEditPage.tsx";
import NotFound from "src/components/NotFoud/NotFound.tsx"
const App = () => {
  return (

    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<TemplatesList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/profile/edit" element={<EditProfile/>}/>
        <Route path="/templates/new" element={<TemplateCreatePage/>}/>
        <Route path="/templates/:id/edit" element={<TemplateEditPage/>}/>
        <Route path="/templates/:id/answer" element={<AnswerFormPage/>}/>
        <Route path="/templates/:id" element={<TemplateInfo/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>

  );
};

export default App;
