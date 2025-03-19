import { useState } from "react";

export default function BlogGrid() {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      {/* Hero Section */}
      <header className="relative h-[60vh] bg-[url('https://unsplash.com/photos/brown-short-coated-dog-on-gray-couch-s9Tf1eBDFqw')] bg-cover bg-center flex items-center">
        <div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            PetVantage Blog
          </h1>
          <p className="text-gray-300 mt-3 max-w-lg">
            Discover the latest trends, stories, and insights on pet care.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Blog Articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Article
            title="🐾 The Best Dog Breeds for Families"
            desc="Explore the most loving and family-friendly dog breeds."
            tag="Guides"
          />
          <Article
            title="🐕‍🦺 How to Train Your Puppy"
            desc="Essential tips for raising a well-behaved and happy dog."
            tag="Training"
          />
          <Article
            title="🐱 Understanding Cat Behavior"
            desc="Decode your cat's behavior and build a stronger bond."
            tag="Behavior"
          />
          <Article
            title="🦴 Best Pet Diets in 2025"
            desc="A look into the healthiest diets for your furry friends."
            tag="Health"
          />
          <Article
            title="🎾 Must-Have Toys for Your Pets"
            desc="Top picks for engaging and fun pet toys in 2025."
            tag="Products"
          />
          <Article
            title="🚀 The Future of Pet Technology"
            desc="How smart tech is revolutionizing pet care."
            tag="Trends"
          />
        </div>

        {/* Newsletter Subscription */}
        <section className="bg-gray-800 p-6 rounded-xl text-center mt-10 shadow-lg">
          <h3 className="text-2xl font-semibold">📩 Stay Updated!</h3>
          <p className="text-gray-400 mt-2">
            Subscribe to our newsletter for the latest pet tips and trends.
          </p>
          <div className="mt-4 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-lg bg-gray-700 text-white border-none outline-none"
            />
            <button className="bg-primary px-4 py-3 rounded-r-lg hover:bg-opacity-80 transition">
              Subscribe
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-gray-500 text-center text-sm">
          &copy; {new Date().getFullYear()} PetVantage Blog. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export function Article({ title, desc, tag }) {
  return (
    <article className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-gray-700 relative">
      <span className="absolute top-3 right-3 bg-primary px-3 py-1 text-xs rounded-lg text-white">
        {tag}
      </span>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-gray-400 mt-2">{desc}</p>
      <button className="mt-4 text-primary hover:underline">Read More →</button>
    </article>
  );
}
