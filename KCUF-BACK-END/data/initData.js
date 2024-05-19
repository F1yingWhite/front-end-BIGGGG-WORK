const CryptoJS = require('crypto-js');

let users = [
    {
        username: 'admin',
        password: CryptoJS.SHA256('Admin123456').toString(),
        email: '81723334@qq.com',
        privilege: '管理员',
    },
    {
        username: 'user',
        password: CryptoJS.SHA256('User123456').toString(),
        email: '21301172@bjtu.edu.cn',
        privilege: '普通用户',
    },
    {
        username: 'seller',
        password: CryptoJS.SHA256('Seller123456').toString(),
        email: '21301173@bjtu.edu.cn',
        privilege: '商家',
    },
];

let menus = [
    {
        title: '权限管理',
        parent: '',
        path: '',
    },
    {
        title: '用户管理',
        parent: '权限管理',
        path: '/userControl',
        allowUser: ['管理员'],
    },
    {
        title: '角色管理',
        parent: '权限管理',
        path: '/roleControl',
        allowUser: ['管理员'],
    },
    {
        title: '菜单管理',
        parent: '权限管理',
        path: '/menuControl',
        allowUser: ['管理员'],
    },
    {
        title: '商城管理',
        parent: '',
        path: '',
    },
    {
        title: '订单列表',
        parent: '商城管理',
        path: '/orderControl',
        allowUser: ['管理员', '商家'],
    },
    {
        title: '商品列表',
        parent: '商城管理',
        path: '/productsControl',
        allowUser: ['管理员', '商家'],
    },
    {
        title: '分类列表',
        parent: '商城管理',
        path: '/classControl',
        allowUser: ['管理员', '商家'],
    },
];


let products = [
    {
        name: 'huawei mate 60 pro',
        classification: '手机数码',
        image: '/images/mate60.png',
        price: 8848,
        stock: 1024,
        sales: 233,
        imageList: ['/images/mate60_1.png', '/images/mate60_2.png', '/images/mate60_3.png'],
        id: 'd40a13a6-6b58-4f08-b9e6-da2cbd20c3fc',
        seller: 'seller',
    },
];
let orders = [
    {
        userId: 'user',
        sellerId: 'seller',
        productId: 'd40a13a6-6b58-4f08-b9e6-da2cbd20c3fc',
        productName: 'huawei mate 60 pro',
        address: '北京市海淀区',
        time: new Date().toLocaleString(),
        amount: 1,
        price: 8848,
        status: '付款',
    },
];

let classifications = [
    { name: '手机数码' },
    { name: '家用电器' },
    { name: '家居家装' },
    { name: '汽车用品' },
    { name: '电脑办公' },
];
module.exports = {
    users,
    menus,
    products,
    orders,
    classifications,
};