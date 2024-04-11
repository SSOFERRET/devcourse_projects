const express = require('express');
const router = express.Router();
const {allCategory} = require('./../controllers/CategoryController')

router.use(express.json());

router.get('/', allCategory);

module.exports = router;