import {Link} from "react-router-dom";
import {useState} from "react";
const Navbar = ({authUser,logoutUser}) => {
    console.log("App > Navbar");
    const [show,chShow] = useState(false);
    return(
        <div className="container bg-dark">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand text-white">MERN</Link>
                    <button className="navbar-toggler bg-white" type="button" onClick={() => chShow(!show)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${show ? 'show':''}`}>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/about">AboutMe</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/contact">Contact</Link></li>
                            {authUser.isAuth ? (<li className="nav-item"><button type="button" onClick={logoutUser} className="nav-link text-white">Logout</button></li>):
                            (<><li className="nav-item"><Link className="nav-link text-white" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/register">Register</Link></li></>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;