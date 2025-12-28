const express = require("express");
const app = express();

// Hostinger assigns the PORT dynamically
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
    p { font-size: 18px; color: #555; margin-bottom: 28px; line-height: 1.5; }
    .btn-container { display: flex; flex-direction: column; gap: 12px; align-items: center; }
    .btn {
      display: inline-block;
      width: 100%;
      max-width: 320px;
      padding: 16px 30px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      background: #111;
      color: #fff;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.8; }
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
    <footer>Marketplace launching soon • Miami & Belgrade</footer>
  </div>
</body>
</html>`;
}

// 2. ROUTES (Order is critical to avoid 404 errors)

// BRAND-FIRST HOMEPAGE
app.get("/", (req, res) => {
  res.send(renderPage({
    title: "influ.market – Serbia",
    heading: "Hire verified micro-influencers in Serbia.",
    subheading: "Beauty, fitness, tech & lifestyle creators with real engagement. No agencies. No fake numbers.",
    buttons: [
      { label: "Apply as Brand", href: "/clients" },
      { label: "Are you an Influencer? Apply to Join", href: "/apply/influencer" }
    ]
  }));
});

// MARKETPLACE PREVIEW (Serves as proof for brands)
app.get("/influencers", (req, res) => {
  res.send(renderPage({
    title: "Discover Influencers – influ.market",
    heading: "Preview of creators on influ.market",
    subheading: "Early marketplace preview. Final listings and pricing will be adjusted per campaign.",
    buttons: [
      { label: "Apply as Brand / Client", href: "/clients" },
      { label: "← Back", href: "/" }
    ]
  }));
});

// NEW INFLUENCER APPLICATION ROUTE
app.get("/apply/influencer", (req, res) => {
  res.send(renderPage({
    title: "Apply as Influencer – influ.market",
    heading: "Apply to join influ.market",
    subheading: "influ.market is invite-only. We work with a limited number of vetted creators in Serbia.",
    buttons: [
      {
        label: "Apply for Consideration",
        href: "https://docs.google.com/forms/d/11VXifpfSJ2SObzcgSZS_WiVLtrMIaU-WsIlehflO4eU/viewform",
        external: true
      },
      { label: "← Back", href: "/" }
    ]
  }));
});

// BRAND APPLICATION ROUTE
app.get("/clients", (req, res) => {
  res.send(renderPage({
    title: "For Brands – influ.market",
    heading: "Apply as Brand",
    subheading: "Hire vetted influencers with real engagement.",
    buttons: [
      { 
        label: "Get Early Access", 
        href: "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform", 
        external: true 
      },
      { label: "← Back", href: "/" }
    ]
  }));
});

// 404 CATCH-ALL (Must be last)
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
