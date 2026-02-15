const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Node received userId:", userId);

    const response = await axios.get(
      `https://python-backend-dnwl.onrender.com/analytics/stats/${userId}`,
      {
        timeout: 120000
      }
    );

    console.log("Python response received");

    res.json(response.data);

  } catch (error) {

    // 🔥 SHOW REAL ERROR
    console.log("====== AXIOS ERROR FULL ======");
    console.log("code:", error.code);
    console.log("message:", error.message);
    console.log("hostname:", error.hostname);
    console.log("response:", error.response?.data);
    console.log("status:", error.response?.status);
    console.log("===============================");

    res.status(500).json({
      message: "Failed to fetch analytics",
      error: error.code || error.message
    });
  }
});

module.exports = router;
