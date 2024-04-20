import {useNavigate} from "react-router-dom";
import {InputBox,FormContainer,doFetchWork} from "./CommonCompo";
import useAlert from './useAlert';
import {useEffect} from "react";
const Register = ({authUser}) => {
    console.log("App > Register");
    const {Alert,setStatus} = useAlert();
    const navigate = useNavigate();
    useEffect(() => {
        if(!authUser.loading && authUser.isAuth){
            navigate("/");
        }
    },[authUser]);
    const handelSubmit = async (e) => {
        e.preventDefault();
        let {full_name,email,mobile,profession,password,cpassword} = e.target;
        full_name = full_name.value.trim();
        email = email.value.trim();
        mobile = mobile.value.trim();
        profession = profession.value.trim();
        password = password.value.trim();
        cpassword = cpassword.value.trim();
        if(!full_name || !email || !mobile || !profession || !password || !cpassword){
            setStatus({show:true,isError:true,message:"All Input fields are required."});
            return false;
        }
        if(password !== cpassword){
            setStatus({show:true,isError:true,message:"Confirm password does not match with original password."});
            return false;
        }
        const handelResponse = ({status,message}) => {
            if(status){
                setStatus({show:true,isError:false,message:"Registration successful please login."});
                setTimeout(() => { navigate("/login"); },3000);
                e.target.reset();
            }else{
                setStatus({show:true,isError:true,message});
            }
        }
        doFetchWork("/api/signup",{full_name,email,mobile,profession,password},handelResponse);
    }
    return(
        <FormContainer>
            <form onSubmit={handelSubmit}>
                <h1 className="mb-3 text-primary">Sign Up</h1>
                <Alert />
                <InputBox type="text" place="Your Name" name="full_name" />
                <InputBox type="email" place="Your Email" name="email" />
                <InputBox type="number" place="Mobile Number" name="mobile" />
                <InputBox type="text" place="Your Profession" name="profession" />
                <InputBox type="password" place="Password" name="password" />
                <InputBox type="password" place="Confirm Your Password" name="cpassword" />
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
        </FormContainer>
    )
}
export default Register;