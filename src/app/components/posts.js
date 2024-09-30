"use client";
import React, { useEffect, useState } from "react";

const stripHTML = (html) => {
  return html.replace(/<[^>]+>/g, "");
};

// Function to extract image URLs from HTML content
const extractImages = (html) => {
  const regex = /<img[^>]+src="([^">]+)"/g;
  const images = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    images.push(match[1]);
  }
  return images;
};

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();

        // Log de hele respons om te controleren wat je terugkrijgt
        console.log("Response data:", data);

        // Hier gaat het fout: je probeert data.posts te gebruiken
        // Maar als data een array is, sla dit dan over
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Geen posts gevonden in de respons.");
        }

        // Gebruik de data direct, aangezien het een array is
        const allPosts = data;

        // Filter en map de posts
        const cleanedPosts = allPosts
          .filter((post) => post.ID && post.post_title && post.post_content)
          .map((post) => ({
            ...post,
            post_content: stripHTML(post.post_content || ""),
            images: extractImages(post.post_content || ""),
          }));

        // Stel de posts in
        setPosts(cleanedPosts);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleClick = (post) => {
    navigate("/product", { state: { product: post } });
  };

  return (
    <div
      id="cases-section"
      className="relative top-[-50px] lg:top-[-250px] px-4 lg:px-0"
    >
      <h2 className="font-bold text-2xl lg:text-3xl text-center mb-6 lg:mb-11">
        <i>Cases</i>
      </h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.ID}
            className="flex flex-col mb-4 lg:mb-6 p-4 lg:p-6 border border-gray-200 rounded-lg"
          >
            <div className="flex lg:flex-row items-center gap-4">
              <div className="w-[30px] h-[30px] rounded-full bg-purple-400"></div>
              <div className="flex-1 flex items-center gap-3">
                <h3 className="text-xl lg:text-2xl font-semibold">
                  {post.post_title}
                </h3>
                <span className="text-xl lg:text-2xl font-semibold hidden lg:block">
                  -
                </span>
                <p className="font-light italic text-sm ml-2">
                  Marketing website
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <p className="p-4 lg:p-6 max-w-[400px]  lg:text-left">
                  {post.post_content}
                </p>
              </div>
              {post.images.length > 0 && (
                <div className="flex-none">
                  {post.images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Post image ${index}`}
                      className="w-full  h-auto mb-4 mx-auto lg:mx-0"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No posts available.</p>
      )}
    </div>
  );
}
