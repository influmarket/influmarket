import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse form + JSON submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Shared Landing Page Content
const landing = (title) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>influ.market — ${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body{margin:0;background:#ffffff;font-family:-apple-system,Segoe UI,Roboto,Arial;
display:flex;align-items:center;justify-content:center;height:100vh;color:#111}
.box{text-align:center;max-width:520px;padding:40px}
h1{font-size:42px;margin-bottom:12px}
p{font-size:20px;color:#444;margin-bottom:32px}
a{display:inline-block;margin-top:10px;padding:14px 26px;
background:#111;color:#fff;text-decoration:none;border-radius:6px;font-weight:600}
footer{margin-top:26px;color:#777;font-size:14px}
</style>
</head>
<body>
<div class="box">
<h1>influ.market</h1>
<p>Launching soon — hire verified influencers in Serbia.</p>
<a href="https://docs.google.com/forms/d/e/1FAIpQLScQ3ktJwoEKiKiLA35LkrK2SdzrlSJyFweY9bTOXB0_8Y3cXA/viewform" target="_blank">
Join Launch Waitlist
</a>
<footer>Marketplace launching soon<br>Company based in Miami, USA</footer>
</div>
</body>
</html>
`;

// Routes
app.get("/", (req, res) => res.send(landing("Home")));
app.get("/apply/influencer", (req, res) => res.send(landing("Influencer Application")));
app.get("/apply/client", (req, res) => res.send(landing("Client Application")));

// Fallback
app.get("*", (req, res) => res.redirect("/"));

// Start
app.listen(PORT, () => console.log("Running on port", PORT));
