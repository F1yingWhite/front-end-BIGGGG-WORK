const express = require('express');
const router = express.Router();
const { products } = require('../data/initData');
const multer = require('multer');
const path = require('path');

// 设置文件存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// 获取所有商品
router.get('/', (req, res) => {
    const updatedProducts = products.map(product => ({
        ...product,
        image: `http://localhost:6001${product.image}`,
        imageList: product.imageList.map(img => `http://localhost:6001${img}`)
    }));
    res.send(updatedProducts);
});

// 添加新商品
router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).send(newProduct);
});

// 更新商品
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = updatedProduct;
        res.send(updatedProduct);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

// 上传图片
router.post('/upload', upload.single('file'), (req, res) => {
    res.send({ url: `/images/${req.file.filename}` });
});

module.exports = router;
