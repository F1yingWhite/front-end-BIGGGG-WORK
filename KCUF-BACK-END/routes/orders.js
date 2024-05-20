const express = require('express');
const router = express.Router();
const { orders, products } = require('../data/initData'); // 确保你从 initData 中导入了 orders 和 products

// 获取所有订单
router.get('/', (req, res) => {
    res.send(orders);
});

// 添加新订单
router.post('/', (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.status(201).send(newOrder);
});

// 更新订单
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedOrder = req.body;
    const index = orders.findIndex(order => order.productId === id);
    if (index !== -1) {
        orders[index] = { ...orders[index], ...updatedOrder };
        res.send(orders[index]);
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
});

module.exports = router;
