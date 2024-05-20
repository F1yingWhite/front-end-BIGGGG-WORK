const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
let { users } = require('../data/initData');

// 使用 SHA-256 对密码进行加密
const encryptPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

// 获取所有用户（隐藏密码字段）
router.get('/', (req, res) => {
    const sanitizedUsers = users.map(user => {
        const { password, ...rest } = user;
        return rest;
    });
    res.send(sanitizedUsers);
});

// 创建新用户
router.post('/', (req, res) => {
    const newUser = req.body;
    newUser.password = encryptPassword(newUser.password);
    users.push(newUser);
    const { password, ...sanitizedUser } = newUser;
    res.send(sanitizedUser);
});

// 更新用户（加密新密码）
router.put('/:username', (req, res) => {
    const { username } = req.params;
    const updatedUser = req.body;
    if (updatedUser.password) {
        updatedUser.password = encryptPassword(updatedUser.password);
    }
    users = users.map(u => u.username === username ? updatedUser : u);
    const { password, ...sanitizedUser } = updatedUser;
    res.send(sanitizedUser);
});

// 删除用户
router.delete('/:username', (req, res) => {
    const { username } = req.params;
    users = users.filter(u => u.username !== username);
    res.send({ message: 'User deleted' });
});

router.get('/sellers', (req, res) => {
    const sellers = users.filter(user => user.privilege === '商家').map(user => user.username);
    res.json(sellers);
});

module.exports = router;
