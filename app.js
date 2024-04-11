const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
//const cartRouter = require('./routes/carts');
//const likeRouter = require('./routes/likes');
//const orderRouter = require('./routes/orders');

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/category', categoryRouter);
//app.use('/carts', cartRouter);
//app.use('/likes', likeRouter);
//app.use('/orders', orderRouter);

//[2기] 박소현