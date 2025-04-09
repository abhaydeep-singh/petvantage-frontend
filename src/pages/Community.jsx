import { CommunityPost } from "@/components";
import React from "react";

function Community() {
  return (
    <div className={`w-full ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      <div className="w-full ">
        <h1 className="text-primary text-4xl lg:text-6xl font-bold text-center my-6">
          COMMUNITY
        </h1>
        <CommunityPost
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
        />

        <CommunityPost
          post={{
            user: {
              name: "Abhaydeep Singh",
              username: "abhaydev",
              avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=hay",
            },
            time: "2h",
            content: "Just launched my new project 🚀 Check it out!",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=r46",
            comments: 12,
            reposts: 5,
            likes: 87,
          }}
        />

        <CommunityPost
          post={{
            user: {
              name: "Abhaydeep Singh",
              username: "abhaydev",
              avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=ghjk",
            },
            time: "2h",
            content: "Just launched my new project 🚀 Check it out!",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=pp",
            comments: 12,
            reposts: 5,
            likes: 87,
          }}
        />
      </div>
    </div>
  );
}

export default Community;
