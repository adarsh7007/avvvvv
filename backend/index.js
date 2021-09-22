
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')

const db = require('./database');
const User = db.User

const app = express();
app.use(express.json());
app.use(cors());

app.use('/',userRoute)
app.use('/get',productRoute)
//app.use('/',orderRoute)


db.sequelize.sync({ force: false })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // Admin password is 12345678
      return User.create({
        firstName: 'Admin',
        email: 'test1@test.com',
        isAdmin: true,
        password: '$2a$12$R0LyK7W8jIoQ4sNukd32S.2fp2EaGscak.GfRT68pNtXLErXHvVkC'
      })
    }
    return user;
  })
  .then((user) => {
    user.createCart();
  })
  .then(cart => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server starting on port 5000")
    });


  })