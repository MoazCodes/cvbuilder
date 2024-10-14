import React from "react";
import { Link } from "react-router-dom";

const Templates = () => {
    return (
        <>
            <div className="container vh-100 d-flex flex-column align-items-center justify-content-center">
                <h2 className="mb-5">Please choose your template</h2>
                <div className="row justify-content-center h-50 ">
                    <div className="col">
                        <Link className="template" to={"1"}>
                            <div
                                role="button"
                                className="templateImage p-1 border  "
                            >
                                <img
                                    src="assets/cv4.jpg"
                                    alt="cvTemplate"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col ">
                        <Link className="template " to={"2"}>
                            <div
                                role="button"
                                className="templateImage p-1 border "
                            >
                                <img
                                    src="assets/cv2-template.png"
                                    alt="cvTemplate"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col ">
                        <Link className="template " to={"3"}>
                            <div
                                role="button"
                                className="templateImage p-1 border "
                            >
                                <img
                                    src="assets/cv4.jpg"
                                    alt="cvTemplate"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col ">
                        <Link className="template " to={"4"}>
                            <div
                                role="button"
                                className="templateImage p-1 border "
                            >
                                <img
                                    src="assets/cv4.jpg"
                                    alt="cvTemplate"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col ">
                        <Link className="template " to={"5"}>
                            <div
                                role="button"
                                className="templateImage p-1 border "
                            >
                                <img
                                    src="assets/cv4.jpg"
                                    alt="cvTemplate"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Templates;
