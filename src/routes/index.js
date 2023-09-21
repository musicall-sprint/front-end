const pagesRoute = require("./pages.routes");
const express = require('express');
const router = express.Router()

router.use('/', pagesRoute);

module.exports = router;