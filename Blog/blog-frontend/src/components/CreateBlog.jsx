import React, { useRef } from 'react'
import toast from 'react-hot-toast';
import "../stylesheets/createBlog.css"
import { hostname } from '../hostname';
function CreateBlog() {

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleSubmit = async (e)=>{
    try {
      const blog = {
        title: titleRef.current.value.trim(),
        content: contentRef.current.value.trim()
      }
      toast.loading("Creating your blog");
      const response = await fetch(`${hostname}/api/v1/blog/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog)
      });
      const data = await response.json();
      toast.dismiss();
      if(data.status === "success"){
        toast.success("Blog created successfully");
        titleRef.current.value = null;
        contentRef.current.value = null;
      }
      else{
        toast.error("Error creating blog");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating blog");
    }
  }

  return (
    <div className='create-blog'>
      <div className="create-heading">
        <h1>Create your Blog</h1>
      </div>
      <div className="create-form">
        <div className="create-title">
          <input ref={titleRef} id='title' name='title' type="text" placeholder='Write a catchy title for your blog' />
        </div>
        <div className="create-content">
          <textarea ref={contentRef} name="content" id="content" cols="40" rows="15" placeholder='Start writing your blog content here'></textarea>
        </div>
        <div className="create-btn">
          <button onClick={handleSubmit} id='content-post'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog