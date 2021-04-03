const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const SEC_KEY = "Bearer FLWSECK_TEST-SANDBOXDEMOKEY-X";

app.get("/banks", async (req, res) => {
  const country = "NG";
  await axios
    .get(`https://api.flutterwave.com/v3/banks/${country}`, {
      headers: { Authorization: `${SEC_KEY}` },
    })
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

app.get("/transactions", async (req, res) => {
  await axios
    .get("https://api.flutterwave.com/v3/transactions", {
      headers: { Authorization: `${SEC_KEY}` },
    })
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

app.post("/verify_account", async (req, res) => {
  const { account_number, account_bank } = req.body;
  console.log(account_number, account_bank);
  await axios
    .post(
      `https://api.flutterwave.com/v3/accounts/resolve`,
      {
        account_number,
        account_bank,
      },
      {
        headers: {
          Authorization: `${SEC_KEY}`,
        },
      }
    )
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

app.post("/make_transfer", async (req, res) => {
  const { account_number, account_bank, amount } = req.body;
  await axios
    .post(
      `https://api.flutterwave.com/v3/transfers`,
      {
        account_number,
        account_bank,
        amount,
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `${SEC_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = 3001;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// ========================================================================