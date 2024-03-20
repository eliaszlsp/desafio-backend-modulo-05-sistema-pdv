const { db } = require("../../../database");

const listCategory = async () => {
  try {
    const categoria = await db("categorias");
    return categoria;
  } catch (e) {
    return false;
  }
};

module.exports = {
  listCategory,
};
