// src/app/home/page.js
import Head from "next/head";
import Contact from "../components/contact";
import ShortAbout from "../components/short-about";
import PostList from "../components/posts";

async function fetchPosts() {
  const response = await fetch("http://localhost:5000/api/posts"); // Dit haalt de data van de Next.js API route op
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default async function Home() {
  let posts = [];

  try {
    posts = await fetchPosts();
    console.log(posts); // Controleer of posts goed zijn opgehaald
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="w-[100vw] lg:w-[80vw]">
        <div className="flex  justify-center lg:justify-end">
          <Contact />
        </div>
        <ShortAbout />
        <PostList />
      </div>
    </div>
  );
}
