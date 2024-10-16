import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useActionData, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Cv from "../../componenets/CV";
import { CvModel } from "../../Interfaces/CvInterfaces";
import { UserContext } from "../../Context/UserContext";
import Cv2 from "../../componenets/Cv2";
import Cv3 from "../../componenets/Cv3";
import './styles.css';

const MyCvs = () => {
    const {userCvs,setUserCvs,getCvsErrors, getUserId} = useContext(UserContext);
    const {userId}=useParams();
    const navigate = useNavigate();

    console.log(userCvs )
    console.log(getCvsErrors )
    console.log(setUserCvs )
    console.log(getUserId )
    
    

    const deleteAllCvs = ()=>{
        axios
            .delete(`http://127.0.0.1:8000/deleteallcvs/`,{
                data:{userId:getUserId()},
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                } 
            })
            .then((res) => {
                console.log("res" ,res)
                setUserCvs([]);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    interface DelteCvProps{
        userId:string|undefined;
        cvName:string;
    }

    const deleteOneCv = (idx:number)=>{
        console.log(userCvs)
        console.log(userCvs.data[idx].cvName);
        const cvToDelete:DelteCvProps = {
            userId:getUserId(),
            cvName:userCvs?.data[idx]?.cvName,
        }
        console.log(cvToDelete);
        axios
            .delete(`http://127.0.0.1:8000/deletecv/`,{
                data:cvToDelete
            })
            .then((res) => {
                const updatedCvs = userCvs.data.filter((cv:CvModel, index:number) => index !== idx);
                setUserCvs({ ...userCvs, data: updatedCvs });
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <>
            <div className="container min-vh-100  mt-5">
                <h2 className="my-5 pt-2 text-center">My Cvs</h2>
                <div className="row r h-50 g-4 justify-content-center">
                    
                    {userCvs?.data?.map((cv:CvModel,idx:number) => (
                        <div
                            className="col-md-4 col-sm-6 myCv position-relative  overflow-hidden "
                            style={{minHeight: "350px",width:"400px", maxWidth: "500px" }}
                        >   
                        
                        <div className="leftDelete">
                            <button className="btn btn-danger" 
                            onClick={()=>deleteOneCv(idx)}>
                                Delete
                            </button>
                        </div>
                        <div className="rightEdit">
                            <button className="btn btn-info" 
                                onClick={()=>navigate(`/templates/${cv.template}/${cv.userId}/${cv.cvId}/edit`)}>
                                    Edit
                            </button>
                        </div>
                        <div className="bg-light" >{cv.template=="1"?<Cv cv={cv} isEditableTemplate={true}/>:cv.template=="2"?<Cv2 cv={cv} isEditableTemplate={true}/>:cv.template=="3"?<Cv3 cv={cv} isEditableTemplate={true}/>:<></>}</div>
                        
                            
                        </div>
                    ))}
                    
                </div>
                {userCvs?.data?.length>=1&&(<><div className="d-flex justify-content-center  mb-4"><button className="btn btn-danger mt-5 px-5 " onClick={deleteAllCvs}>Clear All Cvs</button></div></>)} 
            </div>
        </>
    );
};

export default MyCvs;
