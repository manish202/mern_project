const InputBox = ({type,place,name,defVal}) => {
    console.log("App > .... > InputBox");
    return(
        <div className="mb-3">
            <input type={type} className="form-control" name={name} defaultValue={defVal} placeholder={place} />
        </div>
    )
}
const FormContainer = ({children}) => {
    console.log("App > .... > FormContainer");
    return(
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
const doFetchWork = async (url,dataObj,callback) => {
    try{
        const saveUser = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataObj)
        });
        const result = await saveUser.json();
        callback(result);
    }catch(err){
        callback({status:false,message:err.message})
    }
}
const options = {
    method:"GET",
    headers:{
        'Accept':"application/json",
        'Content-Type':"application/json"
    },
    credentials:"include"
}
const getAuthUser = async (updateAuthUser) => {
    try{
        const user = await fetch("/api/getAuthUser",options);
        const result = await user.json();
        if(result.status){
            updateAuthUser(old => ({...old,loading:false,isAuth:true,...result.user}));
        }else{
            updateAuthUser(old => ({...old,loading:false}));
        }
    }catch(err){
      updateAuthUser(old => ({...old,loading:false}));
      alert(err.message);
    }
}
const logoutFromServer = async (updateAuthUser) => {
    try{
        const user = await fetch("/api/logoutUser",options);
        const result = await user.json();
        if(result.status){
            updateAuthUser(old => ({...old,loading:false,isAuth:false,_id:"",full_name:"",email:"",mobile:"",profession:""}));
        }else{
            alert(result.message);
        }
    }catch(err){
        alert(err.message);
    }
}
export {InputBox,FormContainer,doFetchWork,getAuthUser,logoutFromServer}