const express = require("express");
const { validacaoToken } = require("../middlewares/auth");
const validarRequisicao = require("../middlewares/validarRequisicao");
const productSchema = require("../validacoes/productSchema");
const {
    createProductController,
    updateProductController,
    deleteProductController,
    productDetailController,
    productListController,
} = require("../modules/Products/controller/productController");
const multer = require("../middlewares/multer");

const productsRoute = express();

productsRoute.use(validacaoToken);

productsRoute.post(
    "/",
    multer.single("produto_imagem"),
    validarRequisicao(productSchema),

    createProductController
);
productsRoute.put(
    "/:id",
    multer.single("produto_imagem"),
    validarRequisicao(productSchema),
    updateProductController
);

productsRoute.delete("/:id", deleteProductController);

productsRoute.get("/:id", productDetailController);
productsRoute.get("/", productListController);

module.exports = productsRoute;
