const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

// To read form data (POST)
app.use(express.urlencoded({ extended: true }));

// Helper: save applications to a simple text file (JSON per line)
function saveApplication(type, data) {
  const record = {
    type,                     // "influencer" or "brand"
    ...data,
    createdAt: new Date().toISOString(),
  };

  fs.appendFile("applications.jsonl", JSON.stringify(record) + "\n", (err) => {
    if (err) {
      console.error("Error saving application:", err);
    }
  });
}

/* =========================
   1. INFLUENCER APPLY PAGES
   ========================= */

// Show influencer application form
app.get("/apply/influencer", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Apply as Influencer — influ.market</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #050712;
      color: #f5f5ff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .box {
      width: 100%;
      max-width: 520px;
      padding: 32px 24px;
      background: rgba(7, 10, 25, 0.96);
      border-radius: 16px;
      box-shadow: 0 18px 45px rgba(0,0,0,0.5);
      border: 1px solid rgba(88, 126, 255, 0.4);
    }
    h1 {
      font-size: 28px;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #b3b7d4;
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 14px;
      margin: 12px 0 4px;
      color: #dfe2ff;
    }
    input, textarea, select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #2b3050;
      background: #0b0f2a;
      color: #f5f5ff;
      font-size: 14px;
      box-sizing: border-box;
    }
    textarea { min-height: 80px; resize: vertical; }
    button {
      margin-top: 18px;
      width: 100%;
      padding: 12px 16px;
      border-radius: 999px;
      border: none;
      font-weight: 600;
      font-size: 15px;
      background: linear-gradient(135deg, #3b82f6, #a855f7);
      color: #fff;
      cursor: pointer;
    }
    button:hover { opacity: 0.92; }
    a.back {
      display: inline-block;
      margin-top: 10px;
      font-size: 13px;
      color: #9ca3ff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Apply as Influencer</h1>
    <p>Join the influ.market creator network in Serbia. We’ll review your profile and contact you with next steps.</p>
    <form method="POST" action="/apply/influencer">
      <label for="name">Name</label>
      <input id="name" name="name" required />

      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label for="instagram">Instagram / TikTok handle</label>
      <input id="instagram" name="instagram" placeholder="@username" />

      <label for="followers">Approx. follower count</label>
      <input id="followers" name="followers" placeholder="e.g. 5,000" />

      <label for="niche">Niche / category</label>
      <input id="niche" name="niche" placeholder="Beauty, fashion, gaming, etc." />

      <label for="city">City / region</label>
      <input id="city" name="city" placeholder="Belgrade, Novi Sad, Niš…" />

      <label for="notes">Anything else we should know?</label>
      <textarea id="notes" name="notes" placeholder="Links, audiences, brands you worked with…"></textarea>

      <button type="submit">Submit application</button>
    </form>
    <a href="/" class="back">← Back to homepage</a>
  </div>
</body>
</html>
  `);
});

// Handle influencer application submit
app.post("/apply/influencer", (req, res) => {
  saveApplication("influencer", req.body);
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
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #050712;
      color: #f5f5ff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .box {
      text-align: center;
      max-width: 480px;
      padding: 32px 24px;
      background: rgba(7, 10, 25, 0.96);
      border-radius: 16px;
      box-shadow: 0 18px 45px rgba(0,0,0,0.5);
      border: 1px solid rgba(88, 126, 255, 0.4);
    }
    h1 { font-size: 26px; margin-bottom: 10px; }
    p { font-size: 15px; color: #c5cae9; margin-bottom: 18px; }
    a {
      display: inline-block;
      margin-top: 8px;
      font-size: 14px;
      color: #9ca3ff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Thank you 🎉</h1>
    <p>Your influencer application has been received.<br/>We’ll review it and get back to you by email.</p>
    <a href="/">← Back to homepage</a>
  </div>
</body>
</html>
  `);
});

/* =====================
   2. BRAND APPLY PAGES
   ===================== */

app.get("/apply/brand", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Join as Brand — influ.market</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #050712;
      color: #f5f5ff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .box {
      width: 100%;
      max-width: 520px;
      padding: 32px 24px;
      background: rgba(7, 10, 25, 0.96);
      border-radius: 16px;
      box-shadow: 0 18px 45px rgba(0,0,0,0.5);
      border: 1px solid rgba(88, 126, 255, 0.4);
    }
    h1 {
      font-size: 28px;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #b3b7d4;
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 14px;
      margin: 12px 0 4px;
      color: #dfe2ff;
    }
    input, textarea {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #2b3050;
      background: #0b0f2a;
      color: #f5f5ff;
      font-size: 14px;
      box-sizing: border-box;
    }
    textarea { min-height: 80px; resize: vertical; }
    button {
      margin-top: 18px;
      width: 100%;
      padding: 12px 16px;
      border-radius: 999px;
      border: none;
      font-weight: 600;
      font-size: 15px;
      background: linear-gradient(135deg, #3b82f6, #a855f7);
      color: #fff;
      cursor: pointer;
    }
    button:hover { opacity: 0.92; }
    a.back {
      display: inline-block;
      margin-top: 10px;
      font-size: 13px;
      color: #9ca3ff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Join as Brand</h1>
    <p>Tell us about your brand and what kind of influencers you’re looking for. We’ll match you inside influ.market.</p>
    <form method="POST" action="/apply/brand">
      <label for="brandName">Brand / company name</label>
      <input id="brandName" name="brandName" required />

      <label for="contactName">Your name</label>
      <input id="contactName" name="contactName" required />

      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label for="website">Website / Instagram</label>
      <input id="website" name="website" placeholder="https:// or @handle" />

      <label for="budget">Approx. budget (EUR)</label>
      <input id="budget" name="budget" placeholder="e.g. 500–2000" />

      <label for="lookingFor">What kind of influencers are you looking for?</label>
      <textarea id="lookingFor" name="lookingFor" placeholder="Niche, platforms, audience country, etc."></textarea>

      <button type="submit">Submit brand request</button>
    </form>
    <a href="/" class="back">← Back to homepage</a>
  </div>
</body>
</html>
  `);
});

app.post("/apply/brand", (req, res) => {
  saveApplication("brand", req.body);
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
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #050712;
      color: #f5f5ff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .box {
      text-align: center;
      max-width: 480px;
      padding: 32px 24px;
      background: rgba(7, 10, 25, 0.96);
      border-radius: 16px;
      box-shadow: 0 18px 45px rgba(0,0,0,0.5);
      border: 1px solid rgba(88, 126, 255, 0.4);
    }
    h1 { font-size: 26px; margin-bottom: 10px; }
    p { font-size: 15px; color: #c5cae9; margin-bottom: 18px; }
    a {
      display: inline-block;
      margin-top: 8px;
      font-size: 14px;
      color: #9ca3ff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Thank you 🎉</h1>
    <p>Your brand request has been received.<br/>We’ll contact you with matching options.</p>
    <a href="/">← Back to homepage</a>
  </div>
</body>
</html>
  `);
});

/* ================
   3. LANDING PAGE
   ================ */

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

    <!-- Existing waitlist buttons (Google Form) -->
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

    <!-- Internal links to new app pages (for you to test) -->
    <div style="margin-top:16px; font-size:12px; color:#aaa;">
      <div>Internal test links:</div>
      <a href="/apply/influencer">Influencer apply page</a> ·
      <a href="/apply/brand">Brand apply page</a>
    </div>
  </div>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log("influ.market running on port " + PORT);
});
