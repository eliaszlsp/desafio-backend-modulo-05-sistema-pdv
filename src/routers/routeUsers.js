const express = require("express");

const {
  controllerUserCreate,
  controllerUserList,
  controllerUserUpdate,
  controllerUserLogin,
} = require("../modules/Users/controllers/usersController");
const validarRequisicao = require("../middlewares/validarRequisicao");
const usuarioSchema = require("../validacoes/usuarioSchema");
const { validacaoToken } = require("../middlewares/auth");

const usersRoute = express();
const loginRoute = express();

usersRoute.post("/", validarRequisicao(usuarioSchema), controllerUserCreate);

usersRoute.use(validacaoToken);
loginRoute.post("/", controllerUserLogin);
usersRoute.get("/", controllerUserList);
usersRoute.put("/", validarRequisicao(usuarioSchema), controllerUserUpdate);

module.exports = { usersRoute, loginRoute };
