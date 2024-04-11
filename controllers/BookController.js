const conn = require('./../mariadb');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv');

const allBooks = (req, res) => {
    let sql = "SELECT * FROM books";
    conn.query(sql,
        (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
      
        res.status(StatusCodes.OK).json({results});
    });
};

const bookDetail = (req, res) => {
    let {id} = req.params;

    let sql = "SELECT * FROM books WHERE id = ?";
    conn.query(sql, id,
        (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results[0])
            return res.status(StatusCodes.OK).json(results[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    });
};

const booksByCategory = (req, res) => {
    let {category_id} = req.query;
    console.log(req.query);

    let sql = "SELECT * FROM books WHERE category_id = ?";
    conn.query(sql, category_id,
        (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results.length)
            return res.status(StatusCodes.OK).json(results);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    });
};

const booksSearch = (req, res) => {
    console.log(req.query)
    if (req.query.category_id) 
        booksByCategory(req, res);
    else 
        allBooks(req, res); 
}

module.exports = {
  allBooks,
  bookDetail,
  booksByCategory,
  booksSearch
 };