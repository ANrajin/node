const express = require('express');
const Router = express.Router();


/**
 * [GET]
 */
Router.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

module.exports = Router;
