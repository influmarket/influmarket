const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------
// Small demo dataset – later this will come from your Google Sheets/Form
// ---------------------------------------------------------------------
const influencers = [
  {
    name: "Ana Jovanović",
    platform: "Instagram",
    niche: "Beauty & Lifestyle",
    city: "Belgrade",
    country: "Serbia",
    followers: 5200,
    priceFrom: 30,
    priceTo: 80,
    profileUrl: "https://instagram.com/example_ana"
  },
  {
    name: "Marko Petrović",
    platform: "TikTok",
    niche: "Comedy & Relatable skits",
    city: "Novi Sad",
    country: "Serbia",
    followers: 11800,
    priceFrom: 50,
    priceTo: 150,
    profileUrl: "https://www.tiktok.com/@example_marko"
  },
  {
    name: "Mila Stanković",
    platform: "Instagram",
    niche: "Fitness & Wellness",
    city: "Niš",
    country: "Serbia",
    followers: 27600,
    priceFrom: 80,
    priceTo: 250,
    profileUrl: "https://instagram.com/example_mila"
  },
  {
    name: "Luka Ilić",
    platform: "YouTube",
    niche: "Tech & Gadgets",
    city: "Belgrade",
    country: "Serbia",
    followers: 43000,
    priceFrom: 120,
    priceTo: 350,
    profileUrl: "https://youtube.com/@example_luka"
  }
];

// ------------------------------------------------------
// small helper to reuse the same layout (now with extraHtml)
// ------------------------------------------------------
function renderPage({
  title,
  heading,
  subheading,
  buttonLabel,
  buttonHref,
  extraHtml
}) {
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
    .link {
      display: inline-block;
      margin-top: 16px;
      font-size: 14px;
      color: #555;
      text-decoration: underline;
    }
    footer {
      margin-top: 32px;
      font-size: 14px;
      color: #777;
    }
    /* simple styles for the influencers list */
    .list {
      text-align: left;
      margin: 32px auto 0;
      max-width: 640px;
      padding: 0;
      list-style: none;
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
  </style>
</head>
<body>
  <div class="wrap">
    <h1>influ.market</h1>
    ${heading ? `<h2>${heading}</h2>` : ""}
    ${subheading ? `<p>${subheading}</p>` : ""}
    ${buttonLabel && buttonHref
      ? `<a class="btn" href="${buttonHref}" target="_blank" rel="noopener">${buttonLabel}</a>`
      : ""}
    ${extraHtml || ""}
    <footer>
      Marketplace launching soon<br />
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>`;
}

// ------------------------------------------------------
// HOME
// ------------------------------------------------------
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

// ------------------------------------------------------
// APPLY – INFLUENCER
// ------------------------------------------------------
app.get("/apply/influencer", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "Apply as Influencer – influ.market",
      heading: "Apply as Influencer",
      subheading:
        "Get early access to paid campaigns with verified brands in Serbia.",
      buttonLabel: "Join Influencer Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform"
    })
  );
});

// ------------------------------------------------------
// APPLY – CLIENT / BRAND
// ------------------------------------------------------
app.get("/apply/client", (req, res) => {
  res.status(200).send(
    renderPage({
      title: "Apply as Brand / Client – influ.market",
      heading: "Apply as Brand / Client",
      subheading:
        "Join the waitlist to access vetted influencers and campaign tools.",
      buttonLabel: "Join Client Waitlist",
      buttonHref:
        "https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform"
    })
  );
});

// ------------------------------------------------------
// INFLUENCER DIRECTORY (demo)
// ------------------------------------------------------
app.get("/influencers", (req, res) => {
  const listItems = influencers
    .map(
      (inf) => `
      <li class="card">
        <div class="card-title">${inf.name} – ${inf.platform}</div>
        <div class="card-meta">
          ${inf.niche} · ${inf.city}, ${inf.country}
        </div>
        <div class="card-meta">
          ${inf.followers.toLocaleString("en-US")} followers ·
          Range: €${inf.priceFrom}–€${inf.priceTo} per post
        </div>
        <div class="card-link">
          <a href="${inf.profileUrl}" target="_blank" rel="noopener">View profile</a>
        </div>
      </li>`
    )
    .join("");

  const extraHtml = `
    <ul class="list">
      ${listItems}
    </ul>
    <a class="link" href="/apply/client">→ Apply as Brand / Client</a>
  `;

  res.status(200).send(
    renderPage({
      title: "Influencer Directory – influ.market",
      heading: "Discover influencers in Serbia",
      subheading:
        "Early preview of the marketplace. Final listings and pricing will be adjusted per campaign.",
      buttonLabel: "",
      buttonHref: "",
      extraHtml
    })
  );
});

// ------------------------------------------------------
// THANK YOU
// ------------------------------------------------------
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

// ------------------------------------------------------
// SIMPLE 404
// ------------------------------------------------------
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
