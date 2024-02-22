
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import NavSection from './components/NavSection';
import Setting from "./components/Setting";
import Audits from "./components/Audits";
import Question2 from "./components/Question2";
import QuestionParent from "./components/QuestionParent";
import Login from "./components/login";

function App() {
 document.title = "AIS WEB APP";
//  const isLoggedIn = sessionStorage.getItem('user');
//  if (isLoggedIn != null) {
//    return <>
//    <Login></Login>
//    </>
//  }
//  else{

  return (
  
    <>
    
    <BrowserRouter>
    <NavSection />
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Audits />} />
        <Route path="setting" element={<Setting />} />
        <Route path="audits" element={<Audits />} />
        <Route path="questionParent" element={<QuestionParent />} />
        <Route path="questions" element={<Question2 />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    {/* <Question1 /> */}
    {/* <Question2/> */}
    {/* <QuestionParent /> */}

   
    </>
     
  
  );
 }



export default App;
