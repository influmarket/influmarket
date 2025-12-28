const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Load influencers JSON
const influencers = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "influencers.json"))
);

// Shared page template
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
  .wrap { text-align: center; max-width: 640px; padding: 40px 20px 60px; }
  h1 { font-size: 42px; margin-bottom: 12px; }
  h2 { font-size: 28px; margin: 0 0 12px; }
  p { font-size: 18px; color: #555; margin: 0 0 28px; }
  .btn {
    display: inline-block;
    margin: 8px 0;
    padding: 14px 30px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    background: #111;
    color: #fff;
  }
  .btn:hover { opacity: .9; }
  footer { margin-top: 32px; font-size: 14px; color: #777; }
</style>
</head>
<body>
<div class="wrap">
  <h1>influ.market</h1>
  ${heading ? `<h2>${heading}</h2>` : ""}
  ${subheading ? `<p>${subheading}</p>` : ""}
  ${buttonLabel && buttonHref ? `<a class="btn" href="${buttonHref}" target="_blank" rel="noopener">${buttonLabel}</a>` : ""}
  <footer>Marketplace launching soon<br/>Company based in Miami, USA</footer>
</div>
</body>
</html>`;
}

// HOME
app.get("/", (req, res) => {
  res.send(
    renderPage({
      title: "influ.market – Hire verified influencers in Serbia",
      heading: "Launching soon — hire verified influencers in Serbia.",
      subheading: "",
      buttonLabel: "Join Launch Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform"
    })
  );
});

// APPLY — INFLUENCER
app.get("/apply/influencer", (req, res) => {
  res.send(
    renderPage({
      title: "Apply as Influencer – influ.market",
      heading: "Apply as Influencer",
      subheading: "Get early access to paid campaigns with verified brands in Serbia.",
      buttonLabel: "Join Influencer Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/11VXifpfSJ2SObzcgSZS_WiVLtrMIaU-WsIlehflO4eU/viewform"
    })
  );
});

// APPLY — BRAND / CLIENT
app.get("/apply/client", (req, res) => {
  res.send(
    renderPage({
      title: "Apply as Brand / Client – influ.market",
      heading: "Apply as Brand / Client",
      subheading: "Join the waitlist to access vetted influencers and campaign tools.",
      buttonLabel: "Join Client Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform"
    })
  );
});

// THANK YOU
app.get("/thank-you", (req, res) => {
  res.send(
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

// INFLUENCERS LIST PAGE
app.get("/influencers", (req, res) => {
  const cardsHtml = influencers
    .map(inf => `
      <li class="card">
        <div class="card-title">${inf.name} – ${inf.platform}</div>
        <div class="card-meta">${inf.niche} · ${inf.city}, ${inf.country}</div>
        <div class="card-meta">${inf.followers.toLocaleString()} followers · Range: €${inf.priceFrom}–€${inf.priceTo} per post</div>
        <div class="card-link"><a href="${inf.profileUrl}" target="_blank">View profile</a></div>
      </li>
    `)
    .join("");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Discover influencers in Serbia – influ.market</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif; }
  .wrap { max-width:840px; margin:0 auto; padding:40px 20px 60px; }
  .list { list-style:none; padding:0; }
  .card { padding:16px 0; border-bottom:1px solid #eee; }
  .card-title { font-weight:600; font-size:17px; }
  .card-meta { font-size:14px; color:#666; margin:4px 0; }
  .card-link a { color:#0066ff; text-decoration:none; }
</style>
<body>
<div class="wrap">
  <h1>Discover influencers in Serbia</h1>
  <ul class="list">${cardsHtml}</ul>
  <a class="btn" href="/apply/client">→ Apply as Brand / Client</a>
</div>
</body>
</html>`);
});

// 404 — MUST STAY LAST
app.get("*", (req, res) => {
  res.status(404).send(
    renderPage({
      title: "404 – Page not found",
      heading: "Page not found",
      subheading: "The page you’re looking for doesn’t exist (yet).",
      buttonLabel: "Back to homepage",
      buttonHref: "/"
    })
  );
});

app.listen(PORT, () =>
  console.log("influ.market running on port " + PORT)
);
