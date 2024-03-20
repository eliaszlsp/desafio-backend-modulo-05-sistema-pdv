
const dotenv = require("dotenv");
const knex = require("knex");

dotenv.config();

let url_conexao = process.env.URL_DB_Local;
if (process.env.NODE_ENV === "producao") {
  url_conexao = process.env.URL_DB_Prod;
}

const db = knex({ client: "pg", connection: url_conexao });

const dbPromise = new Promise((resolve, reject) => {
  db.raw("SELECT 1+1 as result").then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    resolve(db);
  }).catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
    reject(err);
  });
});

module.exports = {db, dbPromise};
