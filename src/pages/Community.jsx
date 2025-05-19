import { CommunityPost, CommunityPostInput } from "@/components";
import axios from "axios";
import React, { useEffect, useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;
import { useDispatch, useSelector } from "react-redux"
import { hideLoader, showLoader } from "@/redux/loaderSlice"

function getTimeAgo(dateString) {
const now = new Date();
const postDate = new Date(dateString);

const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);


  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diffInSeconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}


function Community() {
  const [posts,setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchPosts()
  },[])

  async function fetchPosts(){
    try {
      dispatch(showLoader());
       let response = await axios.post(`${apiURL}/api/post/get`,{},{
      headers:{
        authorization:sessionStorage.getItem("token")
      }
        });
        console.log(response.data.data) // is an array
        setPosts(response.data.data); // is an array
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(hideLoader());
    }
    
  };

  return (
    <div className={`w-full ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      <div className="w-full ">
        <h1 className="text-primary text-4xl lg:text-6xl font-bold text-center my-6">
          COMMUNITY
        </h1>

        <CommunityPostInput onPostSuccess={fetchPosts} />

        <br />
        {/* <CommunityPost
          post={{
            user: {
              name: "Abhaydeep Singh",
              username: "abhaydev",
              avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=abhay",
            },
            time: "2h",
            content: "Just launched my new project 🚀 Check it out!",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=q",
            comments: 12,
            reposts: 5,
            likes: 87,
          }}
        /> */}
        {posts?.length > 0 ? posts.map((element,index)=>{
          const timeAgo = getTimeAgo(element.createdAt);
          return(
           <CommunityPost key={index}
           post={{
             user: {
               name: element.addedBy.name,
               username: element.addedBy.username,
               avatar: element.addedBy.image,
             },
             time: timeAgo,
             content: element.content,
             image: element.image,
             comments: 12,
             reposts: 5,
             likes: 87,
           }}
         />)
        }) : null}
        
      </div>
    </div>
  );
}

export default Community;
