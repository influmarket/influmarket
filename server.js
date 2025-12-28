// server.js
// --------- Simple Express server for influ.market

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// If we later add real forms, this will parse POST bodies
app.use(express.urlencoded({ extended: true }));

// Re-use this Google Form for all waitlist buttons
const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform?usp=dialog";

// Small helper to keep the HTML consistent
function renderPage({ title, heading, subheading, buttonLabel }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Hire verified influencers in Serbia." />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background: #ffffff;
      color: #111;
    }
    .wrapper {
      text-align: center;
      padding: 40px 20px;
      max-width: 640px;
    }
    h1 {
      font-size: 42px;
      letter-spacing: -0.03em;
      margin: 0 0 8px;
    }
    h2 {
      font-size: 24px;
      margin: 0 0 24px;
      color: #444;
      font-weight: 400;
    }
    p {
      margin: 0 0 32px;
      font-size: 18px;
      color: #555;
    }
    a.button {
      display: inline-block;
      padding: 14px 32px;
      border-radius: 999px;
      border: none;
      background: #000;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
      cursor: pointer;
    }
    a.button:hover {
      opacity: 0.9;
    }
    footer {
      margin-top: 32px;
      font-size: 14px;
      color: #777;
    }
    .back-link {
      display: block;
      margin-top: 16px;
      font-size: 14px;
      color: #555;
      text-decoration: none;
    }
    .back-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <h1>influ.market</h1>
    <h2>${heading}</h2>
    <p>${subheading}</p>

    <a class="button" href="${WAITLIST_URL}" target="_blank" rel="noopener noreferrer">
      ${buttonLabel}
    </a>

    <a class="back-link" href="/">← Back to main page</a>

    <footer>
      Marketplace launching soon<br />
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>
`;
}

// ----------------- ROUTES -----------------

// Main landing page
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(
    renderPage({
      title: "influ.market – hire verified influencers in Serbia",
      heading: "Launching soon — hire verified influencers in Serbia.",
      subheading: "",
      buttonLabel: "Join Launch Waitlist",
    })
  );
});

// Influencer application (waitlist)
app.get("/apply/influencer", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(
    renderPage({
      title: "Influencer Waitlist – influ.market",
      heading: "Apply as Influencer",
      subheading: "Join the waitlist to get early access when the marketplace opens.",
      buttonLabel: "Join Influencer Waitlist",
    })
  );
});

// Client / Brand application (waitlist)
app.get("/apply/client", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(
    renderPage({
      title: "Client Waitlist – influ.market",
      heading: "Apply as Brand / Client",
      subheading: "Get early access to verified Serbian influencers.",
      buttonLabel: "Join Client Waitlist",
    })
  );
});

// Simple 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log("influ.market running on port " + PORT);
});
