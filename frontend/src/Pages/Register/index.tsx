import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Joi, { func } from 'joi';
import axios from 'axios';


//error message from frontend and backend


type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export default function Register() {
  const [user,setUser]=useState<User>({
    'first_name':"",
    'last_name':"",
    'email':"",
    'password':"",
  })
  
  
  
  function getdata(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name ]: value,  
    });

  }


  function validation(){
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["m","eg","com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  function clearInputs(){
    let inputs:any=document.querySelectorAll('input');
    
    for(let i of inputs){
      i.value='';
    }
  }

  function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    const { error } = validation(); 

    if (error) {
      console.log(error.details); 
      return;
    } 

    axios
        .post("http://localhost:8000/signup/", user)
        .then((res) => {
          // console.log(res);
          let token:string;
          token=res?.data?.token;
          localStorage.setItem("token",token);
          clearInputs();
        })
        .catch((err) => {
          // console.log(err);
          let errMessage:string=err.response.data.error;
          // console.log(errMessage);

        });

    
  }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form className="col-sm-8 col-md-6 col-lg-4 p-4 border rounded shadow-sm" onSubmit={submit}>
        <h2 className="text-center mb-4">Register</h2>

        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name:</label>
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
          <label htmlFor="last_name" className="form-label">Last Name:</label>
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
          <label htmlFor="email" className="form-label">Email:</label>
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
          <label htmlFor="password" className="form-label">Password:</label>
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

        <button type="submit" className="btn btn-primary w-100" >Register</button>
      </form>
    </div>
  );
}
