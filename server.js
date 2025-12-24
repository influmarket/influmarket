const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>influ.market – Hire Influencers</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Hire verified influencers in Serbia. Brands and people book influencers with confidence." />
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background: #ffffff;
      color: #111;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      max-width: 520px;
      padding: 40px 20px;
    }
    h1 {
      font-size: 42px;
      margin-bottom: 10px;
      letter-spacing: -1px;
    }
    .tagline {
      font-size: 20px;
      color: #555;
      margin-bottom: 35px;
    }
    .buttons {
      margin-bottom: 40px;
    }
    .btn {
      display: inline-block;
      margin: 8px;
      padding: 14px 26px;
      border-radius: 6px;
      border: 1px solid #111;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      color: #111;
      transition: all 0.2s ease;
    }
    .btn.primary {
      background: #111;
      color: #fff;
    }
    .btn:hover {
      opacity: 0.85;
    }
    .footer {
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }
    .footer span {
      display: block;
      margin-top: 6px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>influ.market</h1>
    <div class="tagline">
      Hire verified influencers in Serbia.
    </div>

    <div class="buttons">
      <a class="btn primary" href="#">Apply as Influencer</a>
      <a class="btn" href="#">Join as Client</a>
    </div>

    <div class="footer">
      Marketplace launching soon
      <span>Company based in Miami, USA</span>
    </div>
  </div>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
