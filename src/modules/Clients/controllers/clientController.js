const {
    createClient,
    updateClient,
    detailClient,
    listClient,
} = require("../repositories/client-repository");

const controllerClientCreate = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
        req.body;

    const result = await createClient(
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    );

    if (result.emailExist) {
        return res.status(400).json({ mensage: result.emailExist });
    }

    if (result.cpfExist) {
        return res.status(400).json({ mensage: result.cpfExist });
    }

    if (result) {
        return res.status(201).json(result);
    }

    if (result === false) {
        return res.status(500).json({ mensage: " Erro interno do servidor" });
    }
};

const controllerClientUpdate = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
        req.body;
    const { id } = req.params;

    const result = await updateClient(
        nome,
        email,
        cpf,
        id,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    );

    if (result.idNotexist) {
        return res.status(400).json({ mensage: result.idNotexist });
    }

    if (result.emailExist) {
        return res.status(400).json({ mensage: result.emailExist });
    }
    if (result.cpfExist) {
        return res.status(400).json({ mensage: result.cpfExist });
    }

    if (result) {
        return res.status(204).json();
    }

    if (result === false) {
        return res.status(500).json({ mensage: " Erro interno do servidor" });
    }
};

const controllerClientDetail = async (req, res) => {
    const { id } = req.params;

    const result = await detailClient(id);

    if (result) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ mensage: "Cliente não existe " });
};

const controllerClientList = async (req, res) => {
    const result = await listClient();

    if (result) {
        return res.status(200).json(result);
    }
    return res.status(500).json({ mensage: "Erro interno do servidor " });
};

module.exports = {
    controllerClientCreate,
    controllerClientUpdate,
    controllerClientDetail,
    controllerClientList,
};
