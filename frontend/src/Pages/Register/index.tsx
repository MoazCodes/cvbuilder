import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export default function Register() {
    const [user, setUser] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const [err, setErr] = useState<string>("");
    const [errs, setErrs] = useState<Array<string>>([]);
    const navigate = useNavigate();

    function getdata(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    }

    function validation() {
        let schema = Joi.object({
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["m", "eg", "com", "net"] },
                })
                .required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
                .required(),
        });
        return schema.validate(user, { abortEarly: false });
    }

    function clearInputs() {
        let inputs: any = document.querySelectorAll("input");
        for (let i of inputs) {
            i.value = "";
        }
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErr("");
        setErrs([]);
        const { error } = validation();

        if (error) {
            error.details.map((e) => {
                let impErr: string;
                if (e.message.includes("first_name")) {
                    impErr = "First name must be at least 3 characters long.";
                } else if (e.message.includes("last_name")) {
                    impErr = "Last name must be at least 3 characters long.";
                } else if (e.message.includes("password")) {
                    impErr =
                        "Password must be 8-30 characters long and contain only letters and numbers.";
                }
                setErrs((prv) => [...prv, impErr]);
            });
            return;
        }

        axios
            .post("http://localhost:8000/signup/", user)
            .then((res) => {
                clearInputs();
                navigate("/login");
            })
            .catch((e) => {
                console.log(e);
                setErr(e.response.data?.error);
            });
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <form
                className="col-sm-8 col-md-6 col-lg-4 p-4 border rounded shadow-sm"
                onSubmit={submit}
            >
                <h2 className="text-center mb-4">Register</h2>
                {(errs.length || err) && (
                    <p className="h2 text-danger text-center alert alert-danger">
                        Errors
                    </p>
                )}
                <ul className="list-unstyled">
                    {errs.map((e, i) => (
                        <li key={i} className="alert alert-danger">
                            {e}
                        </li>
                    ))}
                </ul>
                {err && <p className="h4 alert alert-danger">{err}</p>}

                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                        First Name:
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="first_name"
                        name="first_name"
                        placeholder="Enter your first name"
                        required
                        onChange={getdata}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="last_name"
                        name="last_name"
                        placeholder="Enter your last name"
                        required
                        onChange={getdata}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control bg-light"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={getdata}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control bg-light"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={getdata}
                    />
                </div>

                <button
                    type="submit"
                    className="btn w-100"
                    style={{ background: "var(--main-color)", color: "white" }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}
