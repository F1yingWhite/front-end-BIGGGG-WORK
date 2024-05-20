const express = require('express');
const router = express.Router();
const { users } = require('../data/initData');
const CryptoJS = require('crypto-js');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const user = users.find(u => u.username === username && u.password === hashedPassword);

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    res.send({ message: 'Login successful', user });
});

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    if (users.find(u => u.username === username)) {
        return res.status(400).send('User already exists');
    }

    const newUser = {
        username,
        password: CryptoJS.SHA256(password).toString(),
        email,
        privilege: '普通用户',
    };

    users.push(newUser);
    res.send({ message: 'User registered successfully', user: newUser });
});

module.exports = router;
