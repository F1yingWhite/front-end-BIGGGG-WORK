const express = require('express');
const router = express.Router();
let { menus } = require('../data/initData');

// 获取所有菜单
router.get('/', (req, res) => {
    res.json(menus);
});

// 添加新菜单
router.post('/', (req, res) => {
    const newMenu = req.body;
    menus.push(newMenu);
    res.status(201).json(newMenu);
});

// 更新菜单
router.put('/:title', (req, res) => {
    const { title } = req.params;
    const updatedMenu = req.body;
    const index = menus.findIndex(menu => menu.title === title);
    if (index !== -1) {
        menus[index] = updatedMenu;
        res.json(updatedMenu);
    } else {
        res.status(404).json({ message: 'Menu not found' });
    }
});

// 删除菜单
router.delete('/:title', (req, res) => {
    const { title } = req.params;
    menus = menus.filter(menu => menu.title !== title);
    res.status(204).send();
});

module.exports = router;
