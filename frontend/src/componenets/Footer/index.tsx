import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-transparent text-light mt-5">
            <section className="mt-5">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>CV Maker
                            </h6>
                            <p>
                                platform designed to help users create
                                professional and personalized curriculum vitae
                                (CV) documents and to find a job quickly and
                                efficiently
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Products
                            </h6>
                            <p>
                                <Link to="/templates" className="text-reset">
                                    CV
                                </Link>
                            </p>
                            <p>
                                <Link to="/mycvs" className="text-reset">
                                    My-Cvs
                                </Link>
                            </p>
                            <p>
                                <Link to="/jobs" className="text-reset">
                                    Jobs
                                </Link>
                            </p>
                            <p>
                                <Link to="/applications" className="text-reset">
                                    Applications
                                </Link>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Contact
                            </h6>
                            <p>Egypt, Giza</p>

                            <p>+ 20 1100901054</p>
                            <p>
                                <Link to="" className="text-reset">
                                    Our Website
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="text-center p-4"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
                © 2024 Copyright:
                <Link className="text-reset fw-bold" to="">
                    {" "}CV Maker
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
