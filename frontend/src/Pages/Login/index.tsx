import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Joi, { func } from 'joi';
import axios from 'axios';
import { Link } from 'react-router-dom';


//error message from frontend and backend


type User = {
  email: string;
  password: string;
};

export default function Login() {
  const [user,setUser]=useState<User>({
    'email':"",
    'password':"",
  })

  const [err,setErr]=useState<string>("");
  const [errs,setErrs]=useState<Array<string>>([]);
  
  
  
  function getdata(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name ]: value,  
    });

  }


  function validation(){
    let schema = Joi.object({
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
    setErr("");
    setErrs([]);
    const { error } = validation(); 

    if (error) {
      // console.log(error.details); 
      error.details.map((e,i)=>{
        let impErr:string;
        if (e.message.includes("password")) {
          impErr = "Password must be 8-30 characters long and contain only letters and numbers.";
        }
        setErrs((prv)=> [...prv,impErr] )
      })
      return;
    } 

    axios
        .post("http://localhost:8000/login/", user)
        .then((res) => {
          // console.log(res);
          let token:string;
          token=res?.data?.token;
          localStorage.setItem("token",token);

          clearInputs();
        })
        .catch((e) => {
          // console.log(e.response.data.error);
          setErr(e.response.data?.error);

        });

    
  }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form className="col-sm-8 col-md-6 col-lg-4 p-4 border rounded shadow-sm" onSubmit={submit}>
        <h2 className="text-center mb-4">Login</h2>

        {(errs.length || err)&&(<p className='h2 text-danger text-center alert alert-danger'>Errors</p>)}
        <ul  className="list-unstyled">
          {errs.map((e,i)=>(
            <li key = {i} className='alert alert-danger '>{e}</li>
          ))}

        </ul>

        {err&&<p className='h4 alert alert-danger'>{err}</p>}

        

        

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

        <button type="submit" className="btn btn-primary w-100" >Login</button>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Create a new account</Link>
          </p>
        </div>
      </form>
      
    </div>
  );
}
