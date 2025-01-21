const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3001; // Proxy server running on a different port

// Proxy to the original API
app.use(
  "/points",
  createProxyMiddleware({
    target: "https://points-ntev.onrender.com/points",
    changeOrigin: true,
    pathRewrite: {
      "^/points": "/points", // Keep the same path
    },
  })
);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
