import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;


function Blog() {
  const [articles, setArticles] = useState([]);
  async function fetchArticles() {
    try {
      let response = await axios.post(
        `${apiURL}/api/blog/all`,
        {},
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data.data);
      setArticles(response.data.data);
    } catch (error) {
      console.log("An error occured while fetching Articles: ", error);
    }
  }
  useEffect(() => {
    const getArticles = async () => {
      await fetchArticles();
    };
    getArticles();
  }, []);

  return (
    <div className=" text-white h-screen p-6 w-full ">
      <div className="max-w-4xl mx-auto">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-4 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-primary">PetVantage Blog</h1>
          <Button>Subscribe</Button>
        </nav>

        {/* Hero Section */}
        <header className="mt-8 text-center">
          <h2 className="text-5xl font-extrabold text-primary">
            Welcome to Our Blog
          </h2>
          <p className="text-gray-400 mt-2">
            Insights, stories, and trends in the pet industry.
          </p>
        </header>

        {/* Featured Article */}
        {/* <section className="mt-10 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold text-white">
            🐾 The Future of Pet Care
          </h3>
          <p className="text-gray-400 mt-2">
            Explore the latest trends in pet healthcare, technology, and
            nutrition.
          </p>
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition">
            Read More
          </button>
        </section> */}

        {/* Articles */}
        <div className="mt-10 grid gap-6">
          {articles?.length > 0
            ? articles.map((item, index) => {
                return (
                  <Article
                    key={index}
                    title={item.title}
                    articleID = {item._id}
                    desc={item.content}
                  />
                );
              })
            : null}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-gray-500 text-center text-sm">
          &copy; {new Date().getFullYear()} PetVantage Blog. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}

export function Article({ title, desc,articleID }) {
  const navigate = useNavigate();
  return (
    <article className="bg-secondary p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:bg-gray-700">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-gray-400 mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: desc }}></p>
      <button className="mt-4 text-primary hover:underline" onClick={()=>navigate(`/article/${articleID}`)}>Read More →</button>
    </article>
  );
}

export default Blog;

