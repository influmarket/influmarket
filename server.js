// server.js — single Express server for influ.market

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Simple template for all pages
function renderPage(title, subtitle) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>influ.market — ${title}</title>
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
    p  { font-size: 20px; color: #555; margin-bottom: 32px; }
    a  {
      display: inline-block;
      margin-top: 10px;
      padding: 14px 26px;
      border-radius: 6px;
      border: none;
      background: #111;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
    }
    footer { margin-top: 26px; font-size: 14px; color: #777; }
  </style>
</head>
<body>
  <div class="box">
    <h1>influ.market</h1>
    <p>${subtitle}</p>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform"
       target="_blank">
      Join Launch Waitlist
    </a>
    <footer>
      Marketplace launching soon<br />
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>`;
}

// ROUTES

// Home
app.get("/", (req, res) => {
  res.send(
    renderPage(
      "Home",
      "Launching soon — hire verified influencers in Serbia."
    )
  );
});

// Influencer apply
app.get("/apply/influencer", (req, res) => {
  res.send(
    renderPage(
      "Apply as Influencer",
      "Launching soon — hire verified influencers in Serbia."
    )
  );
});

// Client apply
app.get("/apply/client", (req, res) => {
  res.send(
    renderPage(
      "Apply as Client",
      "Launching soon — hire verified influencers in Serbia."
    )
  );
});

// Thank-you
app.get("/thank-you", (req, res) => {
  res.send(
    renderPage(
      "Thank you!",
      "You’re on the influ.market waitlist. We’ll email you before launch."
    )
  );
});

// Any other route → home
app.get("*", (req, res) => {
  res.redirect("/");
});

// START SERVER
app.listen(PORT, () => {
  console.log("influ.market running on port " + PORT);
});
