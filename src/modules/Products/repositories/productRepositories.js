const { db } = require("../../../database");
const { error } = require("../../../validacoes/productSchema");
const { uploudImagem, deleteImagem } = require("./uploudRepositories");

const createProduct = async (
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    originalname,
    buffer,
    mimetype
) => {
    try {
        const categoria = await db("categorias").where({ id: categoria_id });

        if (categoria.length < 1) {
            return {
                categoria: "o id da categoria_id não foi encontrado",
            };
        }

        const imagem = await uploudImagem(originalname, buffer, mimetype);

        const saveProduct = await db("produtos")
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: imagem.url,
            })
            .returning("*");

        return saveProduct;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const uptadeProduct = async (
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    id,
    file
) => {
    try {
        const verificaID = await db("produtos").where({ id });

        if (verificaID.length < 1) {
            return {
                id: "o id não foi encontrado",
            };
        }
        const categoria = await db("categorias").where({ id: categoria_id });

        if (categoria.length < 1) {
            return {
                categoria: "o id da categoria_id não foi encontrado",
            };
        }

        ////////////////////////////////////////////////////////////////////////////////////////
        const product = await db("produtos").where({ id });

        const path = product[0].produto_imagem.split("/");

        if (file) {
            await deleteImagem(path[3]);

            const { originalname, buffer, mimetype } = file;

            const imagem = await uploudImagem(originalname, buffer, mimetype);

            const saveProduct = await db("produtos").where({ id }).update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: imagem.url,
            });
            return saveProduct;
        }
        ///////////////////////////////////////////////////////////////////////////////
        const saveProduct = await db("produtos").where({ id }).update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        });

        if (saveProduct.length < 1) {
            return {
                id: "ID Invalido",
            };
        }

        return saveProduct;
    } catch (error) {}
    return false;
};

const deleteProduct = async (id) => {
    try {
        if (!id) {
            return false;
        }

        const verificaID = await db("produtos").where({ id });

        if (verificaID.length < 1) {
            return false;
        }

        const orderExistes = await await db("pedido_produtos")
            .where("produto_id", id)
            .first();

        if (orderExistes && orderExistes.id) return "orderWithThisProduct";

        const productExists = await db("produtos").where({ id });
        // console.log(productExists[0].produto_imagem);
        // return;
        const path = productExists[0].produto_imagem.split("/");

        if (productExists.length >= 1) {
            await db("produtos").where({ id }).del();
            await deleteImagem(path[3]);
            return productExists;
        }

        return false;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const productDetail = async (id) => {
    try {
        const produto = await db("produtos").where({ id }).first();

        return produto;
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar produto " });
    }
};

const productList = async (categoria_id) => {
    let products;
    try {
        if (categoria_id) {
            products = await db("produtos").where({ categoria_id });
        } else {
            products = await db("produtos");
        }

        if (products.length < 1) {
            return {
                categoria: "Não contém produto cadastrado",
            };
        }

        return products;
    } catch (error) {
        return false;
    }
};

module.exports = {
    createProduct,
    uptadeProduct,
    deleteProduct,
    productDetail,
    productList,
};
