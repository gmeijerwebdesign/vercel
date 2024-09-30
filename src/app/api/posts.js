
// src/pages/api/posts.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("http://localhost:5000/api/posts");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching posts from Express:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
}
