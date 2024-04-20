import {useNavigate} from "react-router-dom";
import {InputBox,FormContainer,doFetchWork} from "./CommonCompo";
import useAlert from './useAlert';
import {useEffect} from "react";
const Login = ({authUser,afterUserLogin}) => {
    console.log("App > Login");
    const {Alert,setStatus} = useAlert();
    const navigate = useNavigate();
    useEffect(() => {
        if(!authUser.loading && authUser.isAuth){
            navigate("/");
        }
    },[authUser]);
    const handelSubmit = async (e) => {
        e.preventDefault();
        let {email,password} = e.target;
        email = email.value.trim();
        password = password.value.trim();
        if(!email || !password){
            setStatus({show:true,isError:true,message:"All Input fields are required."});
            return false;
        }
        const handelResponse = ({status,message}) => {
            if(status){
                setStatus({show:true,isError:false,message:"Login successful."});
                afterUserLogin();
                setTimeout(() => { navigate("/"); },3000);
                e.target.reset();
            }else{
                setStatus({show:true,isError:true,message});
            }
        }
        doFetchWork("/api/signin",{email,password},handelResponse);
    }
    return(
        <FormContainer>
            <form onSubmit={handelSubmit}>
                <h1 className="mb-3 text-primary">Login</h1>
                <Alert />
                <InputBox type="email" place="Your Email" name="email" />
                <InputBox type="password" place="Password" name="password" />
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </FormContainer>
    )
}
export default Login;