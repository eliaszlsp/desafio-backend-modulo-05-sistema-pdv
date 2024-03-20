const { db } = require("../../../database");
const sendMail = require("../../../utils/sendEmail");

const orderCreate = async (pedido_produtos, cliente_id, observacao) => {
    try {
        const verifyClientId = await db("clientes")
            .where({ id: cliente_id })
            .first();

        if (!verifyClientId) {
            return { error: "cliente não existe" };
        }

        const loopOrdersProducts = (property) => {
            const result = [];
            pedido_produtos.forEach((element) => {
                return result.push(element[property]);
            });

            return result;
        };

        const productsIds = loopOrdersProducts("produto_id");

        const verifyproductsId = await db("produtos").whereIn(
            "id",
            productsIds
        );

        if (productsIds.length !== verifyproductsId.length) {
            return { error: " Um ou mais IDs de produtos são inválidos." };
        }

        const dataBaseQuantitiesProducts =
            loopOrdersProducts("quantidade_produto");

        const verifyStock = verifyproductsId
            .filter((stock, index) => {
                return (
                    stock.quantidade_estoque < dataBaseQuantitiesProducts[index]
                );
            })
            .map((stock) => stock.id);

        if (verifyStock.length > 0) {
            return {
                error: `produto(s) com o id(s)  ${verifyStock.join(
                    ","
                )} não tem estoque suficiente `,
            };
        }
        const priceLoop = verifyproductsId.map((stock) => {
            return stock.valor;
        });

        const totalValue = priceLoop.reduce((acc, current) => {
            return acc + current;
        }, 0);

        const addOrders = await db("pedidos")
            .insert({
                cliente_id,
                observacao,
                valor_total: totalValue,
            })
            .returning("*");

        pedido_produtos.forEach(async (value, index) => {
            const addOrdersProduct = await db("pedido_produtos").insert({
                pedido_id: addOrders[0].id,
                produto_id: value.produto_id,
                quantidade_produto: value.quantidade_produto,
                valor_produto: priceLoop[index],
            });
            const decreaseStockProduct = await db("produtos")
                .where({ id: value.produto_id })
                .update({
                    quantidade_estoque:
                        verifyproductsId[index].quantidade_estoque -
                        value.quantidade_produto,
                });
        });

        sendMail({ to: verifyClientId.email, name: verifyClientId.nome });

        return { success: { cliente_id, observacao, pedido_produtos } };
    } catch (error) {
        return false;
    }
};

const listOrder = async (cliente_id) => {
    try {
        if (cliente_id) {
            let cliente = await db("clientes")
                .where("id", "=", cliente_id)
                .first();

            if (!cliente) {
                return {
                    error: "Não existe cliente para o ID informado!",
                };
            }
        }

        let pedidos = [];

        if (cliente_id) {
            pedidos = await db("pedidos").where("cliente_id", "=", cliente_id);
        } else {
            pedidos = await db("pedidos");
        }

        let pedidosCompletos = [];

        for (const pedido of pedidos) {
            let pedidoProdutos = await db("pedido_produtos").where(
                "pedido_id",
                "=",
                pedido.id
            );

            pedidosCompletos.push({ pedido, pedidoProdutos });
        }

        if (pedidosCompletos.length === 0) {
            return {
                error: "Não existem pedidos!",
            };
        }

        return {
            success: pedidosCompletos,
        };
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    orderCreate,
    listOrder,
};
