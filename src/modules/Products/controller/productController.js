const {
    createProduct,
    uptadeProduct,
    deleteProduct,
    productDetail,
    productList,
} = require("../repositories/productRepositories");
const { db } = require("../../../database/index");

const createProductController = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { originalname, buffer, mimetype } = req.file;

    const product = await createProduct(
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        originalname,
        buffer,
        mimetype
    );

    if (product.categoria) {
        return res.status(404).json({ message: product.categoria });
    }
    if (product) {
        return res.status(201).json(product[0]);
    }

    return res.status(500).json({ message: "erro interno do servidor" });
};

const updateProductController = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const file = req.file;

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message:
                "Para atualizar um produto, é necessário fornecer o ID do produto",
        });
    }

    const product = await uptadeProduct(
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        id,
        file
    );

    if (product.categoria) {
        return res.status(404).json({ message: product.categoria });
    }

    if (product.id) {
        return res.status(404).json(product.id);
    }

    if (product) {
        return res.status(204).json();
    }

    return res.status(500).json({ message: "Erro interno do servidor." });
};

const deleteProductController = async (req, res) => {
    const productId = req.params.id;

    try {
        const productsExists = await deleteProduct(productId);

        if (productsExists == "orderWithThisProduct") {
            return res.status(401).json({
                message:
                    "O produto já pertence a um pedido e não pode ser apagado.",
            });
        }

        if (productsExists) {
            return res.status(204).json();
        }

        return res
            .status(404)
            .json({ message: "ID do produto não encontrado." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

const productDetailController = async (req, res) => {
    const { id } = req.params;

    const product = await productDetail(id);

    if (!product) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.json(product);
};

const productListController = async (req, res) => {
    const { categoria_id } = req.query;

    const result = await productList(categoria_id);

    if (result.categoria) {
        return res.status(404).json(result.categoria);
    }

    if (result) {
        return res.status(200).json(result);
    }
    return res.status(500).json({ mensage: "Erro interno do servidor " });
};

module.exports = {
    createProductController,
    updateProductController,
    deleteProductController,
    productDetailController,
    productListController,
};
