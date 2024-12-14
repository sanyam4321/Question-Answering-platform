import React, { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { hostname } from '../hostname';

function Login({setHaveAccount, setAuthenticated}) {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async (e)=>{
    try{
      const user = {
        email: emailRef.current.value.trim(), 
        userpassword: passwordRef.current.value.trim()
      }
      toast.loading("Logging in");
      const response = await fetch(`${hostname}/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      toast.dismiss();
      if(data.status === "success"){
        localStorage.setItem("user", JSON.stringify({username: data.user.username, email: data.user.email}));
        setAuthenticated(true);
      }
      else{
        toast.error(data.message);
      }
    } catch(error){
      toast.dismiss();
      toast.error("Error Logging in");
    }
  }
  return (
    <div className='login-section'>
      <h2>Login to Blogger</h2>
      <div className="login-form">
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="text" id='email' name='email' placeholder='Your email'/>
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id='password' name='password' placeholder='Your password' />
        </div>
        <div className="login-btn">
          <button onClick={(e)=>{setHaveAccount(false)}} className='signup-btn'>Don't have account?</button>
          <button onClick={handleLogin} className='login-btn-btn'>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Login