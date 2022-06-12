import React,{useEffect, useState} from "react";
import LoginForm from "./components/forms/loginform";
import SignUpForm from "./components/forms/signupform";
import { Routes, Route, useNavigate } from 'react-router-dom';
import DoctorProfile from "./pages/doctorprofile";
import LabProfile from "./pages/labprofile";
import Requests from "./pages/requests";
import PendingRequests from "./pages/pendingrequests";
import CompletedRequests from "./pages/completedrequests";

function App() {
  const [user,setUser] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/")
  }, [])
  
  return (
    // <div>
    //   <DoctorProfile user={user}/>
    // </div>
    // <CompletedRequests/>
    <Routes>
      <Route exact path="/" element={<LoginForm setUser={setUser} user={user}/>}/>
      <Route exact path="/signup" element={<SignUpForm/>}/>
      <Route exact path="/doctorprofile" element={<DoctorProfile user={user}/>}/>
      <Route exact path="/labprofile" element={<LabProfile user={user}/>}/>
      <Route exact path="/requests" element={<Requests user={user}/>}/>
      <Route exact path="/pending" element={<PendingRequests user={user}/>}/>
      <Route exact path="/completed" element={<CompletedRequests user={user}/>}/>
    </Routes>
  );
}

export default App;
