import {useNavigate} from "react-router-dom";
import {InputBox,FormContainer,doFetchWork} from "./CommonCompo";
import useAlert from './useAlert';
import {useEffect} from "react";
const Contact = ({authUser}) => {
    console.log("App > Contact");
    const {Alert,setStatus} = useAlert();
    const navigate = useNavigate();
    useEffect(() => {
        if(!authUser.loading && !authUser.isAuth){
            navigate("/login");
        }
    },[authUser]);
    const handelSubmit = async (e) => {
        e.preventDefault();
        let {full_name,email,mobile,msg} = e.target;
        full_name = full_name.value.trim();
        email = email.value.trim();
        mobile = mobile.value.trim();
        msg = msg.value.trim();
        if(!full_name || !email || !mobile || !msg){
            setStatus({show:true,isError:true,message:"All Input fields are required."});
            return false;
        }
        const handelResponse = ({status,message}) => {
            if(status){
                setStatus({show:true,isError:false,message:"Message sent successfully."});
                setTimeout(() => { navigate("/"); },3000);
            }else{
                setStatus({show:true,isError:true,message});
            }
        }
        doFetchWork("/api/getInTouch",{msg},handelResponse);
    }
    return(
        <FormContainer>
            <form onSubmit={handelSubmit}>
                <h1 className="mb-3 text-primary">Get In Touch</h1>
                <Alert />
                <InputBox defVal={authUser.full_name} type="text" place="Your Name" name="full_name" />
                <InputBox defVal={authUser.email} type="email" place="Your Email" name="email" />
                <InputBox defVal={authUser.mobile} type="number" place="Mobile Number" name="mobile" />
                <textarea className="mb-3 form-control" cols="30" rows="5" name="msg" placeholder="Message"></textarea>
                <input type="submit" className="btn btn-primary" value="Contact" />
            </form>
        </FormContainer>
    )
}
export default Contact;