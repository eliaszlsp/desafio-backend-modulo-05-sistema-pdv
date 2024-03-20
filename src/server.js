// server.js
const dotenv = require("dotenv");
const express = require("express");
const router = require("./routers");
const { dbPromise } = require("./database");
const app = express();

dotenv.config();

app.use(express.json());

dbPromise
  .then(() => {
    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
  });
