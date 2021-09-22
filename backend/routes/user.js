const express = require('express');
const db = require('../database')
const User = db.User
const Product = db.Product
const Address = db.Address
const routes = express.Router()
const bcrypt = require('bcryptjs');
const uuid = require("uuid/v4");
const user = require('../models/user');


routes.get('/address/:id', (req, res) => {

  const userId = req.params.id;

  Address.findByPk(userId)

      .then(data => {
          res.status(200).send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving Tutorial with id=" + id
          });
      });

  // const id = req.query.id;
  // // console.log(id, typeof id);
  // User.findByPk(id)
  //   .then(user => {
  //     res.send(user);
  //   })
  //   .catch(err => console.log(err));
});



routes.post('/auth/signup', (req, res, next) => {
  console.log('hit post')

  const { email, name, password, contact } = req.body;
  console.log(name, password);
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      User.create({
        name: name,
        email: email,
        password: hashedPw,
        isAdmin: false,
        contact: contact

      })
        .then(result => {
          // console.log(result)
          result.createCart();
          res.status(201).json({ message: 'User created!', userId: result.id });
        })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});
routes.put('/profile/:id', (req, res) => {
  const { id, name, email, contact } = req.body;
  User.findOne({ where: { id: id }, paranoid: false })
    .then(user => {
      if (user) {
        return res.status(200).json({ success: true, msg: "User update successsfully" });
      }
      else
        res.status(500).json({ 'success': false });
    })

})
routes.get('/logout', function (req, res) {
  // clear the remember me cookie when logging out
  res.clearCookie('remember_me');
  req.logout();
  res.redirect('/');
});
routes.post('/auth/login', (req, res, next) => {
  console.log("In login");
  const email = req.body.email;
  const password = req.body.password;
  let userLoggedIn;
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      userLoggedIn = user;
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        token: 'token',
        userId: userLoggedIn.id,
        isAdmin: userLoggedIn.isAdmin,
        email: userLoggedIn.email
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});
routes.post('/address', (req, res) => {
  const { userId, name, contact, city, pincode } = req.body;
  let userLoggedIn
  Address.create({
userId:userId,
    name: name,
    contact: contact,
    city: city,
    pincode: pincode
 })
     .then(result => {
         // console.log(result);
     })
     .catch(err => {
         console.log(err);
     })
 res.status(201).json('set');

});

routes.get('/getCartProducts', (req, res) => {
  const id = req.query.id;

  // console.log(id, typeof id);
  User.findByPk(id)
    .then(user => {
      return user.getCart()
    })
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.send(products)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
routes.post('/place-order', (req, res) => {
  const { userId } = req.body;
  let fetchedCart;
  let currentUser;
  User.findByPk(userId)
    .then(user => {
      currentUser = user;
      return user.getCart()
    })
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return currentUser
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
});
routes.get('/getProfile/:id', async (req, res) => {
  // const id = req.query.id
  // const user = await User.findByPk(id);
  // if (!user) throw 'User not found';
  // return user;
  const id = req.params.id;

  User.findByPk(id)

    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });

  // const id = req.query.id;
  // // console.log(id, typeof id);
  // User.findByPk(id)
  //   .then(user => {
  //     res.send(user);
  //   })
  //   .catch(err => console.log(err));
});


routes.post('/getOrders', (req, res) => {
  const id = req.query.id;
  // console.log(id, typeof id);
  User.findByPk(id)
    .then(user => {
      return user.getOrders({ include: ['products'] });
    })
    .then(orders => {
      // console.log(orders);
      res.send(orders);
    })
    .catch(err => console.log(err));
});


routes.delete('/deleteUser', (req, res) => {
  const { userId } = req.body;
  User.findByPk(userId)
    .then(user => {
      const result = user.destroy();
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
});


routes.delete('/deleteFromCart', (req, res) => {
  const { prodId, userId } = req.body;
  User.findByPk(userId)
    .then(user => {
      return user.getCart()
    })
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
});


routes.get('/addtoCart', (req, res) => {
  const { prodId, userId } = req.body;
  let fetchedCart;
  let newQuantity = 1;
  User.findByPk(userId)
    .then(user => {
      return user.getCart()
    })
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(201).send("Updated");
    })
    .catch(err => console.log(err));
});


module.exports = routes
