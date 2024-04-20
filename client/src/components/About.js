import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
const About = ({authUser}) => {
    console.log("App > About");
    const navigate = useNavigate();
    useEffect(() => {
        if(!authUser.loading && !authUser.isAuth){
            navigate("/login");
        }
    },[authUser]);
    return(
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-4">
                    <h2 className="mb-3">Your Profile</h2>
                    <table className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>Id :</th>
                                <td>{authUser._id}</td>
                            </tr>
                            <tr>
                                <th>Full Name :</th>
                                <td>{authUser.full_name}</td>
                            </tr>
                            <tr>
                                <th>Email :</th>
                                <td>{authUser.email}</td>
                            </tr>
                            <tr>
                                <th>Mobile No. :</th>
                                <td>{authUser.mobile}</td>
                            </tr>
                            <tr>
                                <th>Profession :</th>
                                <td>{authUser.profession}</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default About;