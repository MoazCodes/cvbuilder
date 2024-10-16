import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Templates = () => {
    const {userData,getUserId} = useContext(UserContext);
    return (
        <>
            <div className="container vh-100 d-flex flex-column align-items-center justify-content-center">
                <h2 className="mb-5">Please choose your template</h2>
                <div className="row justify-content-center h-50 g-4">
                    <div className="col-md-6" style={{ width: "100%" ,maxWidth:"400px" ,height:"550px"}}>
                        <Link className="template w-100 h-100" to={`/templates/1/${getUserId()}` } >
                            <div
                                role="button"
                                className="templateImage p-1 border w-100 h-100 "
                                
                            >
                                <img
                                    src="assets/cv1.jpg"
                                    alt="cvTemplate"
                                    className="w-100 h-100 mb-5"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6" style={{ width: "100%" ,maxWidth:"400px" ,height:"550px"}}>
                    <Link className="template w-100 h-100" to={`/templates/2/${getUserId()}`} >
                            <div
                                role="button"
                                className="templateImage p-1 border w-100 h-100"
                                
                            >
                                <img
                                    src="assets/cv2.png"
                                    alt="cvTemplate"
                                    
                                    className="w-100 h-100 mb-5"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6" style={{ width: "100%" ,maxWidth:"400px" ,height:"550px"}}>
                    <Link className="template w-100 h-100" to={`/templates/3/${getUserId()} `} >
                            <div
                                role="button"
                                className="templateImage p-1 border w-100 h-100 "
                                
                            >
                                <img
                                    src="assets/cv3.jpg"
                                    alt="cvTemplate"
                                    className="w-100 h-100 mb-5"
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
