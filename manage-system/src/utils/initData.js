import CryptoJS from "crypto-js";

function initData() {
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
  //设置权限列表
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
  //设置菜单列表
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
}

export { initData };