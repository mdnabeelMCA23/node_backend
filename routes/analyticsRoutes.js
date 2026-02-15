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
        timeout: 120000 // ⬅️ 2 MINUTES (Render cold start fix)
      }
    );

    console.log("Python success");

    res.json(response.data);

  } catch (error) {
    console.error("REAL ERROR:", error.code, error.message);

    res.status(500).json({
      message: "Python service is waking up. Try again in 20 seconds.",
      debug: error.message
    });
  }
});

module.exports = router;
