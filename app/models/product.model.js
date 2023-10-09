module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.ENUM,
      values: ["clothes", "bag", "belt", "hat", "pants", "shoes"],
    },
    price: {
      type: Sequelize.DECIMAL(18, 2),
      // precision: 2,
      // scale: 18,
    },
    image: {
      type: Sequelize.STRING,
    },
    // price_discount: {
    //   type: Sequelize.FLOAT
    // },
    // rating: {
    //   type: Sequelize.INTEGER
    // },
  });

  return Product;
};
