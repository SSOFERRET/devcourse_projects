const conn = require('./../mariadb');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv');
//[2기] 박소현
const allBooks = (req, res) => {
    const user_id = +req.body.user_id;
    let {category_id, news, limit, page} = req.query;
    category_id = +category_id;
    limit = +limit;
    page = +page;
    const offsetValue = (page-1)*limit;
    const values = [user_id, limit, offsetValue];
    
    let sql = `select *,
                    (select count(*) from BookShop.likes where BookShop.likes.liked_book_id=BookShop.books.id)
                    as likes,
                    (select exists 
                        (select * from BookShop.likes 
                        where BookShop.likes.user_id=? and BookShop.likes.liked_book_id=BookShop.books.id)
                    )
                    as my_like,
                    (select category_name from BookShop.category where BookShop.books.category_id = BookShop.category.id)
                    as category_name
                    from BookShop.books`;
                
                // `    from BookShop.books left join BookShop.category 
                // on BookShop.books.category_id = BookShop.category.id`;
    if (category_id || news) 
        sql += " where "
    if (category_id) {
        sql += "category_id = ?";
        values.unshift(category_id);
    }
    if (category_id && news)
        sql += " and "
    if (news)
        sql += "pub_date between date_sub(now(), interval 1 month) and now() ";

    sql += " limit ? offset ?";

    conn.query(sql, values,
        (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        
        res.status(StatusCodes.OK).json({results});
    });
};

const bookDetail = (req, res) => {
    const user_id = +req.body.user_id;
    const book_id = +req.params.id;
    const values = [user_id, book_id, book_id];

    let sql = `select *,
                    (select count(*) from BookShop.likes where BookShop.likes.liked_book_id=BookShop.books.id)
                    as likes,
                    (select exists 
                        (select * from BookShop.likes 
                        where BookShop.likes.user_id=? and BookShop.likes.liked_book_id=?)
                    ) as my_like
                from BookShop.books left
                join BookShop.category on BookShop.books.category_id = BookShop.category.id
                where BookShop.books.id = ?`;
    conn.query(sql, values,
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
    let {category_id, news} = req.query;
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

const newBooksByCategory = (req, res) => {
    let {category_id, news} = req.query;
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
//[2기 박소현]
const booksSearch = (req, res) => {
    console.log(req.query)
    if (req.query.category_id) 
        booksByCategory(req, res);
    else if (req.query.category_id && req.query.news)
        newBooksByCategory(req, res);
    // else if ()
    // else 
    //     allBooks(req, res); 
}

module.exports = {
  allBooks,
  bookDetail,
  booksByCategory,
  booksSearch
 };