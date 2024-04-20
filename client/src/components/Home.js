const Home = ({authUser}) => {
    console.log("App > Home");
    return(
        <div className="container text-bg-secondary">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 text-center">
                    <h3>Welcome {authUser.isAuth && authUser.full_name}</h3>
                    <h1>We Are The MERN Developer</h1>
                </div>
            </div>
        </div>
    )
}
export default Home;