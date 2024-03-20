const express = require("express");
const {
  controllerClientCreate,
  controllerClientDetail,
  controllerClientList,
  controllerClientUpdate,
} = require("../modules/Clients/controllers/clientController");
const clientSchema = require("../validacoes/clientSchema");
const validarRequisicao = require("../middlewares/validarRequisicao");
const { validacaoToken } = require("../middlewares/auth");

const clientRouter = express();

clientRouter.use(validacaoToken);
clientRouter.post("/", validarRequisicao(clientSchema), controllerClientCreate);
clientRouter.put(
  "/:id",
  validarRequisicao(clientSchema),
  controllerClientUpdate
);
clientRouter.get("/:id", controllerClientDetail);
clientRouter.get("/", controllerClientList);

module.exports = clientRouter;
