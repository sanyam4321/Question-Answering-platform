import { Outlet, useRoutes } from "react-router-dom"
import Navbar from "./Navbar";
import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";
import BlogComponent from "./BlogComponent";
import "../stylesheets/app.css"
function AppContent({setAuthenticated}){
  return (
    <div className="app">
      <Navbar setAuthenticated={setAuthenticated} />
      <Outlet />
    </div>
  )
}


function App({setAuthenticated}) {
  let element = useRoutes([
    {
      path: "/",
      element: <AppContent setAuthenticated={setAuthenticated} />,
      children: [
        {
          path: "feeds/:pageno",
          element: <BlogList />
        },
        {
          path: "myblogs/:pageno",
          element: <BlogList />
        },
        {
          path: "create",
          element: <CreateBlog />
        },
        {
          path: "blog/:blogid",
          element: <BlogComponent />
        }
      ]
    }
  ]);
  return element;
}

export default App