const express = require('express');
const router = express.Router();
let { classifications } = require('../data/initData');

// 获取所有分类
router.get('/', (req, res) => {
    res.json(classifications);
});

// 添加新分类
router.post('/', (req, res) => {
    const newClassification = req.body;
    classifications.push(newClassification);
    res.status(201).json(newClassification);
});

// 更新分类
router.put('/:name', (req, res) => {
    const { name } = req.params;
    const updatedClassification = req.body;
    const index = classifications.findIndex(classification => classification.name === name);
    if (index !== -1) {
        classifications[index] = updatedClassification;
        res.json(updatedClassification);
    } else {
        res.status(404).json({ message: 'Classification not found' });
    }
});

// 删除分类
router.delete('/:name', (req, res) => {
    classifications = classifications.filter(classification => classification.name !== req.params.name);
    res.status(204).send();
});

module.exports = router;
