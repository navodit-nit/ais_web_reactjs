
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import NavSection from './components/NavSection';
import Home from "./components/Home";
import Setting from "./components/Setting";
import Audits from "./components/Audits";
import Question1 from "./components/Question1";
import Question2 from "./components/Question2";
import QuestionParent from "./components/QuestionParent";
import Login from "./components/login";

function App() {
  return (
  
    <>
    
    <BrowserRouter>
    <NavSection />
      <Routes>
        <Route index element={<Audits />} />
        <Route path="home" element={<Audits />} />
        <Route path="setting" element={<Setting />} />
        <Route path="audits" element={<Audits />} />
        <Route path="questionParent" element={<QuestionParent />} />
        <Route path="questions" element={<Question2 />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    {/* <Question1 /> */}
    {/* <Question2/> */}
    {/* <QuestionParent /> */}

   
    </>
     
  
  );
}

export default App;
