import CryptoJS from "crypto-js";
import { getFileBase64 } from "./img2base64";
import { v4 as uuidv4 } from "uuid";

async function initData() {
  let users = JSON.parse(localStorage.getItem("user")) || [];
  if (users.length === 0) {
    localStorage.setItem("user", JSON.stringify([
      {
        username: 'admin',
        password: CryptoJS.SHA256('Admin123456').toString(),
        email: "81723334@qq.com",
        privilege: "管理员"
      },
      {
        username: 'user',
        password: CryptoJS.SHA256('User123456').toString(),
        email: "21301172@bjtu.edu.cn",
        privilege: "普通用户"
      },
      {
        username: 'seller',
        password: CryptoJS.SHA256('Seller123456').toString(),
        email: "21301173@bjtu.edu.cn",
        privilege: "商家"
      }
    ]));
  }

  // 设置权限列表
  let privileges = JSON.parse(localStorage.getItem('privileges')) || [];
  if (privileges.length === 0) {
    privileges = [
      {
        role: '管理员',
        desc: '拥有所有权限'
      },
      {
        role: '普通用户',
        desc: '只能查看'
      },
      {
        role: "商家",
        desc: "能够管理商城商品"
      }
    ];
    localStorage.setItem('privileges', JSON.stringify(privileges));
  }

  // 设置菜单列表
  let menus = JSON.parse(localStorage.getItem('menus')) || [];
  if (menus.length === 0) {
    menus = [
      {
        title: '权限管理',
        parent: "",
        path: "",
      },
      {
        title: '用户管理',
        parent: '权限管理',
        path: '/userControl',
        allowUser: [
          '管理员'
        ]
      },
      {
        title: '角色管理',
        parent: '权限管理',
        path: '/roleControl',
        allowUser: [
          '管理员'
        ]
      },
      {
        title: '菜单管理',
        parent: '权限管理',
        path: '/menuControl',
        allowUser: [
          '管理员'
        ]
      },
      {
        title: "商城管理",
        parent: "",
        path: ""
      },
      {
        title: "订单列表",
        parent: "商城管理",
        path: "/orderControl",
        allowUser: [
          '管理员',
          '商家'
        ]
      },
      {
        title: "商品列表",
        parent: "商城管理",
        path: "/productsControl",
        allowUser: [
          '管理员',
          '商家'
        ]
      },
      {
        title: "分类列表",
        parent: "商城管理",
        path: "/classControl",
        allowUser: [
          '管理员',
          '商家'
        ]
      }
    ];
    localStorage.setItem('menus', JSON.stringify(menus));
  }

  // 商品名称 商品图片 商品价格 库存 销量 图片 商品编号 所属店家
  let products = JSON.parse(localStorage.getItem('products')) || [];

  if (products.length === 0) {
    const tags = ['手机数码', '电脑办公'];
    const fetchPromises = tags.map(tag =>
      fetch(`${process.env.PUBLIC_URL}/data/${tag}.json`)
        .then((response) => response.json())
        .then(async (data) => {
          var phone_product = data;
          for (let i = 0; i < phone_product.length; i++) {
            phone_product[i].name = phone_product[i].product_name;
            phone_product[i].id = uuidv4();
            phone_product[i].seller = "seller";
            phone_product[i].classification = tag;
            phone_product[i].price = parseFloat(phone_product[i].product_price);
            phone_product[i].sales = parseInt(phone_product[i].product_sales);
            phone_product[i].stock = parseInt(phone_product[i].product_stock);
            phone_product[i].imageList = [];
            for (let j = 0; j < phone_product[i].carousel_images.length; j++) {
              let request = new Request(phone_product[i].carousel_images[j]);
              phone_product[i].imageList.push(await getFileBase64(request.url));
            }
            products.push(phone_product[i]);
          }
        })
    );

    Promise.all(fetchPromises)
      .then(() => {
        localStorage.setItem('products', JSON.stringify(products));
      })
      .catch((error) => console.error('Error fetching the data:', error));
  }

  //订单的格式：用户姓名，商品id，订单商品，订单地址，订单时间，订单数量，订单金额，订单状态（付款-发货-收获）
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  if (orders.length === 0) {
    orders = [
      {
        id: uuidv4(),
        userId: "user",
        sellerId: "seller",
        productId: products[0].id,
        productName: products[0].name,
        address: "北京市海淀区",
        receiverName: "张三",
        receiverPhone: "13800000000",
        remark: "请尽快发货",
        time: new Date().toLocaleString(),
        amount: 1,
        price: 8848,
        status: "付款"
      }
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
  }
  let classifications = JSON.parse(localStorage.getItem('classifications')) || [];
  if (classifications.length === 0) {
    classifications = [
      {
        name: "手机数码",
      },
      {
        name: "家用电器",
      },
      {
        name: "家居家装",
      },
      {
        name: "汽车用品",
      },
      {
        name: "电脑办公",
      }
    ];
    localStorage.setItem('classifications', JSON.stringify(classifications));
  }
}

export { initData };
