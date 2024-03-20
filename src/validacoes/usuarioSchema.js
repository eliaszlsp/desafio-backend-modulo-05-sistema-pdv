const joi = require("joi");

const usuarioSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é Obrigatório",
    "string.empty": "O campo nome é Obrigatório",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é Obrigatório",
    "string.empty": "O campo email é Obrigatório",
    "string.email": "O campo email no está no formato valido",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é Obrigatório",
    "string.empty": "O campo senha  é Obrigatório",
  }),
});

module.exports = usuarioSchema;
