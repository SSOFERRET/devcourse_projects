const express = require('express');
const router = express.Router();
const {allBooks, bookDetail} = require('./../controllers/BookController')

router.use(express.json());

// router.get('/', booksByCategory);
// router.get('/', allBooks);
router.get('/', allBooks);
router.get('/:id', bookDetail);

module.exports = router;