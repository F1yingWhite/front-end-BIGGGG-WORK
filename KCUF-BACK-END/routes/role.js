const express = require('express');
const router = express.Router();
let { roles, menus } = require('../data/initData');

// 获取所有角色
router.get('/', (req, res) => {
    res.send(roles);
});

// 创建新角色
router.post('/', (req, res) => {
    const newRole = req.body;
    roles.push(newRole);
    res.send(newRole);
});

// 更新角色
router.put('/:role', (req, res) => {
    const { role } = req.params;
    const updatedRole = req.body;
    roles = roles.map(r => r.role === role ? updatedRole : r);
    res.send(updatedRole);
});

// 删除角色
router.delete('/:role', (req, res) => {
    const { role } = req.params;
    roles = roles.filter(r => r.role !== role);
    res.send({ message: 'Role deleted' });
});

// 获取所有菜单
router.get('/menus', (req, res) => {
    res.send(menus);
});

// 更新菜单权限
router.put('/menus', (req, res) => {
    const updatedMenus = req.body;
    menus = updatedMenus;
    res.send(menus);
});

module.exports = router;
