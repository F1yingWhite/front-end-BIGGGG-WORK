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
    const phone_product = [
      {
        "product_name": "AOC 游戏电竞显示器 27英寸 4K 160Hz FastIPS原装模组 HDR600 1ms MBRSync 硬件低蓝光 爱攻AG276UX",
        "product_price": "16137.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "47918",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "69850",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/244741/11/10923/99047/665dd558F9c469d84/7b3e499617d1c4ce.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/229693/14/15119/102809/664313bbF09e21538/fda772dba0501bba.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/232270/28/16581/93811/664313bdFca66888b/5d97a10ef3b95855.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/236378/32/17014/173511/664313bbFd8074549/c6485738df9dd7b3.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/219208/36/39920/58916/664313beF51fbfaf2/f3521643c25675bd.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/89635/3/46663/150305/664313bdF059abb84/1bb5e181d989c194.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/248158/3/9027/11002/664313bcFb4a838a7/ceb48fbc35c2ea3c.jpg"
        ]
      },
      {
        "product_name": "AOC 27英寸 2K HDR400 IPS 原生180Hz  1ms 10Bit 满血小金刚MAX 旋转升降 游戏电竞显示器 Q27G2S/D",
        "product_price": "11161.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "68779",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "69609",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/205452/36/43858/111660/665dd552F4764e86c/f6696db428208181.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/248227/3/1594/91363/6593729bFfc8ef251/c1b8793a4e67b39e.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/199199/39/29149/145799/63889e14E249b69ee/f6edd3e6b8d4d557.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/205600/28/24616/380832/62bea94cE36c33715/31a070489ff37259.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/170272/5/20205/398663/608120f0Ebbd5e918/15cf24cc0a4c71fb.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/182356/7/413/449812/608120e8Efcbe56bb/219e77b7ac381904.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/158649/26/20955/105645/608120f0E3389e22c/4c0654da4b96cf55.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/173754/20/5894/194240/608120f0Eab6de83e/acc7375a2c4c3d6d.jpg"
        ]
      },
      {
        "product_name": "KTC 23.8英寸 FHD 180Hz FastIPS屏 HDR400亮度 硬件低蓝光 广色域笔记本电脑游戏电竞显示器 H24F8",
        "product_price": "5775.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "KTC"
        ],
        "product_sales": "79098",
        "product_shop": "KTC京东自营旗舰店",
        "product_stock": "75020",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/197662/22/44330/136104/665d885bF127b84be/0372b9fa8d35cb2c.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/211651/37/43106/210913/66456fdaF40078918/bdf1461d128cd1bd.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/239435/6/7838/151139/6641b70aFb22dd021/177ebb7797bcad7c.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/159208/10/40959/189973/6641b70bF7f3ff7c5/a075b4cabe1778f5.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/236711/10/17355/90392/66456fd3F5508161e/abac7a5e362bbf58.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/236058/38/16474/138856/6641b70cF40d0de18/6b93e18a047b799e.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/236806/9/17196/116835/6641b709Fdd8c9b54/60a1415a02b1b3b2.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/193833/10/45951/274680/662f79b7F0e2f095a/43e887458f7186e6.jpg"
        ]
      },
      {
        "product_name": "KTC 27英寸2K 180Hz 硬件低蓝光 1毫秒(GtG)  FastIPS屏 外接笔记本电竞显示器H27T22C-T22S护眼版",
        "product_price": "7214.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "KTC"
        ],
        "product_sales": "99087",
        "product_shop": "KTC京东自营旗舰店",
        "product_stock": "7565",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/197337/33/37913/133547/665d885aF87c127d4/69fc1186cca0045d.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/121852/15/43564/140694/663a0212Fd75b09f1/c59423647c1c1ba8.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/207909/15/42373/130818/663a0210Fe3ddb9d0/15ae41e69d9b4c8f.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/151224/16/43258/152655/663a0210Faeeac16b/d9020d244dd00c61.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/158501/37/41857/163579/663a0211Fe27ffc19/9787a40d189c8250.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/218234/31/41013/98612/663a0211F0b3483da/e965f0b30cb5fc53.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/178441/29/45767/17627/663a0213F98370111/85eeccb45a484e97.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/162717/9/44845/18959/663a0213F60393c54/5ca78f5431aaa724.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/157366/27/39669/19115/663a0212Fb48707b9/fe982bb0fe136342.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/196400/12/44316/27753/664ea9fbF8bb90512/26ba567526a61fb2.jpg"
        ]
      },
      {
        "product_name": "泰坦军团 27英寸 2K 原生180Hz FastIPS快速液晶 广色域显示屏 1ms电竞显示器 窄边框电脑办公游戏屏P27H2R",
        "product_price": "18844.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "泰坦军团（TITAN ARMY）"
        ],
        "product_sales": "15375",
        "product_shop": "泰坦军团（TITAN ARMY）京东自营旗舰店",
        "product_stock": "50556",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/193418/39/46792/145114/6659b442Fd931f7fa/7c837d169e8a6258.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/193530/30/40737/112624/6535f5f6Fa4a2b32e/b15f3ba35c51924e.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/9806/31/23522/125145/6535f5f8Fa8df617f/382d4d3451acef22.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/216298/27/30587/136086/6540d1ecF65f43ba4/be7f55bc17c12ff6.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/247420/18/5302/176659/65e57fc3F064d83cc/1dc3185ed3f57e26.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/185498/24/40364/143910/6535f5f5F132cc118/78432fa128a20079.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/165611/19/38972/174024/6535f5f6F01348ea1/6d12ddd970f7dd2e.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/95906/22/41657/36571/6535f5f4F8144701d/32831cc072062a1b.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/237056/26/436/155559/6535f5f9F42de9a5e/881bb58bf3ab9b42.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/187985/21/38420/31633/651123dbF448fba0e/afa9a7e1adf20367.jpg"
        ]
      },
      {
        "product_name": "华为MateView SE 23.8英寸显示器 IPS全面屏 P3广色域 75Hz 低蓝光无频闪 DP+HDMI+VGA 电脑办公",
        "product_price": "11358.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "华为（HUAWEI）"
        ],
        "product_sales": "10503",
        "product_shop": "华为京东自营官方旗舰店",
        "product_stock": "30913",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/148292/24/43549/44920/665d8bf1Ff1e9a994/273dfac2ec363494.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/104219/29/39200/43323/64ae5638Fbb1e2010/12c0a344a577c3ad.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/169235/23/36623/52504/64648bb0F2a2c4ba2/1fc26d958d00b759.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/54039/6/23090/34887/64648bb0F8b9177e0/d3942f20c9c37bb0.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/66759/9/25573/78618/64648bb0F5bb890f6/fcc4b7afbcc0fc97.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/79471/12/26758/38689/64648bafF615b104f/498ce3b0fffa3407.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/87379/14/32378/21283/64ae5639F2d372a78/90de9a1aa1c442c7.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/142130/12/36351/77792/6465e259F3ea9f3e6/821973144ecd0cdd.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/125586/21/33920/40457/64afa866Ff57d4ac6/5ca189c98d785899.jpg"
        ]
      },
      {
        "product_name": "HPC 23.8英寸 2K高清 IPS 100Hz 99%sRGB广色域 DP接口 广视角 微边框可壁挂 电脑显示器HP24QI",
        "product_price": "4109.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "HPC"
        ],
        "product_sales": "2425",
        "product_shop": "HPC显示器京东自营旗舰店",
        "product_stock": "40861",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/88588/8/41625/58160/664ab22eF799d4d1e/fde79a8053c7dc34.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/179088/35/41173/65236/653a53faF5fdc4ac5/b876a8f749fa8c53.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/188854/36/41014/41777/653a53faFfedcdd87/b065122f38867a10.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/185471/31/39650/206120/6544c76eFd89e4670/797e0c34893c9775.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/131792/13/40197/139587/653a53fdF9638a982/bec3181319b51fe3.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/92660/39/31378/59456/653a53fcF0350f788/d44160aa2d76a7e6.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/237849/33/721/118483/653a53fbF6cc33fca/2a4f29a1ea0b88dc.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/197571/40/36456/93389/653a53fbF3fa63a7d/a53f9367f090931a.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/237255/12/1122/34973/653f971eFac3526e4/b2b32f5e9a40237e.jpg"
        ]
      },
      {
        "product_name": "HKC 27英寸2K高清180Hz高分FastIPS快速液晶显示屏1ms游戏电竞家用外接笔记本台式电脑显示器IG27Q",
        "product_price": "944.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "HKC"
        ],
        "product_sales": "65016",
        "product_shop": "HKC京东自营旗舰店",
        "product_stock": "69818",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/227278/21/19700/145814/665e8c32F0c868617/0f16511be4bcb967.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/233070/29/16850/170104/663eda82Fb8d3a962/73b1a792befc94f1.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/91880/23/42942/87283/663eda8eF36c1fc41/4834339376d8ba89.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/172448/30/32698/76411/63be7f5eF0ec7d8d5/5619ebb9ed6d9096.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/152958/11/37432/107865/663eda9aF7966d801/68819bacd8a23508.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/235122/30/10163/104119/658795b8F443a1951/9a542e3701c11391.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/227344/31/10411/151794/6588e4cbFd354b83e/6298def98b26ac70.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/228933/25/10254/43250/6588e4d2F2d8bbcb3/6545a48edc24d35c.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/167865/16/37740/41285/65b1cd12Fe72b586c/f527e4e4b3118e56.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）27英寸 180Hz 2K 1ms(GTG) Fast IPS HDR400 护眼 旋转升降 玄龙骑士 电竞显示器 LS27DG502ECXXF",
        "product_price": "7019.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "60094",
        "product_shop": "三星显示器京东自营旗舰店",
        "product_stock": "12773",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/247065/23/10401/162594/6659bf22Fc4d47294/70f499c806b54c3f.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/177631/4/44114/134521/660cb53cFb5e324c7/ebb8fd4579c9d55b.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/164539/29/39872/108287/660cb53bF4055e893/239c5e408fe12fe7.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/127399/19/40901/116904/660cb53bFa73fa4bc/3305eb5249153de0.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/232605/15/15386/126250/660cb53cF0005eb68/02823bfb4d691f6c.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/224881/5/15576/129749/660cb52cF0385d58d/1bd5cc710192385e.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/221195/31/38930/99979/660cb53dF37b07ef6/d15e5eb480eadb41.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/225776/19/12947/116219/660cb53dF83773d5c/6b64e768321a41b6.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/164121/21/44014/102846/660cb53cFdf28fbe4/d8c2776ef60b8a5e.jpg"
        ]
      },
      {
        "product_name": "联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz原生低蓝光1ms 旋转升降HDR400 10bit电竞显示器R27qe",
        "product_price": "11569.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "联想（Lenovo）"
        ],
        "product_sales": "2011",
        "product_shop": "联想京东自营旗舰店",
        "product_stock": "38130",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/193432/34/45226/153484/665ee0aeF322f5ac7/236e68bcebf55c52.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/224095/25/16433/71490/6645aa11F1001f6a2/6839a860b137db68.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/241841/24/8537/85042/6645aa11F3dd478d3/7860201935e662c7.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/162872/1/41807/95480/6645aa11Feff6c5b7/6424e8b7543b3280.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/150486/35/38697/105999/6645aa10F423654a9/431c2461f664152a.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/230854/38/17569/87189/6645aa10F27280cf0/6234344a19804457.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/167130/28/44673/109597/6645aa10F2a8e4d74/d6c89b1a0a5683c6.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/198820/6/40033/29196/6645aa0fFf6aa9b09/f77a430d5d2fad44.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/225084/4/17025/97626/6645aa0fF1aa44fdc/353c53eeb6945c91.jpg"
        ]
      },
      {
        "product_name": "AOCPO27英寸2k165hz电脑显示器4K 游戏娱乐电竞屏 低蓝光直男小钢炮 商务办公设计台式显示器 27英寸-直面白色无边【1K+75Hz】",
        "product_price": "4631.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOCPO"
        ],
        "product_sales": "86178",
        "product_shop": "AOCPO电脑配件旗舰店",
        "product_stock": "7761",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/173262/14/45191/29801/66372e4cFd09b6e2a/ff8e7ed7c3bb2be3.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/134556/23/41931/89360/66372dceF47c157f8/2ee041d15f0ffc40.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/199344/7/43190/134168/66372dcdF3a0b0918/56e8bf85e49e4a66.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/238354/5/16007/110891/66372dcdF8383a8cd/e262d395f9c0fb3a.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/122716/32/45919/61134/66372dcdFcfcfede8/2013c075d639d688.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/235368/21/16778/59392/66372dd9F49ed06d6/6e058cdb1eafc9a2.png"
        ]
      },
      {
        "product_name": "KTC 24.5英寸 FHD 原生180Hz FastIPS屏 350亮度 电脑显示器 低蓝光 广色域 电竞电脑显示器 H25T7",
        "product_price": "12194.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "KTC"
        ],
        "product_sales": "49281",
        "product_shop": "KTC京东自营旗舰店",
        "product_stock": "12630",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/222436/25/41524/122045/665a9260Fcb413b0d/c3f02323c92a5532.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/238419/12/5147/251439/65e7c992Fab99ccfe/9967ea1d9bb7845b.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/103110/20/36893/121223/65b9e49dF206f9fea/40f5ab0503f22a78.png",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/89044/34/37167/121637/65b9e49bF2cf23a27/8e565f32e66d8447.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/198421/11/20935/107339/65b9e49cF664b1083/4b67cbaffb801f86.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/230807/32/14786/88662/65f17b3cF5ecc9597/af15519c1e470e14.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/199512/6/39291/93425/65b9e49eF7a9abd69/6124311f064d207d.png",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/105943/18/43237/29849/65b77785F6ee7b0d5/141e9b630fb816e1.jpg"
        ]
      },
      {
        "product_name": "拾光纪 23.8英寸电脑显示器CA24H0 办公护眼低蓝光无屏闪防眩光 TUV莱茵认证",
        "product_price": "4014.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "拾光纪"
        ],
        "product_sales": "39719",
        "product_shop": "拾光纪官方旗舰店",
        "product_stock": "47232",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/jfs/t1/188285/18/47771/90942/665e7c7eFc1aa21fc/e3b0bea39404d083.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/65791/28/23031/78881/636cd707Eab4f66cc/7167861c50edb68f.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/93484/34/31772/86004/636cd708E08c1b1ea/08730c5f5ff96593.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/6362/32/27058/46893/636cd708Eb0f57a00/22fc419472e48819.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/21804/10/19115/79417/636cd708E69942796/f35ebd3fe025d652.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/121269/16/32474/43904/636cd708E26799d84/a8d505b5fe352f00.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/132094/36/30880/78011/636cd708E9f1235bd/51258a524662a3ce.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/194304/31/29922/89926/636cd709E74fa0fa6/cf528348d126469e.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/63103/11/22892/39829/636cd709Eb1498453/699f5bc6c7861c24.jpg"
        ]
      },
      {
        "product_name": "HKC 27英寸2K高清180Hz高刷FastIPS广色域HDR400响应1Ms电竞游戏电脑旋转升降显示器 猎鹰二代G27H2",
        "product_price": "11338.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "HKC"
        ],
        "product_sales": "74397",
        "product_shop": "HKC京东自营旗舰店",
        "product_stock": "27838",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/162805/34/46370/150533/6659c867F71487cca/4578bfb21d927fbe.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/158879/29/46448/109694/664abd4eF5645f199/a71881b8d72c7798.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/96572/11/38370/143086/662a203bF990a9898/8d0a658f17dc4508.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/244505/11/8646/167863/66383aaeF5ff18d0e/f6c5ada94a2bcc21.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/107161/2/45059/111577/6646c8e7F70daed95/c3f652ac8e95320b.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/240508/17/6148/231747/66383ab6F9a123e23/e5c9cdc293991e52.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/221448/30/28915/182162/662a203aFb31cbad4/f71a2cdb484b803d.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/175401/3/44289/146764/662b2826F6cc3642a/0f33f1c5600e6180.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/134655/15/44546/186226/662a203aFe7d91a14/2edcc64ac0d0bf4f.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/129797/16/43425/34339/662a2039F6d8c7faf/43fad9dcd9a79291.jpg"
        ]
      },
      {
        "product_name": "熊猫（PANDA) 27英寸 2K高清屏 IPS技术 75Hz 滤蓝光不闪屏 窄边框 办公家用电脑显示器 PS27QD2",
        "product_price": "10681.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "熊猫（PANDA）"
        ],
        "product_sales": "85706",
        "product_shop": "熊猫（PANDA)显示器京东自营旗舰店",
        "product_stock": "4795",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/199051/32/39928/76302/66599a96Fb68f6d77/11ee51c5cc108a7d.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/163663/31/42288/57310/664c55b2F25219980/9cae3f72e6e131ee.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/202826/19/41313/86511/664861b7F2789b87e/c0cc449a7f7f8688.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/219947/33/41777/129475/664861b6F8007f343/f3fd0804da6bb989.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/226596/39/17841/147027/664861b5Ffbb63e33/a45b67eef500f3c3.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/167291/15/42533/43688/66486286Ffbed966f/e434d11635a747e3.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/198438/9/33202/42328/644b2ed3F2f1d72c4/d3888d96d8db88b5.jpg"
        ]
      },
      {
        "product_name": "泰坦军团24.5英寸 原生180Hz FAST IPS快速液晶屏1ms HDR专业电竞游戏小钢炮 硬件低蓝光电脑显示器P25H2GC",
        "product_price": "10081.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "泰坦军团（TITAN ARMY）"
        ],
        "product_sales": "99314",
        "product_shop": "泰坦军团（TITAN ARMY）京东自营旗舰店",
        "product_stock": "96355",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/249053/27/10241/125468/6659b48eF7fb80893/efd65b12ee669b02.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/248622/27/2678/159522/659e384fFc65110b8/b63365e2ce3d3f72.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/240880/27/2900/132203/659e3850F374b9a52/237ca41af8b96494.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/245818/11/2863/102502/659e3850Fe4d4f79c/298cfcbb581a7fbc.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/237739/40/9866/144242/659e384eFba64001e/8e15c6a42d83313b.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/224072/12/12223/150249/659e384fF37e46709/6ab3fda9e60748d8.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/232671/15/11835/136162/659e384eF88560c72/5afaed96ae12036e.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/240244/15/2054/106167/659e3851Ffb17fe1e/c349bd59e771fb5c.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/238640/34/2981/143177/659e3851Fa1829a9d/a862ae40a7e097e2.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/228387/2/10910/31322/659e3f12Fd017f1b8/be2102972fcff667.jpg"
        ]
      },
      {
        "product_name": "AOC 27英寸 2K超清 100hz IPS广色域 65W Type-C 三边微边 低蓝光不闪屏 游戏办公电脑显示器Q27E12C",
        "product_price": "19000.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "86175",
        "product_shop": "AOC商用京东自营旗舰店",
        "product_stock": "83115",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/176475/24/40916/76835/664ab50bF7879a383/bc9b56178c22b3a3.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/228517/9/5888/113647/656e8b8cF61b61698/0495a8909442eb89.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/231128/30/6105/54316/656e8b88Fab77773f/f15b1368b2a3a89f.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/236139/17/5421/61278/656e8b8bFd07d26a9/e5be0c9a821e289a.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/230002/33/5837/77753/656e8b8bF4f6c9969/8a5a4f811cce3516.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/98660/19/43429/79571/656e8b8aF756d5e95/03b853dc0ad597ef.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/109616/23/35663/104661/656e8b8aF781d57d0/3c853f15780718ab.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/225337/28/6758/21857/656e8b8cF772544cb/7f545b3a2599c177.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/237291/35/6383/44913/6572c00fF1b42fbe8/c83431436447e7f9.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/161317/20/43503/41053/65fd2d63F1835ad17/7d0fd22c6bd7e22c.jpg"
        ]
      },
      {
        "product_name": "小米Redmi 27英寸2K电竞显示器 G27Q 2025款  Fast IPS 180Hz刷新率 1ms响应 广色域 电脑办公显示器",
        "product_price": "4485.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "9050",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "23313",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/215921/25/42690/77663/665dbac8Fbedba4c6/bca9fbb4cb683bbc.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/198478/17/43049/90721/662e2d3dF7bedeace/3bc1543e0e632c04.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/231600/24/16093/85023/662e2d27Ffe6ef114/6cf26408d12b6a74.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/95085/27/43594/85489/662e2d26F1adfe778/47ac329579d8301c.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/157207/31/45753/126823/662e2da5Fc8992ee1/5c576677933a24fa.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/225031/30/17505/113957/662e2da5Fa4801e92/48b69696ec4ef56a.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/184691/20/44788/143151/662e2da4F35160ffd/876c506874c57c18.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/180187/21/44682/97317/662e2da4F4f3aa766/2ff674c7416b3625.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/236772/4/15533/119180/662e2da4Fbf16e6a8/901bd97817ca8723.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/231110/30/17161/36209/662e2deeFc486ff3e/8d9198f0cd274733.jpg"
        ]
      },
      {
        "product_name": "HKC 23.8英寸165Hz高刷 显示器 三面窄边 广视角 1ms响应 不闪屏144Hz专业电竞电脑显示屏 VG245M",
        "product_price": "11269.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "HKC"
        ],
        "product_sales": "85920",
        "product_shop": "HKC京东自营旗舰店",
        "product_stock": "81180",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/189350/21/45932/159737/665d78d7Fea91dd20/d137035282027cd5.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/98338/3/38525/94299/65d85adbF21f4d3b3/abb85ed29f1f6e79.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/48447/35/22647/133271/63b53c46F02ce4a56/c06128147f392802.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/86382/19/33599/112496/63b53c46F145692eb/9f6df34232850dd2.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/172533/36/42630/90242/65d85ae2F7916258f/a42b52712d456ceb.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/156154/25/41249/176344/65d85aebF0128dd49/7862f8b14fbf4ce4.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/228462/23/13281/40913/65d85af0Fd8964972/eb99c0c1e9dcfeab.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/216762/17/36628/169950/65d85af6Fdd5da156/177589c3b5ac8de3.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/103374/6/48038/14336/65d85b0bFb8714e03/09c61e7717f07137.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/103715/25/35917/41302/63b52e95Fac3f443c/8a96bc393ab79434.jpg"
        ]
      },
      {
        "product_name": "泰坦军团27英寸4K原生160Hz FastIPS广色域 硬件低蓝光 1msGTG 可升降10.7亿色电竞游戏屏电脑显示器P27H2V",
        "product_price": "3220.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "泰坦军团（TITAN ARMY）"
        ],
        "product_sales": "46339",
        "product_shop": "泰坦军团（TITAN ARMY）京东自营旗舰店",
        "product_stock": "70048",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/190047/34/44475/139404/6659b43cF83b817d3/89a6b31afd6ec0b2.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/85936/18/27318/129343/65153784Feb68607a/91926673876341a5.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/178801/28/41147/129384/653b7cadF5390beaf/d108087668007c5c.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/205658/32/36211/138818/65153784Fe8cf62c3/1e7631dd27b97cec.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/206104/12/37879/270026/6535ee65Fc2113502/1078d08fad5a1f3c.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/194453/4/39101/109340/65222291F178f03f8/129648f3791decfb.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/94569/8/45518/141722/65224f0eF9a99cf10/23aac27517e159e9.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/95475/11/44151/145841/65153785Faf3069bb/43a0475997b313d7.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/130933/27/39268/93506/65153785F8e9eb406/e27adb3c9553e98a.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/46041/16/24550/31037/65153784Ff445f7cc/f9519a0252ac2e11.jpg"
        ]
      },
      {
        "product_name": "HKC 27英寸NanoIPS 2K 180Hz超频 10bit HDR400 原厂模组电竞显示器 升降旋转屏幕GTG1Ms 神盾MG27Q",
        "product_price": "9593.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "HKC"
        ],
        "product_sales": "90371",
        "product_shop": "HKC京东自营旗舰店",
        "product_stock": "93400",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/151370/36/43923/170170/665e8e8eF76dd0420/d6503c1ca573311f.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/218489/29/36278/66996/650e61b7F4b942af8/08d995a5f840e132.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/142002/40/32807/149466/63f5dab4F306077e0/44964e2539757887.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/53727/25/23286/119452/63d77d2bF8fdaab48/b06021480c7dea2b.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/7539/34/21738/118321/63d72385F6a566e25/ba46fc1ab6e4795d.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/128888/1/35356/170009/6409ae98F6d1037ca/64c64b600a829f01.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/70513/6/20502/62165/63be7eb8F99eebb39/6228b06fcaf4729a.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/63597/35/18493/10905/63be7eb7F80304594/d2f406e131e46a98.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/48399/22/20312/20026/63be7eb7F097eb86e/f56843d086fdddd1.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/63057/5/23115/40266/63be7eb8F5d0f7c94/3c94c70b62451581.jpg"
        ]
      },
      {
        "product_name": "高清电脑显示器2K高刷144/165电竞高刷曲屏4K设计美工组装台式显示屏监控屏幕可挂墙 下拉更多款式可选 17英寸丨正屏黑框款丨VGA",
        "product_price": "13138.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "邦梭（BOONSOOAL）"
        ],
        "product_sales": "15102",
        "product_shop": "邦梭旗舰店",
        "product_stock": "99293",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/jfs/t1/246742/8/2301/119032/6598cd18F45f3cd7d/5ede6c96863dada7.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/229361/13/11055/110422/6598c953F7dfd1123/51f442a73153c986.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/229985/1/9750/91318/659bc1c1F6ac31314/a3efe8d98bc5e268.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/216864/11/23493/87086/64eed4deF536b25bf/949909f076af96c2.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/194044/19/26622/132512/6455e3b3F1f2ab696/d75cd76976468c89.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/46047/4/22735/91958/649ce5f4Fd1d233ab/ddec7cb786e0e741.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/158169/17/40780/97124/64eed4deF7790438c/5db3c6961a66d436.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/144038/18/39260/120700/64eed4deFd4f80ee2/968c4d4e4e38d25d.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/96220/11/39958/53364/64eed4dfFf65105b7/640ffd69f7405ed0.jpg"
        ]
      },
      {
        "product_name": "HKC 23.8英寸2K高清180Hz高刷FastIPS电竞屏130%sRGB广色域HDR400旋转升降电脑显示器 猎鹰二代G24H2",
        "product_price": "7622.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "HKC"
        ],
        "product_sales": "47511",
        "product_shop": "HKC京东自营旗舰店",
        "product_stock": "2249",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/163530/15/46640/147881/6659c879F9a65a100/bac2fea3fd31a083.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/197499/3/43324/111267/664abc13F7ac625df/4f673570c574fde7.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/229511/25/15302/143090/662a1f1aF81ebc248/a0ff85452c5393a2.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/244505/11/8646/167863/66383aaeF5ff18d0e/f6c5ada94a2bcc21.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/240508/17/6148/231747/66383ab6F9a123e23/e5c9cdc293991e52.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/175565/27/44953/182162/662a1f19F68e8c846/8867d928da2f1828.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/228369/34/16154/147479/662b283fF023a54a1/dc1554f856581671.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/216713/20/40487/186226/662a1f18F9bcfd762/0cebb7168f5ca73a.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/190415/5/44339/34339/662a1f17F06444872/defdc830b86bee3b.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/221821/17/39914/15045/662a1f16Fc2a40de5/6924a040d4301baa.jpg"
        ]
      },
      {
        "product_name": "小米 Redmi 27英寸显示器 A27 IPS技术 100Hz高刷新率 三微边设计 低蓝光爱眼 电脑办公显示器显示屏",
        "product_price": "3911.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "92110",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "17193",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/198685/37/42112/54201/6655bc9dF38eaaf3f/d103dfe07ca50103.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/220701/34/27425/56251/646b6d59F1ac9a659/b138fa202c7360fe.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/98897/6/38252/53201/646b6d59Faabc3f5e/4256002538b6bf1d.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/218293/10/29167/52446/646b6d69Ff7b15b7f/f53541ae712ace5a.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/61383/18/26364/40160/646b6d69F8857e594/218c03a53c8a568e.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/166263/25/32982/41082/646b6d69Faaefffa7/90931f89d82a8a64.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/107753/38/23676/54957/646b6d69F8245c575/fd90f9db93bdc94a.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/124503/26/36656/45373/646b6d69F4fc42bf8/6471d63ade2ddedb.jpg"
        ]
      },
      {
        "product_name": "小米Redmi 27英寸显示器4K超清 100%sRGB HDR400 Type-C反向充电 升降旋转支架电脑办公显示器显示屏",
        "product_price": "2819.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "90211",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "63722",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/237352/7/17314/68526/66568ce4F8977b533/1a45ceab2980ecba.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/205936/3/23469/133763/629477deEf3c56188/fefb5265c758dade.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/147425/18/27055/108427/629477deE69d60a3b/d43d8131e0382dc6.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/159160/33/23006/110608/629477dfEfe386bcf/beee6363788cc930.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/150221/19/26062/143664/629477dfE4a10abe2/5eb68a4501f20c10.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/56883/32/18680/147272/629477deEb1b1ef96/0a602ff19bde6085.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/86708/3/25842/140813/629477deE0106ecb0/c47de16f1b45d05e.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/106171/30/29732/108435/629477dfE45b27165/f57873fff00a1f42.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/123071/20/32814/43518/636b2861E7177bf5c/cc58de9818e102e6.jpg"
        ]
      },
      {
        "product_name": "小米Redmi 27英寸2K显示器 A27Q 2025款 IPS技术 100Hz 低蓝光爱眼 广色域电脑办公显示器",
        "product_price": "8990.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "58375",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "90040",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/225817/26/18399/65802/665dbaf6F84043b49/eb5a8a2fcd98a0fe.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/187946/35/44685/102260/6645d623Ffdf2365b/a4ac925038576d5e.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/247443/26/9088/47127/6645d622F3daeae4f/1427af07db3f15d5.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/198391/2/35783/51200/6645d622F44d5a725/1028c56c22817d4b.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/157265/13/45979/49904/6645d621F520ce9e4/9ff47749fc41b052.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/165710/1/43344/36999/6645d621Fecd01d9a/c48a5c2d80703f63.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/231302/23/18377/87992/6645d60dFd7dcb15f/002f62c65d4c2b9a.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/229755/2/16468/50872/6645d60dF9c35a295/859166f1b8e81556.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/168106/1/44610/38186/6645d642Fb6571958/9214e1ea1e31fba9.jpg"
        ]
      },
      {
        "product_name": "灵蛇 电竞显示器高清输出办公笔记本外接扩展显示屏 星空黑24英寸1080P 100hz",
        "product_price": "5616.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "灵蛇"
        ],
        "product_sales": "13990",
        "product_shop": "灵蛇显示器旗舰店",
        "product_stock": "4968",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/jfs/t1/164853/28/38792/110223/64c60d51F1e08466e/9797d994dd1589bf.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/131785/22/38210/141509/64c089c7F7d48dd02/cc700cd82a3fbd42.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/92076/28/42695/116644/64c089d4F15e971fb/908f7965bcd860a4.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/201639/39/32298/67117/64c08a0dFa51d1bdb/a3af9baff189548b.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/101124/12/42151/119539/64c60d5aF37704454/ed5d7e95a9236c3a.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/94886/27/25936/51565/6311a1d8Ea76eb714/2745a627d045fd71.jpg"
        ]
      },
      {
        "product_name": "晶瑞特 17-32英寸超清显示器HDMI高清直面曲面台式电脑监控器游戏电竞高刷商务设计办公家用壁挂 17英寸 显示器 VGA+HDMI双接口",
        "product_price": "8999.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "晶瑞特"
        ],
        "product_sales": "14568",
        "product_shop": "晶瑞特旗舰店",
        "product_stock": "97468",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/jfs/t1/212758/23/23759/98440/6375ec9eE4090a23e/bceae57634a073dc.png",
          "https://img14.360buyimg.com/n5/jfs/t1/211158/26/28496/130557/6378ddacE6172f0ae/9c13b589ddb87d2f.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/184304/17/29022/84683/6378d083E439c3aac/aeb01094f30e69b9.png",
          "https://img14.360buyimg.com/n5/jfs/t1/20983/34/19141/149110/6378d3b2E45f8eb01/4f59a7383403f4d1.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/214644/22/23480/129245/6378d40fE33301e41/f15c3eda96c20577.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/145421/7/32244/68850/6378de83E442457af/7fae211232d794c1.png",
          "https://img14.360buyimg.com/n5/jfs/t1/58280/22/22043/111212/6378d4adE729b02a9/74ae603b7a09b884.png",
          "https://img14.360buyimg.com/n5/jfs/t1/68351/3/23450/128601/6378d5c7Ebce69a9c/91077f767f71ec63.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/196941/16/29763/112644/6378d6a1Ed9a8862b/195ecb3213a34a3a.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/126507/28/26684/127289/6378d6c1E8e9ade76/fe88d6d84fe18a68.jpg"
        ]
      },
      {
        "product_name": "小米Redmi 21.45英寸显示器A22 75Hz 8Bit色深 全高清微边框广视角低蓝光 电脑办公显示器显示屏 红米",
        "product_price": "7862.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "87210",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "98098",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/217005/10/41172/50802/6655bc2fFbfdef68a/fc6b8536d5cf8925.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/158407/28/34239/29342/6443fb0cFeb040a24/0a5aee193662d4fa.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/163113/33/36469/7581/6443fb0cF6daedb33/0a3429e2e71e73ae.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/216543/19/28711/28877/6443fb0cF1f5a4559/e16e683a0401b0ae.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/214144/3/29234/53018/6443fb17F7c054c5a/ee688b0c5d585795.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/200380/27/33233/81427/6443fb17Ffa50ba85/4085834996b14fb7.jpg"
        ]
      },
      {
        "product_name": "小米Redmi显示器X24A 23.8英寸 液晶办公家用学习游戏电脑屏幕 1080P高清低蓝光显示屏幕 超薄显示器",
        "product_price": "19914.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米"
        ],
        "product_sales": "28263",
        "product_shop": "小米稍息专卖店",
        "product_stock": "27174",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/jfs/t1/195132/10/46725/434127/66592a0cF6b66eda3/fda1088f4b5301d9.png",
          "https://img11.360buyimg.com/n5/jfs/t1/187558/23/42876/55497/6600f106F494e3e69/df99cec8304ef9c5.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/158945/29/40852/42842/65da9888Fbf4d6928/73f4812a89df60be.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/233229/9/12620/36725/65da9888Fad488c23/b49c9278b47ec85f.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/176039/15/38889/33250/65da9959F29942088/ac6111063d3eb3ee.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/24147/1/17890/19412/65da9887F956758d4/eff4d0d12cb52a9c.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/208925/12/39566/29821/66022eaaF5d2ddbf6/d5423d87f3b17a75.jpg"
        ]
      },
      {
        "product_name": "AOC CQ27G2 27英寸2K高清电竞曲面显示器台式电脑吃鸡游戏小金刚1MS响应旋转升降快速液晶显示屏幕 CQ27G2 2K曲面144HZ 1500R曲率",
        "product_price": "7105.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "14991",
        "product_shop": "AOC电竞旗舰店",
        "product_stock": "8364",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/jfs/t1/237060/24/17339/111444/664c56aeFd22c1353/d88ed78579192da1.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/83292/8/20334/117810/62abefe1E4c61ecb5/cd31467ff32844f9.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/152986/8/17510/257035/6016121fEa2da6e9d/20cb28b7c41c7c35.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/161525/25/5036/360317/60161220E5d476057/55cab5e1edbec794.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/164980/22/4740/407121/60161220E36f6eda5/b56fe67900510bb6.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/158912/23/4833/344959/60161221Ed5b314d7/2f131b308f8f91f6.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/150522/8/17091/149827/60161222Eba3157eb/8ce6edacca9eef45.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/155079/9/16463/76713/60161221E64899106/2ace9b94f624f1b8.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/154475/6/16502/35716/60161221Ee8728443/0c1308a4dbae9432.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/157766/39/20346/72907/607d2514E376d385f/a7aba15826406be9.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）玄龙骑士新款2K/180Hz刷新IPS屏升降旋转电脑电竞游戏显示器 S27DG504EC",
        "product_price": "19670.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "81862",
        "product_shop": "三星显示器旗舰店",
        "product_stock": "22721",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/jfs/t1/106724/20/26354/115725/665d96d2F82ff34d2/df21398094ec197a.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/224110/28/16158/75079/66134795F7ad47e5e/383e828442e0e4c4.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/232424/20/14895/102846/6613475fF256a9da4/e8e59edc33b329e4.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/189028/16/32145/126250/66134761F88f1aa0b/d530514dc6302135.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/188493/17/43893/134521/66134762Fcf2a649c/2ea6119d11924968.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/231917/7/15875/116904/66134764F1f499325/c1a63d793c854fa6.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/239961/32/6708/108287/661347abFd69fb29f/4c99ee1bfb9cd71d.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/165113/32/43133/65592/661347acFcebcd2fc/65a450ad81485f55.jpg",
          "https://img12.360buyimg.com/n5/jfs/t1/179887/38/39459/123586/6613ba96F0d26a690/722b053771b18cd1.jpg"
        ]
      },
      {
        "product_name": "联想（Lenovo）小新24.5英寸 IPS 100Hz 硬件低蓝光 护眼认证 HDMI 窄边框 手机支架 壁挂电脑办公显示器小新25",
        "product_price": "2875.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "联想（Lenovo）"
        ],
        "product_sales": "75543",
        "product_shop": "联想京东自营旗舰店",
        "product_stock": "39685",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/238269/34/16860/108001/665ec521F31157553/c28c68867ea6f717.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/108442/37/47410/35730/652e25a4F55478d1d/a7f73e8a6d0c7542.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/224063/35/430/52971/652e25a4F9a1a862f/ddf72eac5e92ca0a.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/179205/16/40456/58076/652e25a4F4e8c5385/18d745c60d53ef5f.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/108969/3/38662/94167/652e25a4Ff8bb647a/968932a823e17894.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/97145/21/46822/65574/652e25a4F3436a734/dcbf0f37dd534acf.jpg"
        ]
      },
      {
        "product_name": "AOC 27英寸 2K高清 100Hz IPS广色域 低蓝光不闪 三边微边 超薄机身 节能办公电脑显示器 Q27B2S2",
        "product_price": "9182.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "17797",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "77388",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/168755/32/43923/73527/665dd553F6f98af95/367f62bbfaabb65c.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/183595/17/38045/69986/64f6eec8F2e6b8f8f/173ce50620e78f91.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/113938/38/35845/63350/647968c5F3425d142/a6a57257424d04cb.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/116539/20/35170/74421/647968c4F99df6226/7a5a8c1827188d9c.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/121568/36/35884/161674/647968c5F5fa60289/6309b5217031fbc4.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/165052/33/35638/93125/647968c5F4ccfcb3d/fbd1aa931a32b3ad.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/126560/22/33596/4778/647968c4Fc549c4b3/1795fa76a4202ca7.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/15408/23/20196/13208/647968c4F0848a062/ae76e35f9a22c101.jpg"
        ]
      },
      {
        "product_name": "LGOTLG OT显示器24英寸22寸24寸IPS屏高清4K165HZ直面曲面27寸台式电脑监控器电竞显示器 22寸1K VGA+HDMI双接口",
        "product_price": "1710.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "LGOT"
        ],
        "product_sales": "65336",
        "product_shop": "LGOT电脑办公旗舰店",
        "product_stock": "76609",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/jfs/t1/173607/40/38047/84676/662ce676Fe5cf8778/4631245f67cea82e.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/109650/30/45399/21066/65097d15F2b067434/916115f011d8b5fc.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/191113/26/38613/85744/65097d15F7c3e63a4/9146a6b7dd3b1c39.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/196243/20/37595/104524/65097d14Fb161d792/84c8108b5ba1de9b.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/115527/24/42442/110200/65097d14F33614135/79c9825e729f43cd.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/195919/39/36455/50780/65097d14Faf7a38af/10899601e872354e.jpg"
        ]
      },
      {
        "product_name": "联想（Lenovo）小新显示器 IPS屏 100Hz刷新 硬件低蓝光 窄边框 全高清电脑显示屏 白色 联想小新24英寸显示器（两个HDMI接口）",
        "product_price": "4639.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "联想"
        ],
        "product_sales": "35825",
        "product_shop": "联想Lecoo显示器旗舰店",
        "product_stock": "92893",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/239730/8/10819/149900/665d5d89Fe43e4997/f2da05416bdd9c5c.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/237401/7/6693/73845/6573db0eF161d5e32/571269d84256b71b.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/234625/7/7022/90655/6573db0fF9b8ead75/dd12e51e3a8429f8.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/234452/35/7070/82343/6573db0eFd9232c09/ed8b41c25351fd45.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/150380/5/33438/123535/6573db0eF1c429a3b/163191ae98d461c0.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/236125/18/7028/77836/6573db0dFa7965484/a5c7d6816ef16ae4.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/224673/16/7243/59280/6573db0dFe86d3f81/ce15adb29c760e5a.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/231859/7/6608/59029/6573db0cF0e41a91e/567d1c0693868857.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/114903/29/32094/35929/6573db0cFb68045ef/97673305c17f25c2.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/232911/35/6726/44672/6573db0fF5b510380/1174c593515d08ff.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）27英寸 IPS FHD FreeSync 75Hz  窄边框 爱眼  电脑 办公 显示器 27T352/27C312 新老款随机发货",
        "product_price": "17143.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "78242",
        "product_shop": "三星显示器京东自营旗舰店",
        "product_stock": "93120",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/186514/19/45643/72038/66581a50F36950c07/8132a72c0c0194d4.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/196530/5/23624/114153/63eefaa0F6c1955cb/4bb682253fa4257b.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/103775/29/36652/110525/63eee9a2Fb3447ec4/7f5ba5793b0ff4b5.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/146730/6/34638/102738/63eee9a2Fc0f4bea2/6f1e4b00e6c6794c.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/145011/6/31466/61574/63eee9a2F9bcc727c/099f5ac72ce17131.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/219271/15/25795/85366/63eee9a2Fd34360c2/734a1934e0815bd5.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/126320/5/29070/41560/63eee9c4F23d5911a/552e4de0cd3744f8.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/100279/13/35413/57798/63eee9cfF58e2770e/4199027384d937e8.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/1198/24/17924/27070/63eee9c4F353d7e0c/05bc88472c8016d1.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/78988/36/16963/419578/613b16c8Eb71eb63e/7aa926cf5ceea8ca.jpg"
        ]
      },
      {
        "product_name": "AOC 31.5英寸 4K 广色域 HDR10 低蓝光不闪 三边微边金属底座 出厂校准 节能办公电脑显示器 U32V5N",
        "product_price": "19174.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "38516",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "44711",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/223826/28/34387/125514/665dd54dF9c7502c4/684c2004a27d735d.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/225262/32/16466/160800/661f973fF04082716/c8859c4623d84c41.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/244555/19/4969/41073/65dda997Fb1e90e7a/e957c9a4fda03ada.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/162907/33/36332/55528/65dda990F545ebc2b/86499c92f06f4e3a.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/242118/23/5046/238714/65dda991F97b472e2/393e42d22f0312a2.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/219133/8/37103/60014/65dda991Fc74b9588/4c7923bacd2bdf22.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）4K144HZ高刷新率  HDMI2.1 电竞游戏显示器 IPS技术面板 屏幕 S28BG700EC",
        "product_price": "478.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "8579",
        "product_shop": "三星显示器旗舰店",
        "product_stock": "6169",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/jfs/t1/166973/21/46743/141729/665d95a4F8616d6aa/4659b077c5d7b8ef.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/193660/12/38004/110960/6513a39dFfb6c8b44/2d5678d3c5e59c7c.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/125726/3/34477/125607/63f48961Fbdc16b30/1083b613a68e80dc.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/55584/15/21969/66609/63f48961F53312856/f362c021ede04953.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/138298/2/27918/47025/63fef2b0Fca9dc190/ceccb8427a454868.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/210402/3/29761/102228/63f48961Fc37cdec3/7351baa0e3221f39.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/220163/38/22818/52907/63f48961Fd95ceb5b/1e0a1a4ac7003520.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/148449/40/29776/120059/63f48962F23737c91/ac174b632b81a834.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/160027/36/34760/91559/63f48962Fb23566c6/c431c4dd35a63185.jpg",
          "https://img13.360buyimg.com/n5/jfs/t1/191807/40/31685/128324/63f48962F719525c9/8c9c5690a08e36c0.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）27英寸 165Hz G5 2K 1000R 曲面 1ms HDR FreeSync 低蓝光 玄龙骑士 电竞 显示器 LS27CG552ECXXF",
        "product_price": "4725.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "70976",
        "product_shop": "三星显示器京东自营旗舰店",
        "product_stock": "22310",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/178801/27/46373/142711/66582acbFe9e0d14a/d108087668007c5c.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/233645/32/12162/138149/65a0a8f3F9ab5727f/b638dc7a6add8ff4.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/230768/2/12098/104899/65a0a8f2Fb9d468b8/62f4935bbf890495.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/224664/17/10996/60934/65a0a8f2F77c4c6dc/237103f45ee4aa54.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/245951/7/3054/88722/65a0a8f3Fdc88ad28/93c7e83e731005b5.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/225395/35/3880/99221/65a0a8f2Fd3e8d1d6/b8ec92dadf68eb99.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/34734/27/16452/55310/65a0a8f5F7db04c3f/ec02bfd660f9d6f1.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/227761/18/12009/48754/65a0a8f4F45f3823d/02da45c1b9eb10e2.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/248522/11/2889/39757/65a0a8f4F5ac9906a/46a8a6867f87729e.jpg"
        ]
      },
      {
        "product_name": "AOC 21.5英寸 VA广视角 75Hz HDR Mode  HDMI接口 低蓝光爱眼 快拆支架 办公液晶电脑显示器 22B2HN",
        "product_price": "3868.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "61712",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "26267",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/202858/39/34738/93005/665dd55eF2027d367/c3993052c9135d54.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/188175/3/587/380327/608a73b8Eca00308f/54432563a9070f27.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/198328/34/6358/471173/6131df3fEe3e8f649/cdebca58195ba772.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/181887/16/1506/308755/608a73a7Ef828151b/79d52008a6cf3a3c.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/180671/23/1489/103354/608a73a1Ebbe33356/e0df4f3dd5a3981e.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/176126/16/7005/27899/608a73a1E66f1fa56/cfa870d99fb9c026.jpg"
        ]
      },
      {
        "product_name": "AOC 27英寸2K高清180HZ电竞显示器1ms响应HDR吃鸡游戏旋转升降满血小金刚Fast IPS屏台式电脑显示屏幕 Q27G3S 2K原生180HZ HDR400",
        "product_price": "5707.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "80970",
        "product_shop": "AOC电竞旗舰店",
        "product_stock": "48482",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/229914/10/15946/111060/66498a86F5469a6a6/c6adc95842678594.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/110238/9/45670/118829/65e13cffF9b7f3232/b3437f36248ea2a6.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/51246/5/24732/108589/652123d9F5697c7fc/cd9e0ca78ccf57d6.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/101348/22/38808/113462/65e13d80F06e8e064/f199f697cd7527be.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/141624/6/40144/94464/652123d9F794e295b/84de8dd171e87625.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/84792/39/45847/19119/65212413F74b9e027/6f1a3e3a448017c7.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/106409/31/32645/18641/63637da0E94b8c163/062ea3fbc70f2582.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/111306/26/29771/8720/63637d9fEedadc233/df7b7596752f9c5f.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/194534/10/29326/49762/63637da9E365e81f4/779495e9b0306f19.jpg"
        ]
      },
      {
        "product_name": "小米Redmi 27英寸2K显示器 A27Q旋转升降支架 IPS技术 Type-C反向充电 低蓝光爱眼 电脑办公显示器",
        "product_price": "14934.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "14977",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "63278",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/233557/4/17410/52208/6655bd04Fc6c74e48/fc62e6d19498cda3.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/108395/11/39697/30593/64744a8dF500e0f3f/6dc2b0b05ead4e94.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/206990/10/35604/44748/64744a8dFfe994911/e7b64862697d8841.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/196783/18/35389/40389/64744a8dF2675fb1f/76896a6c5101453d.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/130072/6/35968/33559/64744a8eFf3221df2/d0550030c3e4d115.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/198761/20/34803/23619/64744a8eFf852ebfd/a9968c77c81c5d58.jpg"
        ]
      },
      {
        "product_name": "AOC 23.8英寸 FastIPS 原生180Hz 1ms HDR 93%P3色域 每台校色 游戏电竞电脑显示器 宙斯盾系列24G4",
        "product_price": "6888.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "88599",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "70611",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/249773/40/10152/92396/665dd55dFefbb3c59/434fbe9ec17b98dd.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/229758/37/14162/101929/65fb8d9eF27a50eb1/43dcb119804ec76f.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/222081/10/37450/66191/65220da7F943c8718/2615e002bb86155b.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/193856/27/38933/61716/65220da7Fd160dc67/a0659b1da22d884e.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/111802/19/44042/122188/65220da7F03920c42/69544b59cb7d9bdd.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/182655/10/39790/126693/65220da8F3fa024e8/3f0d73714a7f1f10.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/110887/14/42386/126120/65220da8F28c70ead/2e06e0ebf03d6279.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/206680/7/34616/7362/65220da7Fa32f1cf2/034cf33b486a41a1.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/222196/35/29207/34741/65220da7F1c0a3081/1273f92eb01988ab.jpg"
        ]
      },
      {
        "product_name": "AOC 27英寸 FastIPS 原生180Hz 1ms HDR 95%P3色域 每台校色 升降 电竞电脑显示器 宙斯盾系列 27G4",
        "product_price": "6029.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "30809",
        "product_shop": "AOC京东自营旗舰店",
        "product_stock": "47923",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/230330/19/19627/96682/665dd55aFb3a35746/f4748b73afb96b36.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/158835/6/42544/99988/65fbabcfF5c2ef0de/492a92753717c9c8.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/174213/7/39792/60830/65221093Fe09dce51/45f1bcd6f77933b3.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/110322/16/45636/66191/65221092F39ef2ea7/14c9d8add708a5cb.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/126439/35/38965/122188/65221092F6277283f/d5b5354d503bf8c2.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/100284/20/46149/126636/65221093Fbede83c6/dee00a26b5f35fc0.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/6038/10/30960/126120/65221094Fa4474b0e/b88e7850ef60cf9c.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/111402/40/42078/7362/65221092F9a0a305b/70e9e1dc9ae32b9f.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/106286/26/46688/34741/65221092F15c31330/9a830ea7084ac2b1.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）23.8英寸 IPS FHD FreeSync 75Hz 窄边框爱眼 电脑 办公 显示器 24T352/24C312 新老款随机发货",
        "product_price": "4213.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "44746",
        "product_shop": "三星显示器京东自营旗舰店",
        "product_stock": "72919",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/205777/40/43646/72186/66581a04F0f009c18/43f945f2914d173c.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/160815/20/35009/114310/63eee9e9Fdbca08cd/a207f1502efc0d5f.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/103775/29/36652/110525/63eee9a2Fb3447ec4/7f5ba5793b0ff4b5.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/146730/6/34638/102738/63eee9a2Fc0f4bea2/6f1e4b00e6c6794c.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/145011/6/31466/61574/63eee9a2F9bcc727c/099f5ac72ce17131.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/219271/15/25795/85366/63eee9a2Fd34360c2/734a1934e0815bd5.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/126320/5/29070/41560/63eee9c4F23d5911a/552e4de0cd3744f8.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/100279/13/35413/57798/63eee9cfF58e2770e/4199027384d937e8.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/1198/24/17924/27070/63eee9c4F353d7e0c/05bc88472c8016d1.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/180001/8/21334/419578/6128aceeE899890fc/f0a66f16e697f78a.jpg"
        ]
      },
      {
        "product_name": "华硕ROG XG27UCS绝神 27英寸显示器4K电竞显示器4K144Hz超频160Hz HDR400 Type-C旋转升降G-SYNC",
        "product_price": "12604.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "华硕（ASUS）"
        ],
        "product_sales": "31801",
        "product_shop": "华硕京东自营旗舰店",
        "product_stock": "18494",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/163284/11/46717/122038/66595a14F5f992ec2/61ed5b8b67e388d8.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/233658/32/16865/110881/6650bb4aF5fdceffc/1d58f5c9c8ae7560.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/221912/28/40116/153482/66067483Fb9f50243/a3ec28c55874c854.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/177906/4/45586/98644/66166563F8dc21042/ee13348ec1c36d0d.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/104491/15/48994/117422/66166562F420f2729/c111ea28bed9a448.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/224499/2/15007/181360/66067482F204c562f/0058abe509245228.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/186147/26/44153/148365/66166561Fa1a02337/9d04d878651477d5.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/148264/25/42880/141312/66067481Fb73c4edc/3014e00797ce1e7c.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/134128/23/42557/95733/66067480F7fc8051c/93c3dd55b9b058e7.jpg",
          "https://img14.360buyimg.com/n5/s54x54_jfs/t1/88022/26/40520/79677/6606747fFd4a43f2d/caa3b6b1875ddda1.jpg"
        ]
      },
      {
        "product_name": "小米显示器Redmi A27Q 2025款2K超清屏 100Hz高刷新率 IPS 游戏办公高清低蓝光青山护眼红米显示屏 27英寸/2K高清/IPS技术",
        "product_price": "11376.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "65566",
        "product_shop": "小米官方旗舰店",
        "product_stock": "72839",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/228847/32/19807/148450/665d8d74Fc593764e/5be1023b1a2c4d33.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/235066/15/17255/97866/6629b9cdF36035d4d/87703dcb37de1406.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/237970/2/15610/60328/6629b9d6Fa96cce4b/12aa96373426c005.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/209500/14/23808/58620/6629b9d6F9c530d4d/cf31732d5cdd5d68.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/150131/10/43862/51177/6629b9ceFb03fca2c/e8d3276e6880dc44.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/186103/27/43009/52608/6629b9ceF7f694c26/3be31e82007939b3.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/181379/33/44120/49075/6629b9ceFe48b9c27/fc3d4f0011bca465.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/203350/22/44553/40076/6629b9cdF5ecea65d/d308b0b7f5af3e1e.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/158734/31/43395/32145/6629b9d6Fb28c2b4b/de10f068bc91a6a6.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/222637/28/40544/33787/6629b9d8F9d6a8d99/51b83d6c132c90cb.jpg"
        ]
      },
      {
        "product_name": "小米Redmi 23.8英寸显示器Pro IPS技术 100%sRGB 300nit 低蓝光智能调光 旋转升降支架 电脑办公显示器",
        "product_price": "2051.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "小米（MI）"
        ],
        "product_sales": "58750",
        "product_shop": "小米京东自营旗舰店",
        "product_stock": "62717",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/196969/6/36192/49732/6655bb98Fca22543b/508273236537313c.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/67610/10/18825/212554/62946fb1Ec3e66bfe/282f13ac48cfc5d2.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/194674/11/25495/379367/62946fb1Ebb3b1ae7/bf68105170e3f675.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/26552/35/16865/236331/62946fb1E534e0778/30e4ad6f8809a84d.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/213142/34/19209/426257/62946fb1E2a9f0dee/d1640e994bca63e4.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/104084/35/22580/145636/62946fb1E485d84d0/49714571790da98e.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/54054/40/19281/138260/62946fb1Ef2a49548/4b140a6cf054ebb0.jpg",
          "https://img10.360buyimg.com/n5/s54x54_jfs/t1/49229/32/18589/329423/62946ffcE1bcf87c8/93c0fc395bccfaff.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）24英寸 IPS FreeSync 100Hz DP接口 支持壁挂 显示器 LS24C330GACXXF和LS24C334GACXXF随机发货",
        "product_price": "17176.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "32071",
        "product_shop": "三星显示器京东自营旗舰店",
        "product_stock": "36019",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/192798/32/45761/68933/66581abdFea6ffede/594518b82f22c8bd.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/244128/4/3614/102792/65aa237bF9a0ae5c2/6c20041e7c107184.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/241052/2/2848/93065/65aa237bF39136901/9df4ac3b6403492d.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/236578/40/11737/92807/65aa237aF128b0287/58b6fbe1611bc1dd.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/229096/24/12548/33395/65aa237aFbaaf2730/90f98e3081a346da.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/232522/30/12536/37134/65aa2379Ff0ca4b89/12f15e4bc8587f04.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/122589/5/36106/15331/65aa237cF10fa55b3/ae31fde81d9ec330.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/95486/31/43571/17361/65aa237cFcc041780/d583d511869f51ca.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/177333/10/41865/29996/65aa237bF46bda05b/68abdefc344de9bb.jpg"
        ]
      },
      {
        "product_name": "熊猫（PANDA）27英寸2K原生180Hz Fast IPS屏 1ms快速响应 137%sRGB 10bit色深 电竞游戏电脑高刷显示器M27Q6",
        "product_price": "18385.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "熊猫（PANDA）"
        ],
        "product_sales": "75476",
        "product_shop": "熊猫（PANDA)显示器京东自营旗舰店",
        "product_stock": "10280",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/220048/31/41301/121605/665d8e3dF3b0adb99/979dca622ee7f2e1.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/136705/26/43705/68073/65eeb353F801c2fcc/87b600d35c7f59b0.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/228819/28/14858/124703/65f163f0Fcbaf9af7/37fa160897740e2f.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/238136/7/13674/273453/65eead96F6dc83683/cfecc1b6cd670e37.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/167179/22/43630/102008/661dce1fF583ab3a2/19c85514d9f3c16e.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/92082/5/48141/107302/65eead94Fa971501e/e3c5a8719979e706.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/199800/37/40690/33985/65eead95F66a567fe/b1448920cf312a4a.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/101191/39/48805/51255/65eead95F49154e85/223f5b41183ae752.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/172013/35/37206/50389/66065bdbFdbe29452/1fe76d9a7184f17c.png"
        ]
      },
      {
        "product_name": "联想显示器电脑显示屏19.5/21.5/24.5/27英寸异能者系列微边框高清办公游戏设计监控显示屏幕 【19.5英寸】双显示接口/可壁挂 商务办公采购",
        "product_price": "18653.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "联想（Lenovo）"
        ],
        "product_sales": "24989",
        "product_shop": "联想优多特专卖店",
        "product_stock": "64436",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/246716/34/10281/71137/665e80cbF4e5b48a5/9a4504457dc10a7e.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/196224/15/44554/66192/662b62feFbf0b5391/81f5104ee5ed0239.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/219602/11/40245/38210/6628a8eaF0d9306a2/1a6582c7168fc175.png",
          "https://img10.360buyimg.com/n5/jfs/t1/110746/11/42116/50859/6628a8f7Ff193be3d/139b92cb865f0b4a.png",
          "https://img10.360buyimg.com/n5/jfs/t1/231509/8/17597/25058/6628ac1bF9ca61a9a/8dc5a0ca4efc40d6.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/148323/11/39253/34151/66236477F39ea12a9/ec0bc40964689e80.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/200666/36/43173/48766/66236478Fc8bb6bf2/ff07d8a1898671c7.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/98722/35/43262/57972/66236478Fec042d92/19f0c96434f75df0.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/223152/17/39507/61815/66236478F3c6e55e6/a677cb7506fe4f38.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/157193/34/40824/65410/6625cffbF37bd8fbc/1f4bf1078f303504.jpg"
        ]
      },
      {
        "product_name": "AOC 23.8英寸180Hz电竞显示器Fast IPS屏宙斯盾小钢炮1ms响应HDR10台式电脑吃鸡游戏外接笔记本显示屏 【新】180HZ 电竞款 24G15N",
        "product_price": "8292.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "AOC"
        ],
        "product_sales": "17590",
        "product_shop": "AOC电竞旗舰店",
        "product_stock": "27595",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/jfs/t1/150835/15/26823/101702/66554e4aF758462c5/13cec094743f3f3c.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/97650/7/41821/87118/64e99aa2Fee1549aa/0d002b9d2508d499.png",
          "https://img14.360buyimg.com/n5/jfs/t1/143256/6/38475/133254/64e99ab9F5f6904ac/95d425286df72b5d.png",
          "https://img14.360buyimg.com/n5/jfs/t1/106650/19/43520/164906/64e99ac2F309709df/a29b9851777176ce.png",
          "https://img14.360buyimg.com/n5/jfs/t1/217386/20/29643/119175/64e99a7fFecf7544c/9d8bce0074c8690d.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/151666/2/30519/128473/64e99a7eFe8e7c94b/82b11783a05aa09b.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/132070/26/37906/12070/64e99a7eFf2377303/db355741ec4f5203.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/99211/1/43040/13014/64e99a7eFdc26166a/b8df1898cec4e1eb.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/198534/36/39418/10683/64e99a7eF9d2efcb4/bfaa92bcbf12fbd9.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/138964/37/39837/44064/64e99a7fFce6ea59b/4b568d3ba5fa838b.jpg"
        ]
      },
      {
        "product_name": "华硕战杀VG27AQML1A 27英寸显示器2K 240Hz显示器电竞FastIPS超频260Hz G-sync兼容1msGTG响应HDR400",
        "product_price": "9246.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "华硕（ASUS）"
        ],
        "product_sales": "19128",
        "product_shop": "华硕京东自营旗舰店",
        "product_stock": "48615",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/187744/14/46805/112441/6659565dF4f445bc7/46ea7d1210e1d8a3.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/237974/2/96/87563/6530a581Fffec3f6c/5d38a9ed49650c0c.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/227903/29/11127/115384/65953d43Fac0d9a40/a2f254949182e83a.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/169516/14/41783/71620/6530a736Fe53d8ec9/a7c2ece660092238.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/246425/10/9784/78307/6650bd69Fb43e1f00/a1978352f327497f.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/221486/30/40278/57966/6650bd69F80536dbc/0543bb3a612dbe00.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/234309/29/18698/104277/6650bd69F83770401/98f4807844bc9b47.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/165914/4/18753/77926/6650bd68Fc9d068c1/667a32cb531789fa.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/246135/14/9609/72173/6650bd68Fcf043ca3/cc5567cc3c7d28ad.jpg",
          "https://img11.360buyimg.com/n5/s54x54_jfs/t1/166866/39/46703/78120/6650bd67F782480bf/4c5fe0bee9baf567.jpg"
        ]
      },
      {
        "product_name": "创维23.8英寸 180Hz 1ms 快速液晶 FastIPS 360nit高亮 HDR10 硬件低蓝光 广色域 电竞显示器F24G30F",
        "product_price": "19505.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "创维（Skyworth）"
        ],
        "product_sales": "17343",
        "product_shop": "创维京东自营官方旗舰店",
        "product_stock": "60446",
        "carousel_images": [
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/199139/36/44215/115871/66593879Fd40bd031/acbbf5b2a3a19030.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/187736/36/43321/129002/660aac32F7fff74c0/739208eb85eb596f.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/221706/33/40808/153204/66435a65Fcb705f80/01623aacb204ea97.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/183166/27/42628/264038/6617bd08Fc0376a4e/83c64a0b4e4a4ae4.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/101227/5/42081/84481/660aac30F013f5e34/0bbbc87fdb624e6b.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/133345/31/42436/109089/6617bd09Fb6a12977/7d7e63b68c6ecc15.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/165542/10/43782/112330/660aac2eF741b256d/303b19a9cc4ab232.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/216798/3/35964/97748/660aac2bF3df50a93/3718c65cb8ac0ef8.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/148551/7/42970/119491/660aac29F455f1003/441ea3ba4495a469.jpg",
          "https://img12.360buyimg.com/n5/s54x54_jfs/t1/94296/12/42016/128301/660aac34Fa20ff65e/b0d4c337034712ad.jpg"
        ]
      },
      {
        "product_name": "联想 23.8/27英寸显示器 2K IPS屏 HDR技术 Type-C65w接口 旋转升降 家用办公 电脑显示屏幕 23.8英寸 75Hz M2412HL",
        "product_price": "5978.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "联想"
        ],
        "product_sales": "37472",
        "product_shop": "联想Lecoo显示器旗舰店",
        "product_stock": "30557",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/235758/37/18938/142021/665dff7dF06f25afd/0a6a2168277a85e0.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/88173/21/32404/115508/63439fc4E7fd18e23/efc314e4393fb2af.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/191352/39/28054/194329/63439fc4E43bbd0af/babcd0284ffca7c7.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/208520/14/26399/90324/63439fc4Ecfed6abe/f72a4c054f772213.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/137348/39/29343/96343/63439fc4E84825725/434eb6fb21123432.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/1903/2/19791/39038/63439fc4Eb50ecc6e/61ae30026f9b199d.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/21141/16/19511/120104/63439fc4E8f6fbf3e/9660de140bd59c6e.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG） 玄龙骑士G3 165Hz 电竞游戏显示器 升降旋转 低蓝光不闪屏 电脑屏幕 S27AG322NC 直面",
        "product_price": "11152.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "44914",
        "product_shop": "三星显示器旗舰店",
        "product_stock": "20399",
        "carousel_images": [
          "https://img14.360buyimg.com/n5/jfs/t1/166201/18/43119/184853/665ed2d2F2dac8dac/46b487144078e6d2.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/226158/26/10969/86816/659387b2Fca6329d8/82de80bfdad0daf2.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/230714/27/9738/321122/658d1ac4F96f0922b/45fa58e62326604e.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/242114/35/1344/391972/658d1ac3Fcd339c6b/fbd3a1e5fc0ea07e.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/232966/21/9314/79019/658d1ac3Fde322f90/8cb8923c33d5961e.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/90605/39/43885/39381/65b76ab8F9a94adef/f35bb34f613f3ce0.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/246288/39/485/109146/658d1ac2F2d158cdf/b5a378473e635e61.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/229387/38/5039/239058/65697d28F3be9aeac/cb19ef937960d1e1.jpg",
          "https://img14.360buyimg.com/n5/jfs/t1/225925/12/9999/134341/658d1ac2F1a2d7359/c6086495adc4d67c.jpg"
        ]
      },
      {
        "product_name": "VAVG微极 27英寸 4K165Hz HVA快速液晶 1msGTG HDMI2.1 HDR600认证 分区背光 游戏电脑显示器 G27UV",
        "product_price": "15443.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "VAVG"
        ],
        "product_sales": "43365",
        "product_shop": "VAVG京东自营旗舰店",
        "product_stock": "57320",
        "carousel_images": [
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/242744/12/9756/91871/6659ce53Fdfd31d79/4a04253ed0a9d031.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/201889/37/38854/75812/653a4143F74301e0e/d7b04b784e606202.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/195983/15/39890/114125/653a4143Fbfd2f4d6/21dcb65b8b9e4823.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/230303/11/6186/84553/656efdb4F0b567ce9/568acfae2a63699c.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/94464/7/44102/103966/653a4142F94992ef1/a0c82251246388cf.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/243229/23/2418/77595/659b5b12F6bea0b92/d9cb5f22771353f5.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/236559/36/4814/77113/65669a58Fa950975f/d2caf8efac8558f6.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/111327/36/46510/27408/656efd0eFf4b6ad4a/130a30429017dea2.jpg",
          "https://img13.360buyimg.com/n5/s54x54_jfs/t1/91305/11/30022/45887/654b3d48Ffad6be66/507a63cdb215ddd5.jpg"
        ]
      },
      {
        "product_name": "LGOTLG OT显示器24英寸22寸24寸IPS屏高清4K165HZ直面曲面27寸台式电脑监控器电竞显示器 24寸1K+直面+双接口",
        "product_price": "721.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "LGOT"
        ],
        "product_sales": "1691",
        "product_shop": "LGOT电脑办公旗舰店",
        "product_stock": "46769",
        "carousel_images": [
          "https://img10.360buyimg.com/n5/jfs/t1/242889/18/7810/84966/662ce677F13f648a1/58672f7fba0a3f65.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/109650/30/45399/21066/65097d15F2b067434/916115f011d8b5fc.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/191113/26/38613/85744/65097d15F7c3e63a4/9146a6b7dd3b1c39.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/196243/20/37595/104524/65097d14Fb161d792/84c8108b5ba1de9b.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/115527/24/42442/110200/65097d14F33614135/79c9825e729f43cd.jpg",
          "https://img10.360buyimg.com/n5/jfs/t1/195919/39/36455/50780/65097d14Faf7a38af/10899601e872354e.jpg"
        ]
      },
      {
        "product_name": "三星（SAMSUNG）电脑办公显示器高色域 丰富三接口 护眼低蓝光 家用商用影音娱乐游戏笔记本分屏显示屏 23.8英寸/IPS面板/S24C310EAC 低蓝光/微边框/全国联保",
        "product_price": "19174.00",
        "product_classification": [
          "电脑、办公",
          "电脑组件",
          "显示器",
          "三星（SAMSUNG）"
        ],
        "product_sales": "85364",
        "product_shop": "创响未来电脑旗舰店",
        "product_stock": "13871",
        "carousel_images": [
          "https://img11.360buyimg.com/n5/jfs/t1/229278/37/20813/78773/665ee87dFc1d44693/989af57238d7c5ef.png",
          "https://img11.360buyimg.com/n5/jfs/t1/183023/18/48121/96365/665e8b9dF6e4ad72e/393209c6007aa8ac.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/242374/10/7750/87101/6620e0aaFa564bf34/3ae049eabd7bc8fa.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/108617/2/49723/98780/6620e0aaFdb6376e3/11f5bd880a4bfb16.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/200356/7/42054/78286/6620e0a9F6b6c6ce2/d296fd26c3b2eb89.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/191008/1/44574/53886/6620e0a9F7efbc137/7b49df96e6b5d4dd.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/150366/34/39510/38655/6620e0a9Ffa1ec375/9e5ceda4ed5e7096.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/178201/34/44086/48409/6620e0a8F630cc5c3/f368d86c828b5a28.jpg",
          "https://img11.360buyimg.com/n5/jfs/t1/245414/11/7712/49122/6620e0adF4c847f9b/02440a560a0b6d7b.jpg"
        ]
      }
    ];
    for (let i = 0; i < phone_product.length; i++) {
      //随机生成uid
      phone_product[i].name = phone_product[i].product_name;
      phone_product[i].id = i;
      phone_product[i].seller = "seller";
      phone_product[i].classification = "手机数码";
      phone_product[i].price = parseFloat(phone_product[i].product_price);
      phone_product[i].sales = parseInt(phone_product[i].product_sales);
      phone_product[i].stock = parseInt(phone_product[i].product_stock);
      phone_product[i].imageList = []
      for (let j = 0; j < phone_product[i].carousel_images.length; j++) {
        let request = new Request(phone_product[i].carousel_images[j]);
        phone_product[i].imageList.push(await getFileBase64(request.url));
      }
      products.push(phone_product[i]);
    }
    
    
    localStorage.setItem('products', JSON.stringify(products));
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
