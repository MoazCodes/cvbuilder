import React from "react";
import styles from "./NotFound.module.css"; // Import CSS module
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="notFoundBody ">
                <div className={styles.noise}></div>
                <div className={styles.overlay}></div>
                <div className={styles.terminal}>
                    <div className=" w-50 m-auto fs-1">
                        <h1
                            className="text-center "
                            style={{ fontSize: "60px" }}
                        >
                            Error <span className={styles.errorcode}>404</span>
                        </h1>
                        <p className={styles.output}>
                            The page you are looking for might have been
                            removed, had its name changed, or is temporarily
                            unavailable.
                        </p>
                        <p className={styles.output}>
                            Please try to{" "}
                            <Link to="" className=" text-danger">
                                return to the homepage
                            </Link>
                            .
                        </p>
                        <p className={styles.output}>Good luck.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
