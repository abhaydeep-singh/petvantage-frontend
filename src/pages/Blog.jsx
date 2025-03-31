// import { useState } from "react";

// export default function Blog() {
//   return (
//     <div className={` text-white min-h-screen p-6 w-full`} >
//       <div className="max-w-3xl mx-auto">
//         <header className="mb-6">
//           <h1 className="text-4xl font-bold text-primary my-1">PetVantage Blog</h1>
//           <p className="text-gray-400">A minimalist blog template using Tailwind CSS</p>
//         </header>
//         <Article title={"Blog Post Title"} desc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."}/>
//         <Article title={"Blog Post Title"} desc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."}/>
//         <Article title={"Blog Post Title"} desc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."}/>

//         <footer className="mt-6 text-gray-500 text-center">
//           &copy; {new Date().getFullYear()} My Blog. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// }


// export function Article({title,desc}){
//     return(
//         <article className="bg-secondary p-6 rounded-lg shadow-lg mb-6">
//           <h2 className="text-2xl font-semibold">{title}</h2>
//           <p className="text-gray-300 mt-2">{desc}</p>
//         </article>
//     )
// }








import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Blog() {
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
          <h2 className="text-5xl font-extrabold text-primary">Welcome to Our Blog</h2>
          <p className="text-gray-400 mt-2">
            Insights, stories, and trends in the pet industry.
          </p>
        </header>

        {/* Featured Article */}
        <section className="mt-10 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold text-white">🐾 The Future of Pet Care</h3>
          <p className="text-gray-400 mt-2">
            Explore the latest trends in pet healthcare, technology, and nutrition.
          </p>
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition">
            Read More
          </button>
        </section>

        {/* Articles */}
        <div className="mt-10 grid gap-6">
          <Article
            title="How to Keep Your Pet Healthy"
            desc="Simple and effective ways to ensure your pet's well-being every day."
          />
          <Article
            title="The Best Pet Accessories in 2025"
            desc="A curated list of the best accessories for your furry friends."
          />
          <Article
            title="Why Your Pet Needs a Daily Routine"
            desc="Understanding the benefits of a structured daily routine for pets."
          />
        </div>

        {/* Footer */}
        <footer className="mt-10 text-gray-500 text-center text-sm">
          &copy; {new Date().getFullYear()} PetVantage Blog. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export function Article({ title, desc }) {
  return (
    <article className="bg-secondary p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:bg-gray-700">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-gray-400 mt-2">{desc}</p>
      <button className="mt-4 text-primary hover:underline">Read More →</button>
    </article>
  );
}









