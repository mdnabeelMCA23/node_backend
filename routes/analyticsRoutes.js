const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET USER ANALYTICS
router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Node received userId:", userId);

    const response = await axios.get(
      `https://python-backend-dnwl.onrender.com/analytics/stats/${userId}`,
      {
        timeout: 30000,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Python Response:", response.data);

    return res.status(200).json(response.data);

  } catch (error) {
    console.error("Full Analytics Error:", error.response?.data || error.message);

    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;
