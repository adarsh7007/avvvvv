const Sequelize = require('sequelize');

const sequelize = new Sequelize( {
    database: 'BookStore',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  
});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//MODEL
db.User = require('./models/user')(sequelize, Sequelize);
db.Product = require('./models/product')(sequelize, Sequelize);
db.Cart = require('./models/cart')(sequelize, Sequelize);
db.CartItem = require('./models/cart-item')(sequelize, Sequelize);
db.Order = require('./models/order')(sequelize, Sequelize);
db.OrderItem = require('./models/order-item')(sequelize, Sequelize);
db.Address = require('./models/address')(sequelize, Sequelize);
//RELATION
db.User.hasMany(db.Product);
db.User.hasMany(db.Address);
db.User.hasOne(db.Cart);
db.Cart.belongsTo(db.User, { constraints: true,});
db.Cart.belongsToMany(db.Product, { through: "cartItem" });
db.Product.belongsToMany(db.Cart, { through: "cartItem" });
db.Order.belongsTo(db.User);
db.User.hasMany(db.Order);
db.Order.belongsToMany(db.Product, { through: "orderItem" });
db.Address.belongsToMany(db.User, { through: "shipping" });

module.exports = db;
