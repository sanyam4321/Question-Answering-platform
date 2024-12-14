import { useLayoutEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import App from "./components/App";
import Auth from "./components/Auth";
import { Toaster } from "react-hot-toast";

function checkLogin(){
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
    return true;
  }
  return false;
}

function Root() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useLayoutEffect(()=>{
    if(checkLogin()){
      setAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated ? <App setAuthenticated={setAuthenticated} /> : <Auth setAuthenticated={setAuthenticated} />}
      <Toaster />
    </>
  )
}

export default Root