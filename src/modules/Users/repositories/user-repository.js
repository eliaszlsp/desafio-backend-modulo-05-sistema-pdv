const { db } = require("../../../database");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const listUser = async (id) => {
  try {
    const users = await db("usuarios").where("id", id).first();
    const { senha: _, ...user } = users;

    return user;
  } catch (error) {
    return false;
  }
};

const createUser = async (nome, email, senha) => {
  try {
    const emailExist = await db("usuarios").where({ email }).first();

    if (emailExist) {
      return {
        emailExist: "email já existe ",
      };
    }

    const senhacript = await bcrypt.hash(senha, 10);

    const usuario = await db("usuarios")
      .insert({ nome, email, senha: senhacript })
      .returning("*");

    const { senha: _, ...user } = usuario[0];

    // return res.status(200).json(usuario[0]);
    return user;
  } catch (error) {
    return false;
  }
};

const updateUser = async (nome, email, senha, id, req) => {
  try {
    const verificaEmail = await db("usuarios").where({ email }).first();

    if (verificaEmail && verificaEmail.email !== req.usuario.email) {
      return {
        emailExist: "email já existe ",
      };
    }
    if (verificaEmail && verificaEmail.email !== req.usuario.email) {
      return {
        emailExist: "email já existe ",
      };
    }

    const senhacript = await bcrypt.hash(senha, 10);
    const usuarioatulizado = await db("usuarios")
      .where({ id })
      .update({ nome, email, senha: senhacript });

    return usuarioatulizado;
  } catch (error) {
    return false;
  }
};

const loginUsers = async (email, senha) => {
  const { SECREDJWT } = process.env;
  try {
    const usuario = await db("usuarios").where({ email }).first();

    if (!usuario) {
      return "senha e usuario";
    }

    const validacaoSenha = await bcrypt.compare(senha, usuario.senha);

    if (!validacaoSenha) {
      return "senha e usuario";
    }

    const token = jwt.sign({ id: usuario.id }, SECREDJWT, {
      expiresIn: "8h",
    });

    const { senha: _, ...dadosUsuario } = usuario;

    return { usuario: dadosUsuario, token };
  } catch (error) {
    return false;
  }
};

module.exports = {
  listUser,
  createUser,
  updateUser,
  loginUsers,
};
