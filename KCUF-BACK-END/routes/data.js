const express = require('express');
const router = express.Router();
const { users, menus, products, orders } = require('../data/initData');

router.get('/init', (req, res) => {
    res.send({ users, menus, products, orders });
});

module.exports = router;
