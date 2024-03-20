const router = require("express").Router();
const routeCategory = require("./routeCategory");
const { usersRoute, loginRoute } = require("./routeUsers");
const productsRoute = require("./routeProduct");
const clientRouter = require("./routeClients");
const ordersRouter = require("./routeOrders");
const { validacaoToken } = require("../middlewares/auth");

router.use("/login", loginRoute);
router.use("/categoria", routeCategory);
// todas as rotas a partir daqui tem que ser validadas  com token
router.use("/usuario", usersRoute);
router.use("/produto", productsRoute);
router.use("/cliente", clientRouter);
router.use("/pedido", ordersRouter);

module.exports = router;
