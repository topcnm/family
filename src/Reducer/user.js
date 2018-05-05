import * as userAction from '../Constant/user';

const Common_Menu = [
  {
    title: '首页 HOME',      // 页面展示的汉字
    key: 'home',
    url: '/',           // 点击后的hash路劲
    children: [],       // 展示的子菜单
  },
  {
    title: '博客 BLOG',      // 页面展示的汉字
    key: 'blog',
    url: '/blog/platform',  // 点击后的hash路劲
    children: [         // 子页面归属追溯
      {
        title: '博客列表',
        key: 'blogPlatform',
        url: '/blog/platform',
      },
      {
        title: '博客详情',
        key: 'blogDetail',
        url: '/blog/detail',
      },
    ],
  },
];

const Private_Menu = [
  {
    title: '我的相册',
    key: 'myAlbum',
    url: '/blog/album'
  }
];

/**
* @usage : 存储用户信息
* @return :
* @remark :
*/
const initState = {
  ifRequesting: false,
  id: '',
  username: '',
  password: '',
  langIndex: 0,
  menu: Common_Menu,          //此处为默认菜单
};

export default function user(state = initState, action) {
  switch (action.type) {
    case userAction.UPDATE_LOGINED_USER:
      return action.data;

    case userAction.START_LOGIN:
      return Object.assign({}, state, { isRequesting: true });

    case userAction.END_LOGIN:
      return Object.assign({}, state, { isRequesting: false }, action.data);

    case userAction.RESET_REQUEST:
      return Object.assign({}, state, { isRequesting: false });

    // 增加个人菜单
    case userAction.UPDATE_PRIVATE_MENU:
      return Object.assign({}, state, { menu: Common_Menu.concat(Private_Menu) });

    case userAction.CLEAR_USER_INFO:
      return Object.assign({}, initState);

    default:
      return state;
  }
}
