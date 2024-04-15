//[2기] 박소현
const conn = require('./../mariadb');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv');

const addLike = (req, res) => {
    const liked_book_id = +req.params.id;
    const user_id = +req.body.user_id;

    let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
    const values = [user_id, liked_book_id];
    conn.query(sql, values,
        (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
      
        res.status(StatusCodes.CREATED).json({results});
    });
};

//[2기] 박소현
const removeLike = (req, res) => {
    const liked_book_id = +req.params.id;
    const user_id = +req.body.user_id;

    let sql = "DELETE FROM likes WHERE user_id=? AND liked_book_id=?";
    const values = [user_id, liked_book_id];
    conn.query(sql, values,
        (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
      
        res.status(StatusCodes.OK).json({results});
    });
};

module.exports = {
    addLike, 
    removeLike
 };