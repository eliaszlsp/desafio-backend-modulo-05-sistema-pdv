const { listCategory } = require("../repositories/category-repositories");

const listarCategorias = async (req, res) => {

    const categoria = await listCategory();

    if(categoria){
      return res.status(200).json(categoria);
    }

    return res.status(500).json({ mensage: "Erro interno do servidor" });
};

module.exports = listarCategorias;