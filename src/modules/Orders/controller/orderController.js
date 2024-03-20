const { db } = require("../../../database");
const { orderCreate, listOrder } = require("../repositories/orderRepositories");

const controllerOrderCreate = async (req, res) => {
    const { pedido_produtos, cliente_id, observacao } = req.body;

    try {
        const result = await orderCreate(
            pedido_produtos,
            cliente_id,
            observacao
        );

        if (result.error) {
            return res.status(404).json(result.error);
        }

        if (result.success) {
            return res.status(200).json(result.success);
        }

        return res.status(500).json("erro interno do servidor");
    } catch (error) {
        console.log(error);
    }
};

const controllerListOrder = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        const result = await listOrder(cliente_id);

        if (result.error) {
            return res.status(400).json(result.error);
        }

        if (result.success) {
            return res.status(200).json(result.success);
        }

        return res.status(500).json("Erro interno do servidor");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    controllerOrderCreate,
    controllerListOrder,
};
