import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useState,useEffect} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Error404 from "./components/Error404";
import {getAuthUser,logoutFromServer} from "./components/CommonCompo";
const App  = () => {
  console.log("App");
  const [authUser,updateAuthUser] = useState({loading:true,isAuth:false,_id:"",full_name:"",email:"",mobile:"",profession:""});
  useEffect(() => {
    getAuthUser(updateAuthUser);
  },[]);
  const afterUserLogin = () => getAuthUser(updateAuthUser);
  const logoutUser = () => {
    logoutFromServer(updateAuthUser);
  }
  return(
    <BrowserRouter>
      <Navbar authUser={authUser} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Home authUser={authUser} />} />
        <Route path="/about" element={<About authUser={authUser} />} />
        <Route path="/contact" element={<Contact authUser={authUser} />} />
        <Route path="/login" element={<Login authUser={authUser} afterUserLogin={afterUserLogin} />} />
        <Route path="/register" element={<Register authUser={authUser} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;