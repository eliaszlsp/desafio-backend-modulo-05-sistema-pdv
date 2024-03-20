const express = require("express");
const { controllerOrderCreate, controllerListOrder } = require("../modules/Orders/controller/orderController");
const { validacaoToken } = require("../middlewares/auth");
const validarRequisicao = require("../middlewares/validarRequisicao");
const ordersSchema = require("../validacoes/ordersSchema");


const ordersRouter = express();
ordersRouter.use(validacaoToken);
ordersRouter.post("/", validarRequisicao(ordersSchema), controllerOrderCreate);
ordersRouter.get("/", controllerListOrder);


module.exports = ordersRouter;
