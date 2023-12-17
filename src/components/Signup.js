import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Signup() {
  const [credentials,setcredentials]=useState({name: "",email: "",password: "",cpassword:""});
    let history=useNavigate();
  const handlesubmit= async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password }),
      });
      const json= await response.json();
      console.log(json);
      if(json.success)
      {
        localStorage.setItem('token',json.authtoken);
        history("/home");
        alert("Signup is successfully","success")
      }
      else
      {
        alert("Invaild Details","danger")
      }
}
const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value});
  };
  return (
    <div>
        <div className="card display-center login-style-2">
        <h2 className='h2'>SignUp</h2>
        <div className= 'login-style mx-3 my-3'>
             <form  onSubmit={handlesubmit}>
             <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" required onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="Password" name="password" placeholder="Password" required  onChange={onChange}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" id="cPassword" name="cpassword" placeholder="Confirm Password" required onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Signup