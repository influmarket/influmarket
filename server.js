const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// 1. IMPROVED LAYOUT ENGINE
// Added support for multiple buttons and better styling
function renderPage({ title, heading, subheading, buttons, footerText }) {
  const buttonHtml = buttons ? buttons.map(btn => 
    `<a class="btn" href="${btn.href}" ${btn.external ? 'target="_blank" rel="noopener"' : ''}>${btn.label}</a>`
  ).join('') : '';

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
      line-height: 1.5;
    }
    .wrap {
      text-align: center;
      max-width: 640px;
      padding: 40px 20px 60px;
    }
    h1 { font-size: 42px; margin-bottom: 12px; letter-spacing: -1px; }
    h2 { font-size: 28px; margin: 0 0 12px; letter-spacing: -0.5px; }
    p { font-size: 18px; color: #555; margin: 0 0 28px; }
    .btn-container { display: flex; flex-direction: column; gap: 12px; align-items: center; }
    .btn {
      display: inline-block;
      width: 100%;
      max-width: 300px;
      padding: 14px 30px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      background: #111;
      color: #fff;
      transition: transform 0.1s ease;
    }
    .btn:hover { opacity: 0.9; transform: translateY(-1px); }
    footer {
      margin-top: 48px;
      font-size: 13px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
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
    <footer>
      ${footerText || "Marketplace launching soon • Miami & Belgrade"}
    </footer>
  </div>
</body>
</html>`;
}

// 2. HOME PAGE (The "Gateway")
app.get("/", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "influ.market – Serbia's Influencer Marketplace",
      heading: "The creator economy in Serbia, verified.",
      subheading: "Connecting premium brands with the region's top creators.",
      buttons: [
        { label: "I am an Influencer", href: "/influencers" },
        { label: "I am a Brand", href: "/clients" }
      ]
    })
  );
});

// 3. INFLUENCERS PAGE
app.get("/influencers", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "For Creators – influ.market",
      heading: "Grow your creative business.",
      subheading: "Get access to exclusive campaigns with verified brands in Serbia.",
      buttons: [
        { 
          label: "Apply to Creator Waitlist", 
          href: "https://docs.google.com/forms/d/11VXifpfSJ2SObzcgSZS_WiVLtrMIaU-WsIlehflO4eU/viewform",
          external: true
        },
        { label: "← Back", href: "/" }
      ]
    })
  );
});

// 4. CLIENTS / BRANDS PAGE
app.get("/clients", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "For Brands – influ.market",
      heading: "Hire verified talent.",
      subheading: "Access a curated list of influencers with real engagement data.",
      buttons: [
        { 
          label: "Request Brand Access", 
          href: "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform",
          external: true
        },
        { label: "← Back", href: "/" }
      ]
    })
  );
});

// 5. 404 HANDLER
app.get("*", (req, res) => {
  res.status(404).send(
    renderPage({
      title: "404 – influ.market",
      heading: "Page not found",
      subheading: "The page you’re looking for doesn’t exist.",
      buttons: [{ label: "Return Home", href: "/" }]
    })
  );
});

app.listen(PORT, () => {
  console.log("influ.market is live on port " + PORT);
});
