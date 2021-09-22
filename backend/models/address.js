module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define('shipping', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },


    name: {
      type: Sequelize.STRING,
    },
    contact: Sequelize.STRING,
    city: {
      type: Sequelize.STRING,
    },
  
    pincode: {
      type: Sequelize.INTEGER,

  userId: {
        type: Sequelize.INTEGER
      }

      // landmark: Sequelize.STRING,

    },

  });
  return Address;
}
