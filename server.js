const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Thank You page route
app.get("/thank-you", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Thank you — influ.market</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      color: #111;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .box {
      text-align: center;
      max-width: 520px;
      padding: 40px 20px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 12px;
    }
    p {
      font-size: 18px;
      color: #555;
      margin-bottom: 24px;
    }
    a {
      display: inline-block;
      margin-top: 10px;
      padding: 10px 20px;
      border-radius: 6px;
      border: 1px solid #111;
      text-decoration: none;
      font-weight: 600;
      color: #111;
    }
    a:hover {
      opacity: .85;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>You're on the waitlist 🎉</h1>
    <p>Thank you for joining influ.market. We’ll email you when we launch.</p>
    <a href="/">Back to homepage</a>
  </div>
</body>
</html>
  `);
});

// Main landing page route (catch-all)
app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>influ.market</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Hire verified influencers in Serbia." />
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      color: #111;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .box { text-align: center; max-width: 520px; padding: 40px 20px; }
    h1 { font-size: 42px; margin-bottom: 12px; letter-spacing: -1px; }
    p { font-size: 20px; color: #555; margin-bottom: 32px; }
    a { display: inline-block; margin: 8px; padding: 14px 26px;
        border-radius: 6px; border: 1px solid #111; text-decoration: none;
        font-weight: 600; color: #111; }
    a.primary { background: #111; color: #fff; }
    a:hover { opacity: .85; }
    footer { margin-top: 32px; font-size: 14px; color: #777; }
  </style>
</head>
<body>
  <div class="box">
    <h1>influ.market</h1>
    <p>Hire verified influencers in Serbia.</p>

    <a href="https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform?usp=dialog"
       target="_blank"
       class="primary">
       Apply as Influencer
    </a>

    <a href="https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform?usp=dialog"
       target="_blank">
       Join as Client
    </a>

    <footer>
      Marketplace launching soon<br />
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log("influ.market running on port " + PORT);
});
