const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Load influencers data ----
const influencers = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "influencers.json"), "utf8")
);

// helper for all the simple pages
function renderPage({ title, heading, subheading, buttonLabel, buttonHref }) {
  return `<!DOCTYPE html>
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
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background: #ffffff;
      color: #111;
    }
    .wrap {
      text-align: center;
      max-width: 640px;
      padding: 40px 20px 60px;
    }
    h1 {
      font-size: 42px;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }
    h2 {
      font-size: 28px;
      margin: 0 0 12px;
      letter-spacing: -0.5px;
    }
    p {
      font-size: 18px;
      color: #555;
      margin: 0 0 28px;
    }
    .btn {
      display: inline-block;
      margin: 8px 0;
      padding: 14px 30px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      background: #111;
      color: #fff;
    }
    .btn:hover { opacity: 0.9; }
    footer {
      margin-top: 32px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>influ.market</h1>
    ${heading ? `<h2>${heading}</h2>` : ""}
    ${subheading ? `<p>${subheading}</p>` : ""}
    ${
      buttonLabel && buttonHref
        ? `<a class="btn" href="${buttonHref}" target="_blank" rel="noopener">${buttonLabel}</a>`
        : ""
    }
    <footer>
      Marketplace launching soon<br />
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>`;
}

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ---------- ROUTES ---------- */

// HOME
app.get("/", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "influ.market – Hire verified influencers in Serbia",
      heading: "Launching soon — hire verified influencers in Serbia.",
      subheading: "",
      buttonLabel: "Join Launch Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform"
    })
  );
});

// APPLY – INFLUENCER
app.get("/apply/influencer", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "Apply as Influencer – influ.market",
      heading: "Apply as Influencer",
      subheading:
        "Get early access to paid campaigns with verified brands in Serbia.",
      buttonLabel: "Join Influencer Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/11VXifpfSJ2SObzcgSZS_WiVLtrMIaU-WsIlehflO4eU/viewform"
    })
  );
});

// APPLY – CLIENT / BRAND
app.get("/apply/client", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "Apply as Brand / Client – influ.market",
      heading: "Apply as Brand / Client",
      subheading:
        "Join the waitlist to access vetted influencers and campaign tools.",
      buttonLabel: "Join Client Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform"
    })
  );
});

// INFLUENCERS LIST  (THIS is the page you want)
app.get("/influencers", (req, res) => {
  const cardsHtml = influencers
    .map((inf) => {
      return `
      <li class="card">
        <div class="card-title">${inf.name} – ${inf.platform}</div>
        <div class="card-meta">
          ${inf.niche ? inf.niche + " · " : ""}${inf.city ? inf.city + ", " : ""}${inf.country || ""}
        </div>
        <div class="card-meta">
          ${formatNumber(inf.followers)} followers · Range: €${inf.priceFrom}–€${inf.priceTo} per post
        </div>
        ${
          inf.profileUrl
            ? `<div class="card-link"><a href="${inf.profileUrl}" target="_blank" rel="noopener">View profile</a></div>`
            : ""
        }
      </li>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Discover influencers in Serbia – influ.market</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Discover vetted influencers in Serbia on influ.market." />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background: #ffffff;
      color: #111;
    }
    .wrap {
      max-width: 840px;
      margin: 0 auto;
      padding: 40px 20px 60px;
    }
    header h1 {
      font-size: 36px;
      margin: 0 0 8px;
    }
    header p {
      margin: 0 0 24px;
      font-size: 18px;
      color: #555;
    }
    .logo {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .list {
      list-style: none;
      padding: 0;
      margin: 24px 0 40px;
    }
    .card {
      padding: 16px 0;
      border-bottom: 1px solid #eee;
    }
    .card-title {
      font-weight: 600;
      font-size: 17px;
    }
    .card-meta {
      font-size: 14px;
      color: #666;
      margin: 4px 0;
    }
    .card-link a {
      font-size: 14px;
      color: #0066ff;
      text-decoration: none;
    }
    .card-link a:hover {
      text-decoration: underline;
    }
    .btn {
      display: inline-block;
      margin-top: 16px;
      padding: 12px 26px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      background: #111;
      color: #fff;
    }
    .btn:hover { opacity: 0.9; }
    footer {
      margin-top: 40px;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">influ.market</div>
    <header>
      <h1>Discover influencers in Serbia</h1>
      <p>
        Early preview of the marketplace. Final listings and pricing will be adjusted per campaign.
      </p>
    </header>

    <ul class="list">
      ${cardsHtml}
    </ul>

    <a class="btn" href="/apply/client">→ Apply as Brand / Client</a>

    <footer>
      Marketplace launching soon · Company based in Miami, USA
    </footer>
  </div>
</body>
</html>`;

  res.status(200).send(html);
});

// THANK YOU
app.get("/thank-you", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "Thank you – influ.market",
      heading: "You're on the list 🎉",
      subheading:
        "Thank you for joining the influ.market waitlist. Check your inbox for a confirmation email.",
      buttonLabel: "Back to homepage",
      buttonHref: "/"
    })
  );
});

// 404 (must be LAST!)
app.get("*", (req, res) => {
  res.status(404).send(
    renderPage({
      title: "404 – Page not found – influ.market",
      heading: "Page not found",
      subheading: "The page you’re looking for doesn’t exist (yet).",
      buttonLabel: "Back to homepage",
      buttonHref: "/"
    })
  );
});

app.listen(PORT, () => {
  console.log("influ.market running on port " + PORT);
});
