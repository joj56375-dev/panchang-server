const express = require("express");
const fetch = require("node-fetch");

const app = express();

const CLIENT_ID = "2df92283-a095-459c-af78-7d44c5ac4cd2";
const CLIENT_SECRET = "XjekBepcQkAwp2wVxNHYrCUokXmeNw8dolUwgsf8";

let accessToken = "";

async function getToken() {
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  });

  const data = await res.json();
  accessToken = data.access_token;
}

app.get("/panchang", async (req, res) => {
  try {
    if (!accessToken) {
      await getToken();
    }

    const today = new Date().toISOString();

    const response = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=28.0229,73.3119&datetime=${today}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Panchang API Running 🚀");
});

app.listen(3000, () => {
  console.log("Server started");
});
