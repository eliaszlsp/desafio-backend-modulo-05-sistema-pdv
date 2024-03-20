const { db } = require("../../../database");

const createClient = async (
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado
) => {
    try {
        const emailExist = await db("clientes").where({ email }).first();

        if (emailExist) {
            return { emailExist: "email já existe" };
        }

        const cpfExist = await db("clientes").where({ cpf }).first();

        if (cpfExist) {
            return { cpfExist: " cpf já cadastrado" };
        }

        const client = await db("clientes")
            .insert({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado,
            })
            .returning("*");

        return client[0];
    } catch (error) {
        return false;
    }
};

const updateClient = async (
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
) => {
    try {
        const verificaid = await db("clientes").where({ id }).first();
        const verificaEmail = await db("clientes").where({ email }).first();
        const verificaCpf = await db("clientes").where({ cpf }).first();

        if (!verificaid) {
            return {
                idNotexist: "O Cliente não existe ",
            };
        }

        if (verificaEmail && verificaEmail.id !== Number(id)) {
            return {
                emailExist: "email já existe ",
            };
        }

        if (verificaCpf && verificaCpf.id !== Number(id)) {
            return {
                cpfExist: "cpf já existe ",
            };
        }

        const clientUpdate = await db("clientes").where({ id }).update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        });

        return clientUpdate;
    } catch (error) {
        return false;
    }
};

const detailClient = async (id) => {
    try {
        const clients = await db("clientes").where("id", id).first();
        const { senha: _, ...client } = clients;

        return client;
    } catch (error) {
        return false;
    }
};

const listClient = async () => {
    try {
        const clients = await db("clientes");

        return clients;
    } catch (error) {
        return false;
    }
};

module.exports = { createClient, updateClient, detailClient, listClient };
