import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container w-80">
                    <a className="navbar-brand fw-bold" href="#">
                        CV Maker
                    </a>
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
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                            <a className="nav-link mx-2" href="#">
                                Jobs
                            </a>
                            <a className="nav-link mx-2" href="#">
                                Applications
                            </a>
                            <a className="nav-link mx-2" href="#">
                                Cv
                            </a>
                            <a className="nav-link mx-2" href="#">
                                Login
                            </a>
                            <Link className="nav-link mx-2" to={"/register"}>
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
