import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Navbar = () => {

    function handleLogout(){
        localStorage.removeItem("token");
        // updateUserData();
        console.log("loged out ");

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container w-80">
                    <Link className="navbar-brand fw-bold" to={""}>
                        CV Maker
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse "
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav ms-auto ">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to={""}
                            >
                                Home
                            </Link>
                            <Link className="nav-link mx-2" to={"Jobs"}>
                                Jobs
                            </Link>
                            <Link className="nav-link mx-2" to={"applications"}>
                                Applications
                            </Link>
                            <Link className="nav-link mx-2" to={"templates"}>
                                Cv
                            </Link>
                            <Link className="nav-link mx-2" to={"login"}>
                                Login
                            </Link>
                            <Link className="nav-link mx-2" to={"register"}>
                                Register
                            </Link>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
