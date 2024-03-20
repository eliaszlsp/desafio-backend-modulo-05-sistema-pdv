const validarRequisicao = (validationSchema) => async (req, res, next) => {
    try {
        await validationSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message,
        });
    }
};

module.exports = validarRequisicao;
