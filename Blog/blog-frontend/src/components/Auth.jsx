import React, { useState } from 'react'
import Login from './Login';
import Signup from './Signup';
import "../stylesheets/auth.css"

function Auth({ setAuthenticated }) {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <div className='auth'>
      <div className="auth-container">
        <div className="auth-heading-intro">
          <h1 className='auth-heading'>Blogger</h1>
          <p className='auth-intro'>A place to share knowledge and explore</p>
        </div>
        {haveAccount ? <Login setHaveAccount={setHaveAccount} setAuthenticated={setAuthenticated} /> : <Signup setHaveAccount={setHaveAccount} setAuthenticated={setAuthenticated} />}
      </div>
    </div>
  )
}

export default Auth