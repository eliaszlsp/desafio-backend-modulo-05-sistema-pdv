const express = require("express");

const listarCategorias = require("../modules/Category/controller/categoryController");

const listCategories = express.Router();

listCategories.get("/", listarCategorias);

module.exports = listCategories;
