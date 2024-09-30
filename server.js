// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost/portfolio-wp/wordpress/voorbeeld-bericht/"
    );

    if (response.status === 200) {
      console.log("Fetched posts from WordPress API:", response.data);
      res.status(200).json(response.data);
    } else {
      console.error("Failed to fetch posts:", response.statusText);
      res
        .status(response.status)
        .json({ msg: "Failed to fetch posts", error: response.statusText });
    }
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ msg: "Error fetching posts", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
