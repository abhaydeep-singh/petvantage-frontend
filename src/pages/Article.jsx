import { useState } from "react";

export default function Article() {
  return (
    <div className=" text-white min-h-screen w-full">
      {/* Hero Section with Featured Image */}
      {/* <header className="relative h-[50vh] bg-[url('https://source.unsplash.com/1600x900/?nature,writing')] bg-cover bg-center flex items-center"> */}

        <header
            className="relative h-[50vh] bg-cover bg-center flex items-center bg-[url(/images/hero1.jpg)]"
        >
        <div className="w-full h-full bg-black bg-opacity-60 flex flex-col justify-center text-center px-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            The Joy of Writing
          </h1>
          <p className="text-gray-300 mt-3">
            A journey into the art of storytelling
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Article Content */}
        <article className="bg-secondary p-6 rounded-xl shadow-lg leading-relaxed">
          <p className="text-lg text-gray-300">
            Writing is an art form that allows us to express our thoughts,
            emotions, and imagination. Whether it's through fiction, poetry, or
            personal journaling, words have the power to inspire, educate, and
            connect people across the world.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            The Magic of Storytelling
          </h2>
          <p className="text-gray-400 mt-2">
            Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the world. Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the world. Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the <br/> Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the world.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Why Writing Matters</h2>
          <p className="text-gray-400 mt-2">
            Writing allows us to capture memories, share knowledge, and bring
            new ideas to life. It’s a tool for self-expression, communication,
            and creativity. <br /><br />
            Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the world. Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the world. Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the <br/> Stories have been a fundamental part of human culture for thousands
            of years. From ancient myths to modern novels, storytelling shapes
            our understanding of the world.
          </p>

          {/* Author Section */}
          <div className="mt-8 flex items-center gap-4 bg-secondary border border-primary p-4 rounded-lg shadow-md">
            <img
              src="https://source.unsplash.com/100x100/?person"
              alt="Author"
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-400 text-sm">Writer & Storyteller</p>
            </div>
          </div>
        </article>

        {/* Comment Section */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold">💬 Comments</h3>
          <CommentSection />
        </section>

        {/* Footer */}
        <footer className="mt-10 text-gray-500 text-center text-sm">
          &copy; {new Date().getFullYear()} PetVantage Blog. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}

// Comment Section Component
function CommentSection() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, { text: comment, id: Date.now() }]);
    setComment("");
  };

  return (
    <div className="mt-4">
      {/* Comment Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="p-3 flex-1 rounded-lg bg-gray-700 text-white outline-none border-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-primary px-4 py-3 rounded-lg hover:bg-opacity-80 transition"
        >
          Post
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-800 p-3 rounded-lg shadow mt-2">
              <p className="text-gray-300">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


