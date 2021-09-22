const express = require('express')
const db = require('../database')
const Product = db.Product
const routes = express.Router()
const bcrypt = require('bcryptjs');

routes.post('/addProduct', (req, res, next) => {
    let { title, imageUrl, Price, Desc, category ,countInStock} = req.body;
    // console.log(req.body)
    if (!imageUrl) imageUrl = "https://www.warnersstellian.com/Content/images/product_image_not_available.png";
    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: Price,
        category: category,
        description: Desc,
        countInStock:countInStock
    })
        .then(result => {
            // console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    res.status(201).send(title);
})
routes.put('/product/:id', (req, res) => {
    let { id, title, imageUrl, Price, Desc, category ,countInStock} = req.body;
    Product.findOne({ where: { id: id }, paranoid: false })
      .then(Product => {
        if (Product) {
          return res.status(200).json({ success: true, msg: "User update successsfully" });
        }
        else
          res.status(500).json({ 'success': false });
      })
    })
routes.get('/product', (req, res) => {

    Product.findAll().then(product => res.send(product).json(product))


})

routes.get('/product/:id', (req, res) => {

    const id = req.params.id;

    Product.findByPk(id)

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

routes.get('/getElectronics', (req, res) => {
    Product.findAll({ where: { category: 'electronics' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
});

routes.get('/getBooks', (req, res) => {
    Product.findAll({ where: { category: 'books' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
});

routes.get('/getKids', (req, res) => {
    Product.findAll({ where: { category: 'kids' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
});

routes.get('/getApparels', (req, res) => {
    Product.findAll({ where: { category: 'Apparels' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
});

routes.get('/getHomeandfurniture', (req, res) => {
    Product.findAll({ where: { category: 'homeandfurniture' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
});

routes.get('/getFootwear', (req, res) => {
    Product.findAll({ where: { category: 'footwear' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
});

routes.delete('/deleteProd', (req, res) => {
    const { userId, prodId } = req.body;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.status(201).send({ result: result, status: "success" });
        })
        .catch(err => console.log(err));
});

module.exports = routes
