const jwt = require("jsonwebtoken");

const { db } = require("../database/index");

const validacaoToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const { SECREDJWT } = process.env;

  if (!authorization) {
    return res.status(401).json({
      menssagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, SECREDJWT);

    const queryUser = await db("usuarios").select("*").where("id", id).first();

    /*  const { rowCount, rows } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    ); */

    if (!queryUser) {
      return res.status(401).json({ menssagem: "Não autorizado " });
    }

    const { senha: _, ...usuario } = queryUser;

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ menssagem: "Não autorizado " });
  }
};

module.exports = {
  validacaoToken,
};
