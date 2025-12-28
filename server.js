const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Shared template for simple pages
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
    }
    h2 {
      font-size: 28px;
      margin: 0 0 12px;
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
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      background: #111;
      color: #fff;
    }
    .btn:hover { opacity: .9; }
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
      Marketplace launching soon<br/>Company based in Miami, USA
    </footer>
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
      // you can keep this as brand/launch waitlist
      buttonLabel: "Join Launch Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/1ZOeHKWbkNz-WjMOHhwTbQRxkCFjhBLFUdaCKFCx66eI/viewform"
    })
  );
});

// APPLY — INFLUENCER (NEW FORM)
app.get("/apply/influencer", (req, res) => {
  res.send(
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

// APPLY — BRAND / CLIENT
app.get("/apply/client", (req, res) => {
  res.send(
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

// INFLUENCERS — test page (no JSON, just hard-coded)
app.get("/influencers", (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Influencers – influ.market</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin:0; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif; }
    .wrap { max-width:840px; margin:0 auto; padding:40px 20px 60px; }
    h1 { font-size:32px; margin-bottom:16px; }
    p { color:#555; margin-bottom:24px; }
    ul { list-style:none; padding:0; margin:0 0 24px; }
    li { padding:12px 0; border-bottom:1px solid #eee; }
    .name { font-weight:600; }
    .meta { font-size:14px; color:#666; }
    a { color:#0066ff; text-decoration:none; }
    a:hover { text-decoration:underline; }
    .btn {
      display:inline-block;
      margin-top:16px;
      padding:12px 26px;
      border-radius:999px;
      text-decoration:none;
      font-weight:600;
      font-size:15px;
      background:#111;
      color:#fff;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div style="font-weight:600;margin-bottom:8px;">influ.market</div>
    <h1>Discover influencers in Serbia</h1>
    <p>Early preview of the marketplace. This is a test list so we can confirm the page works.</p>

    <ul>
      <li>
        <div class="name">Test Influencer 1 – Instagram</div>
        <div class="meta">Fashion & Lifestyle · Belgrade, Serbia · 12,000 followers</div>
        <a href="https://instagram.com" target="_blank" rel="noopener">View profile</a>
      </li>
      <li>
        <div class="name">Test Influencer 2 – TikTok</div>
        <div class="meta">Beauty · Novi Sad, Serbia · 25,000 followers</div>
        <a href="https://tiktok.com" target="_blank" rel="noopener">View profile</a>
      </li>
    </ul>

    <a class="btn" href="/apply/client">→ Apply as Brand / Client</a><br/>
    <a href="/">← Back to homepage</a>
  </div>
</body>
</html>`;
  res.send(html);
});

// ❌ no custom 404 handler here on purpose

app.listen(PORT, () => {
  console.log("influ.market running on port " + PORT);
});
