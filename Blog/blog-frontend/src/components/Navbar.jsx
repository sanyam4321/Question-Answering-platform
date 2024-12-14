import React from 'react'
import { NavLink } from 'react-router-dom'
import "../stylesheets/navbar.css"
import toast, { Toaster } from 'react-hot-toast';
import { hostname } from '../hostname';

function Navbar({ setAuthenticated }) {
  const handleLogout = async (e) => {
    try {
      toast.loading("Logging out");
      const response = await fetch(`${hostname}/api/v1/auth/logout`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await response.json();
      toast.dismiss();
      if (data.status === "success") {
        localStorage.removeItem("user");
        setAuthenticated(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error Logging out");
    }
  }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <NavLink className="nav-navlink" to="/">Blogger</NavLink>
      </div>
      <div className="nav-actions">
        <div className="nav-links">
          <NavLink className="nav-navlink nav-feed" to="/feeds/1"><i className="ri-list-indefinite"></i><span>Feed</span></NavLink>
          <NavLink className="nav-navlink nav-feed" to="/myblogs/1"><i className="ri-list-view"></i><span>Blogs</span></NavLink>
        </div>
        <div className="nav-buttons">
          <NavLink className="nav-navlink" to="create"><i className="ri-add-circle-line"></i></NavLink>
          <button onClick={(e) => { handleLogout(e) }}><i className="ri-logout-box-line"></i></button>
        </div>
      </div>

    </div>
  )
}

export default Navbar