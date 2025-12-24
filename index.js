const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

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
    body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;color:#111}
    .box{text-align:center;max-width:520px;padding:40px 20px}
    h1{font-size:42px;margin:0 0 12px}
    p{font-size:20px;color:#555;margin:0 0 32px}
    a{display:inline-block;margin:8px;padding:14px 26px;border-radius:6px;border:1px solid #111;
      text-decoration:none;font-weight:600;color:#111}
    a.primary{background:#111;color:#fff}
    footer{margin-top:32px;font-size:14px;color:#777}
  </style>
</head>
<body>
  <div class="box">
    <h1>influ.market</h1>
    <p>Hire verified influencers in Serbia.</p>

    <a class="primary" href="#">Apply as Influencer</a>
    <a href="#">Join as Client</a>

    <footer>
      Marketplace launching soon<br/>
      Company based in Miami, USA
    </footer>
  </div>
</body>
</html>
  `);
});

app.listen(PORT, () => console.log("Running on " + PORT));
