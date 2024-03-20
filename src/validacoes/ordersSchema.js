const Joi = require("joi");

const ordersSchema = Joi.object({
  cliente_id: Joi.number().required().messages({
    "any.required": "O campo cliente_id é obrigatório.",
    "number.base": "O cliente_id deve ser um número.",
  }),
  observacao: Joi.string().allow("").optional().messages({
    "string.base": "A observação deve ser um texto.",
  }),
  pedido_produtos: Joi.array()
    .items(
      Joi.object({
        produto_id: Joi.number().required().messages({
          "any.required": "O campo produto_id é obrigatório.",
          "number.base": "O produto_id deve ser um número.",
        }),
        quantidade_produto: Joi.number().required().messages({
          "any.required": "O campo quantidade_produto é obrigatório.",
          "number.base": "A quantidade_produto deve ser um número.",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "A lista de pedido_produtos não pode estar vazia.",
    }),
});

module.exports = ordersSchema;
