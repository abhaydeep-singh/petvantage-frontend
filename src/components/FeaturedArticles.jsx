import React, { useEffect, useState } from "react";
import dog from "../assets/images/dog.jpg";
import birds1 from "../assets/images/birds1.jpg";
import peta from "../assets/images/peta.jpg";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "@/redux/loaderSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;

function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function fetchArticles() {
      try {
        dispatch(showLoader());
        let response = await axios.post(
          `${apiURL}/api/blog/all`,
          {},
          {
            headers: {
              authorization: sessionStorage.getItem("token"),
            },
          }
        );
        // console.log(response.data.data.slice(0, 3));
        setArticles(response.data.data.slice(0, 3));
      } catch (error) {
        console.log("An error occured while fetching Articles: ", error);
      } finally {
        dispatch(hideLoader());
      }
    })();
  }, []);
  return (
    <div className="w-full h-[80vh] p-5">
      <br />
      <h2 className="text-primary text-center text-6xl">Featured Articles</h2>
      <br />
      <br />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 rounded py-6">
        {articles[0] && (
          <div className="article-box w-[90%] h-[50vh] border hover:border-primary rounded-xl overflow-hidden flex flex-col" onClick={()=>navigate(`/article/${articles[0]._id}`)}>
            <div className="img h-[70%] border bg-accent overflow-hidden">
              <img src={dog} alt="" />
            </div>
            <div className="text flex flex-col px-4 py-2">
              <h2 className="text-primary text-2xl">{articles[0].title}</h2>
            </div>
          </div>
        )}

        {articles[1] && (
          <div className="article-box w-[90%] h-[50vh] border hover:border-primary rounded-xl overflow-hidden flex flex-col" onClick={()=>navigate(`/article/${articles[1]._id}`)}>
            <div className="img h-[70%] border bg-accent overflow-hidden">
              <img src={birds1} alt="" />
            </div>
            <div className="text flex flex-col px-4 py-2">
              <h2 className="text-primary text-2xl">{articles[1].title}</h2>
            </div>
          </div>
        )}

        {articles[2] && (
          <div className="article-box w-[90%] h-[50vh] border hover:border-primary rounded-xl overflow-hidden flex flex-col" onClick={()=>navigate(`/article/${articles[2]._id}`)}>
            <div className="img h-[70%] border bg-accent overflow-hidden">
              <img src={peta} alt="" />
            </div>
            <div className="text flex flex-col px-4 py-2">
              <h2 className="text-primary text-2xl">{articles[2].title}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedArticles;
