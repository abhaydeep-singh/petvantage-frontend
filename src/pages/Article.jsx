import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // or use your routing logic
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
const apiURL = import.meta.env.VITE_API_URL;

function Article() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  async function addComment() {
    setLoading(true);
    try {
      let response = await axios.post(
        `${apiURL}/api/blog/addcomment`,
        {
          comment,
          blogID: id,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data.data);
      if (response.data.success) {
        toast.success("Comment Added Successfully!", { theme: "dark" });
        // setOpen(false);
      } else {
        toast.warn(`Error while adding Comment: ${response.data.message}`, {
          theme: "dark",
        });
      }
      setComment("");
    } catch (error) {
      console.log("An error occured while posting comment: ", error);
    } finally {
      setLoading(false);
      setTrigger(!trigger);
    }
  }

  async function deleteComment(c_id) {
    try {
      let response = await axios.post(
        `${apiURL}/api/blog/deletecomment`,
        {
          commentID: c_id,
          blogID: id,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      // console.log(response);
      setTrigger(!trigger);
    } catch (error) {
      console.log("Something went wrong while deleting comment: ", error);
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.post(
          `${apiURL}/api/blog/single`,
          {
            _id: id, //6811f31c73c690a8f0b52248
          },
          {
            headers: {
              authorization: sessionStorage.getItem("token"),
            },
          }
        );
        // console.log(res);

        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      try {
        let response = await axios.post(
          `${apiURL}/api/blog/allcomments`,
          {},
          {
            headers: {
              authorization: sessionStorage.getItem("token"),
            },
          }
        );

        // console.log(response.data.data);
        setComments(response.data.data[0].commentIDs);
      } catch (error) {
        console.log("An error occured while fethcing comments: ", error);
      }
    };
    getComments();
  }, [trigger]);

  if (!blog) return <p className="text-white p-4">Loading blog...</p>;

  return (
    <div className="text-white min-h-screen w-full">
      <ToastContainer />
      {/* Hero Section */}
      <header className="relative h-[50vh] bg-cover bg-center flex items-center bg-[url(/images/hero1.jpg)]">
        <div className="w-full h-full bg-black bg-opacity-60 flex flex-col justify-center text-center px-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="text-gray-300 mt-3">
            Published by {blog.addedByID.name || "Anonymous"}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Dynamic Blog HTML */}
        <article
          className="bg-secondary p-6 rounded-xl shadow-lg leading-relaxed prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author Section */}
        <div className="mt-8 flex items-center gap-4 bg-secondary border border-primary p-4 rounded-lg shadow-md">
          <img
            src={blog.addedByID.image}
            alt="Author"
            className="w-16 h-16 rounded-full border-2 border-primary"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {blog.addedByID.name || "John Doe"}
            </h3>
            <p className="text-gray-400 text-sm">Writer & Storyteller</p>
          </div>
        </div>

        {/* Comments */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold">💬 Comments</h3>

          {/* Comment Input Box */}
          <div className="mt-4">
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg resize-none outline-none"
              rows={3}
            />
            {loading ? (
              <ClipLoader />
            ) : (
              <Button onClick={() => addComment()}>Post Comment</Button>
            )}
          </div>

          {comments.length > 0
            ? comments.map((item, index) => {
                return (
                  // <Comment key={index} c_id={item._id} text={item.comment} author={item.userID.name} image={item.userID.image} />
                  <div key={index} className="bg-gray-800 p-3 rounded-lg shadow mt-2 flex items-start gap-4">
                    {/* Profile Picture */}
                    <img
                      src={item.userID.image}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    {/* Name & Comment */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-semibold text-sm">
                          {item.userID.name}
                        </h4>
                        <button
                          className="text-red-400 hover:text-red-600 text-xs"
                          onClick={() => {
                            deleteComment(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{item.comment}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </section>

        <footer className="mt-10 text-gray-500 text-center text-sm">
          &copy; {new Date().getFullYear()} PetVantage Blog. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}
export default Article;

