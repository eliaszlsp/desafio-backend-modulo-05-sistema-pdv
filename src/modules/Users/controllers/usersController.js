const {
  createUser,
  updateUser,
  listUser,
  loginUsers,
} = require("../repositories/user-repository");

const controllerUserCreate = async (req, res) => {
  const { nome, email, senha } = req.body;

  const result = await createUser(nome, email, senha);

  if (result.emailExist) {
    return res.status(400).json({ mensage: result.emailExist });
  }

  if (result) {
    return res.status(201).json(result);
  }

  if (result === false) {
    return res.status(500).json({ mensage: "Erro interno do servidor" });
  }
};

const controllerUserUpdate = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  const result = await updateUser(nome, email, senha, id, req);
  if (result.emailExist) {
    return res.status(400).json({ mensage: result.emailExist });
  }

  if (result) {
    return res.status(204).json();
  }
  return res.status(500).json({ mensage: "Erro interno do servidor" });
};

const controllerUserList = async (req, res) => {
  const { id } = req.usuario;
  const result = await listUser(id);

  if (result) {
    return res.status(200).json(result);
  }
  return res.status(500).json({ mensage: "Erro interno do servidor" });
};

const controllerUserLogin = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos devem ser preenchidos." });
  }
  const result = await loginUsers(email, senha);
  if (result === "senha e usuario") {
    return res
      .status(401)
      .json({ mensagem: "Usuário e/ou senha inválido(s)." });
  }

  if (!result) {
    return res.status(500).json({ mensage: "Erro interno do servidor" });
  }

  return res.status(200).json(result);
};

module.exports = {
  controllerUserCreate,
  controllerUserList,
  controllerUserUpdate,
  controllerUserLogin,
};
