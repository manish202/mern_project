import {useState} from "react";
const useAlert = () => {
    const [status,setStatus] = useState({show:false,isError:false,message:""});
    const Alert = () => {
        return(
            <>
                {status.show && <div className={`alert ${status.isError ? 'alert-danger':'alert-success'} alert-dismissible`}><strong>{status.message}</strong><button onClick={() => setStatus({show:false,isError:false,message:""})} type="button" className="btn-close"></button></div>}
            </>
        )
    }
    return {Alert,setStatus}
}
export default useAlert;