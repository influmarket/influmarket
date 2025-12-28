const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// 1. REUSABLE LAYOUT
function renderPage({ title, heading, subheading, buttons }) {
  const buttonHtml = buttons ? buttons.map(btn => 
    `<a class="btn" href="${btn.href}" ${btn.external ? 'target="_blank" rel="noopener"' : ''}>${btn.label}</a>`
  ).join('') : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    .wrap { text-align: center; max-width: 640px; padding: 40px 20px; }
    h1 { font-size: 42px; margin-bottom: 12px; }
    h2 { font-size: 28px; margin-bottom: 12px; }
    p { font-size: 18px; color: #555; margin-bottom: 28px; }
    .btn-container { display: flex; flex-direction: column; gap: 12px; align-items: center; }
    .btn {
      display: inline-block;
      width: 100%;
      max-width: 300px;
      padding: 14px 30px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      background: #111;
      color: #fff;
    }
    footer { margin-top: 48px; font-size: 14px; color: #777; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>influ.market</h1>
    ${heading ? `<h2>${heading}</h2>` : ""}
    ${subheading ? `<p>${subheading}</p>` : ""}
    <div class="btn-container">
      ${buttonHtml}
    </div>
    <footer>Marketplace launching soon</footer>
  </div>
</body>
</html>`;
}

// 2. ROUTES (Order matters!)

// HOME
app.get("/", (req, res) => {
  res.send(renderPage({
    title: "influ.market – Serbia",
    heading: "The creator economy in Serbia, verified.",
    buttons: [
      { label: "I am an Influencer", href: "/influencers" },
      { label: "I am a Brand", href: "/clients" }
    ]
  }));
});

// INFLUENCERS PAGE
app.get("/influencers", (req, res) => {
  res.send(renderPage({
    title: "For Influencers – influ.market",
    heading: "Apply as Influencer",
    subheading: "Get early access to paid campaigns in Serbia.",
    buttons: [
      { label: "Join Waitlist", href: "https://docs.google.com/forms/d/11VXifpfSJ2SObzcgSZS_WiVLtrMIaU-WsIlehflO4eU/viewform", external: true },
      { label: "← Back", href: "/" }
    ]
  }));
});

// CLIENTS PAGE
app.get("/clients", (req, res) => {
  res.send(renderPage({
    title: "For Brands – influ.market",
    heading: "Apply as Brand",
    subheading: "Hire vetted influencers with real engagement.",
    buttons: [
      { label: "Get Early Access", href: "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform", external: true },
      { label: "← Back", href: "/" }
    ]
  }));
});

// 404 PAGE (Always keep this last)
app.get("*", (req, res) => {
  res.status(404).send(renderPage({
    title: "404 - Not Found",
    heading: "Page not found",
    buttons: [{ label: "Back Home", href: "/" }]
  }));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
