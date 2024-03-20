const Joi = require("joi");

const productSchema = Joi.object({
    descricao: Joi.string().required().min(1).messages({
        "any.required": "A descrição do produto é obrigatória.",
        "string.base": "A descrição deve ser um texto.",
        "string.empty": "A descrição é obrigatória .",
    }),
    quantidade_estoque: Joi.number().required().integer().positive().messages({
        "any.required": "A quantidade do produto é obrigatória.",
        "number.base": "A quantidade em estoque deve ser um número.",
        "number.integer": "A quantidade em estoque deve ser um número inteiro.",
        "number.positive":
            "A quantidade em estoque não pode ser um valor negativo ou nulo.",
    }),
    valor: Joi.number().min(1).required().integer().messages({
        "any.required": "O valor do produto é obrigatória.",
        "number.base": "O valor do produto deve ser um número.",
        "number.integer": "O valor do produto deve ser um número inteiro.",
        "number.min": "O valor não pode ser zero ou negativo .",
    }),
    categoria_id: Joi.number().integer().required().messages({
        "any.required": "O ID da categoria é obrigatório.",
        "number.base": "O ID da categoria deve ser um número.",
        "number.integer": "O ID da categoria deve ser um número inteiro.",
    }),
});

module.exports = productSchema;
