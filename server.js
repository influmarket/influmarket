const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// === Google Sheet config for influencers ===========================
const INFLU_SHEET_ID = "1MJAvgLtjatLoSPqMkky3tYCFhI-uUNZQvrJxzFW5i3U";
const INFLU_SHEET_GID = "1064161392";
const MIN_FOLLOWERS = 5000; // only show 5k+

// Which column is what in the sheet (0-based index)
const INFLU_COLS = {
  // 0 is usually Timestamp
  name: 1,
  platform: 2,
  niche: 3,
  location: 4,
  followers: 5,
  priceRange: 6,
  profileUrl: 7,
};

// ================================================================
// small helpers
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseFollowers(raw) {
  if (!raw) return null;
  const num = parseInt(String(raw).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(num) ? null : num;
}

// Layout helper
function renderPage({ title, heading, subheading, buttonLabel, buttonHref, bodyHtml }) {
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
      max-width: 860px;
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

    /* Influencer list styles */
    main {
      max-width: 860px;
      margin: 32px auto 0;
      text-align: left;
    }
    .intro {
      margin-bottom: 24px;
      font-size: 16px;
      color: #555;
    }
    .card {
      padding: 18px 0;
      border-bottom: 1px solid #eee;
    }
    .card:last-child {
      border-bottom: none;
    }
    .card h3 {
      margin: 0 0 4px;
      font-size: 18px;
    }
    .card p.meta {
      margin: 0 0 4px;
      font-size: 14px;
      color: #777;
    }
    .card p.extra {
      margin: 0 0 4px;
      font-size: 14px;
      color: #555;
    }
    .card a.profile-link {
      font-size: 14px;
    }
    .below-list {
      margin-top: 32px;
      font-size: 14px;
    }

    @media (max-width: 600px) {
      h1 { font-size: 34px; }
      h2 { font-size: 24px; }
      .wrap { padding: 32px 16px 48px; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>influ.market</h1>
    ${heading ? `<h2>${heading}</h2>` : ""}
    ${subheading ? `<p>${subheading}</p>` : ""}
    ${buttonLabel && buttonHref ? `<a class="btn" href="${buttonHref}" target="_blank" rel="noopener">${buttonLabel}</a>` : ""}
    ${bodyHtml || ""}
    <footer>
      Marketplace launching soon<br />
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>`;
}

// === Fetch influencers from Google Sheets =========================

async function fetchInfluencersFromSheet() {
  const url = `https://docs.google.com/spreadsheets/d/${INFLU_SHEET_ID}/gviz/tq?gid=${INFLU_SHEET_GID}&tqx=out:json`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Google Sheet HTTP ${resp.status}`);
  }
  const text = await resp.text();

  // Strip the JS wrapper around the JSON
  const jsonStr = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
  const data = JSON.parse(jsonStr);

  const cols = (data.table.cols || []).map(c => c.label);
  console.log("Influencer sheet columns:", cols);

  const rows = data.table.rows || [];

  function cell(row, idx) {
    const c = row.c[idx];
    return c ? c.v : "";
  }

  const influencers = rows
    .map(row => {
      const name = cell(row, INFLU_COLS.name);
      if (!name) return null;

      const followersRaw = cell(row, INFLU_COLS.followers);
      const followers = parseFollowers(followersRaw);

      return {
        name: name,
        platform: cell(row, INFLU_COLS.platform),
        niche: cell(row, INFLU_COLS.niche),
        location: cell(row, INFLU_COLS.location),
        followers,
        followersLabel: followersRaw || "",
        priceRange: cell(row, INFLU_COLS.priceRange),
        profileUrl: cell(row, INFLU_COLS.profileUrl),
      };
    })
    .filter(Boolean)
    .filter(inf => !inf.followers || inf.followers >= MIN_FOLLOWERS);

  // sort by followers desc (unknown followers go last)
  influencers.sort((a, b) => (b.followers || 0) - (a.followers || 0));

  return influencers;
}

// === ROUTES =======================================================

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
        "https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform"
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
        "https://docs.google.com/forms/d/e/1FAIpQLSdu4-BfogXhBgUhYIF1BlpXUpp9WPfa7nRe-KGdn2T-89annQ/viewform"
    })
  );
});

// DYNAMIC INFLUENCER LIST
app.get("/influencers", async (req, res) => {
  try {
    const influencers = await fetchInfluencersFromSheet();

    const cardsHtml =
      influencers.length === 0
        ? `<p class="intro">No influencers yet — be the first to apply!</p>`
        : influencers
            .map(inf => {
              const followersPart = inf.followersLabel
                ? `${escapeHtml(inf.followersLabel)} followers`
                : "";
              const rangePart = inf.priceRange
                ? `Range: ${escapeHtml(inf.priceRange)} per post`
                : "";
              const metaPieces = [followersPart, rangePart].filter(Boolean);
              const metaLine = metaPieces.join(" · ");

              return `
        <article class="card">
          <h3>${escapeHtml(inf.name)}${inf.platform ? " – " + escapeHtml(inf.platform) : ""}</h3>
          <p class="extra">
            ${inf.niche ? escapeHtml(inf.niche) : ""}${
                inf.location ? (inf.niche ? " · " : "") + escapeHtml(inf.location) : ""
              }
          </p>
          ${
            metaLine
              ? `<p class="meta">${metaLine}</p>`
              : ""
          }
          ${
            inf.profileUrl
              ? `<a class="profile-link link" href="${escapeHtml(
                  inf.profileUrl
                )}" target="_blank" rel="noopener">View profile</a>`
              : ""
          }
        </article>`;
            })
            .join("");

    const bodyHtml = `
      <main>
        <p class="intro">
          Early preview of the marketplace. Final listings and pricing will be adjusted per campaign.
        </p>
        ${cardsHtml}
        <div class="below-list">
          <a class="link" href="/apply/influencer">→ Apply as Influencer</a><br />
          <a class="link" href="/apply/client">→ Apply as Brand / Client</a>
        </div>
      </main>
    `;

    res.status(200).send(
      renderPage({
        title: "Discover influencers in Serbia – influ.market",
        heading: "Discover influencers in Serbia",
        subheading: "",
        bodyHtml
      })
    );
  } catch (err) {
    console.error("Error loading influencers from Sheet:", err);
    res.status(500).send(
      renderPage({
        title: "Influencers – temporarily unavailable – influ.market",
        heading: "Influencer list is temporarily unavailable",
        subheading: "Please try again in a few minutes.",
        buttonLabel: "Back to homepage",
        buttonHref: "/"
      })
    );
  }
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

// SIMPLE 404
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
