//[2기]_박소현
const conn = require('./../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const addToCart = (req, res) => {
  const book_id = +req.body.book_id;
  const quantity = +req.body.quantity;
  const user_id = +req.body.user_id;

  let sql = 'INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)';
  let values = [book_id, quantity, user_id];
  conn.query(sql, values, 
    (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(StatusCodes.CREATED).json({results});
  });

};
//[2기]_박소현
const getCartItems = (req, res) => {
  const user_id = +req.body.user_id;
  const selected = req.body.selected;

  let sql = `SELECT BookShop.cartItems.id, book_id, title, summary, quantity, price
              FROM BookShop.cartItems
              LEFT JOIN BookShop.books on BookShop.cartItems.book_id=BookShop.books.id
              WHERE BookShop.cartItems.user_id = ?`
  if (selected) 
    sql += ` and BookShop.cartItems.id in (?)`;
  const values = [user_id, selected];
  conn.query(sql, values, 
    (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
      res.status(StatusCodes.OK).json({results});
  });
}
//[2기]_박소현
const removeCartItem = (req, res) => {
  const cartItem_id = +req.param.id ;

  let sql = 'DELETE FROM cartItems WHERE id = ?';
  conn.query(sql, cartItem_id, 
    (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem
 };