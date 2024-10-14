import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useActionData, useNavigate, useSearchParams } from "react-router-dom";
import Cv from "../../componenets/CV";
import { CvModel } from "../../Interfaces/CvInterfaces";
import { UserContext } from "../../Context/UserContext";

type ArgumentsForDeletion = {userId:number}

const MyCvs = () => {
    const {userCvs,setUserCvs,getCvsErrors,userData} = useContext(UserContext);
    const navigate = useNavigate();
    const deleteAllCvs = ()=>{
        console.log("as" + userData.id)
        axios
            .delete(`http://127.0.0.1:8000/deleteallcvs/`,{
                data: userData.id,
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
            <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center mt-4">
                <h2 className="my-5 ">My Cvs</h2>
                <div className="row justify-content-center h-50 g-4">
                    {userCvs?.data?.map((cv:CvModel) => (
                        <div
                            onClick={()=>navigate(`/templates/${cv.cvId}`)}
                            className="col-md-4 col-sm-6 "
                            role="button"
                            style={{width:"240px", maxWidth: "240px" }}
                            
                        >
                            <div className="bg-light" style={{minHeight: "350px"}}><Cv cv={cv} isEditableTemplate={true}/></div>
                        </div>
                    ))}
                    
                </div>
                <button className="btn btn-danger mt-5 px-5" onClick={deleteAllCvs}>Clear All Cvs</button>
            </div>
        </>
    );
};

export default MyCvs;
