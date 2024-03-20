const joi = require("joi");

const clientSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é Obrigatório",
    "string.empty": "O campo nome é Obrigatório",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é Obrigatório",
    "string.empty": "O campo email é Obrigatório",
    "string.email": "O campo email no está no formato valido",
  }),
  cpf: joi.string().length(11).required().messages({
    "any.required": "O campo cpf é Obrigatório",
    "string.empty": "O campo cpf  é Obrigatório",
    "string.length": " O Cpf está invalido, numero de caracteres invalido ",
  }),
  cep: joi.string().optional().allow(""),
  rua: joi.string().optional().allow(""),
  numero: joi.string().optional().allow(""),
  bairro: joi.string().optional().allow(""),
  cidade: joi.string().optional().allow(""),
  estado: joi.string().optional().allow(""),
});

module.exports = clientSchema;
