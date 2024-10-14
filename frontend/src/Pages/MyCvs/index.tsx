import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useActionData, useSearchParams } from "react-router-dom";
import Cv from "../../componenets/CV";

const MyCvs = () => {
    const [myCvs, setMyCvs] = useState({ data: [] });
    useEffect(() => {
        axios
            .get(`http://localhost:8000/cv/${1}`)
            .then((res) => {
                // console.log(`answer`);
                console.log(res);

                setMyCvs(res.data);
            })
            .catch((e) => {
                // console.log(`errord`);
                console.log(e);
                // setErr(e.response.data?.error);
            });
    }, []);

    return (
        <>
            <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center mt-4">
                <h2 className="mb-5">My Cvs</h2>
                <div className="row justify-content-center h-50 g-4">
                    {myCvs.data.map((cv) => (
                        <div
                            className="col-md-4 col-sm-6"
                            role="button"
                            style={{ maxWidth: "240px" }}
                        >
                            <Cv cv={cv} isEditable={true} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyCvs;
