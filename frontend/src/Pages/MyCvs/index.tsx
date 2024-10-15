import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useActionData, useNavigate, useSearchParams } from "react-router-dom";
import Cv from "../../componenets/CV";
import { CvModel } from "../../Interfaces/CvInterfaces";
import { UserContext } from "../../Context/UserContext";
import Cv2 from "../../componenets/Cv2";


const MyCvs = () => {
    const {userCvs,setUserCvs,getCvsErrors, getUserId} = useContext(UserContext);
    const navigate = useNavigate();
    const deleteAllCvs = ()=>{
        axios
            .delete(`http://127.0.0.1:8000/deleteallcvs/`,{
                data:{userId:getUserId()},
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                } 
            })
            .then((res) => {
                console.log("res" + res)
                setUserCvs([]);
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <>
            <div className="container min-vh-100  mt-4">
                <h2 className="my-5 text-center">My Cvs</h2>
                <div className="row justify-content-center h-50 g-4 ">
                    
                    {userCvs?.data?.map((cv:CvModel) => (
                        <div
                            onClick={()=>navigate(`/templates/${cv.template}/${cv.userId}/${cv.cvId}/edit`)}
                            className="col-md-4 col-sm-6 "
                            role="button"
                            style={{width:"400px", maxWidth: "400px" }}
                            
                        >   
                        
                            <div className="bg-light" style={{minHeight: "350px"}}>{cv.template=="1"?<Cv cv={cv} isEditableTemplate={true}/>:cv.template=="2"?<Cv2 cv={cv} isEditableTemplate={true}/>:<></>}</div>
                        </div>
                    ))}
                    
                </div>
                {userCvs?.data?.length>=1&&(<><div className="d-flex justify-content-center  mb-4"><button className="btn btn-danger mt-5 px-5 " onClick={deleteAllCvs}>Clear All Cvs</button></div></>)} 
            </div>
        </>
    );
};

export default MyCvs;
