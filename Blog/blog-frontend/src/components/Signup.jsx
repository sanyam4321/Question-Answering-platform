import React, { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { hostname } from '../hostname';

function Signup({ setHaveAccount, setAuthenticated }) {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmRef = useRef("");

  const handleSignup = async (e) => {
    toast.dismiss();
    if (passwordRef.current.value != confirmRef.current.value) {
      toast.error("passwords don't match");
      return -1;
    }
    try {
      const user = {
        username: nameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        userpassword: passwordRef.current.value.trim()
      }
      toast.loading('Signing up');
      const response = await fetch(`${hostname}/api/v1/auth/signup`, {
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
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify({username: user.username, email: user.email}));
        setAuthenticated(true);
      }
      else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.dismiss();
      toast.error("Error Signing up");
    }
  }

  return (
    <div className='login-section'>
      <h2>Sign up to Blogger</h2>
      <div className="login-form">
        <div className="login-input">
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id='name' name='name' placeholder='What would you like to be called?' />
        </div>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="text" id='email' name='email' placeholder='Your email' />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id='password' name='password' placeholder='Your password' />
        </div>
        <div className="login-input">
          <label htmlFor="confirm">Confirm password</label>
          <input ref={confirmRef} type="password" id='confirm' name='confirm' placeholder='Re-enter password' />
        </div>
        <div className="login-btn">
          <button onClick={(e) => { setHaveAccount(true) }} className='signup-btn'>Already have account?</button>
          <button onClick={handleSignup} className='login-btn-btn'>Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default Signup