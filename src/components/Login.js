import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Login() {
    const [credentials,setcredentials]=useState({email: "",password: ""});
    let history=useNavigate();
    const handlesubmit= async(e)=>{
        e.preventDefault();
       // const response = await fetch(`http://localhost:5000/api/auth/login`, {
        const response = await fetch(`https://mongodb+srv://anu052:Anurag2023@cluster0.ocuv7ec.mongodb.net/clgproject?retryWrites=true&w=majority/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password }),
          });
          const json= await response.json();
          console.log(json);
          if(json.success)
          {
            localStorage.setItem('token',json.authtoken);
            alert("Logged in successfully","success");
            history("/home");
          }
          else
          {
            alert("Invaild Details")
          }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value});
      };
  return (
    <div className="card display-center login-style-1">
      <h2 className='h2'>Sign</h2>
    <div className='login-style mx-3 my-3'>
              <form  onSubmit={handlesubmit}>
        <div className="form-group my-3 ">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required value={credentials.email} onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="Password" name="password" required placeholder="Password" value={credentials.password} onChange={onChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your Password with anyone else.</small>
        </div>
   
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Login