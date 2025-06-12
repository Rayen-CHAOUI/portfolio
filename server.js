// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); 

const app = express();
const PORT = process.env.PORT || 3000;
const FORMSPREE_URL = process.env.FORMSPREE_URL;

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit-form", async (req, res) => {
  const formData = new URLSearchParams();
  for (const key in req.body) {
    formData.append(key, req.body[key]);
  }

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    if (response.ok) {
      res.status(200).json({ message: "Message sent!" });
    } else {
      const err = await response.json();
      res.status(400).json({ message: "Formspree error", error: err });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
