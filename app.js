// app.js
import {
  formatDate,
  formatValue,
  promisify,
  getEventBus
} from "./utils/util";
import {
  axios
} from "./utils/axios"

import {
  store
} from "./store/index"

App({
  /** 引用 */
  require: (v) => require(v),
  /** 格式化日期 */
  formatDate,
  /** 格式化值 */
  formatValue,
  /** 原生api promise化 */
  promisify,
  /** 全局事件对象 */
  event: getEventBus(),
  /** 网络请求库 */
  axios,

  onLaunch() {
    this.init()
  },

  async init() {
    // 查看缓存
    promisify(wx.checkSession)()
      .then((res) => {
        const cache = wx.getStorageSync('token');

        if (!cache) {
          return Promise.reject()
        }

        return this.getUserInfo(JSON.parse(cache))
      })
      .then((userInfo) => {
        console.log('自动登录成功', userInfo);
      })
      .catch((err) => {
        console.log('自动登录失败', err);

        return this.login()
      })
      .catch((err) => {
        console.log('手动登录失败', err);
      })
  },

  login() {
    return promisify(wx.login)()
      .then(({
        code
      }) => {
        console.log(`code: ${code}`);

        return axios({
          url: '/orgUserInfo/wxLogin',
          data: {
            code
          },
          method: 'post'
        })
      })
      .then(([err, res]) => {
        if (err) {
          return
        }

        wx.setStorage({
          key: 'token',
          data: JSON.stringify(res)
        })

        return this.getUserInfo(res)
      })
  },

  async getUserInfo(data) {
    if (data) {
      // 挂载headers
      if (!axios.defaults.header) {
        axios.defaults.header = {}
      }

      axios.defaults.header.token = data;
      // 缓存权限
      store.token = data;
    }

    // 根据token获取用户信息
    const [err, userInfo] = await axios({
      url: '/orgUserInfo/self',
      header: {
        token: data || store.token
      },
      method: 'POST'
    });

    // 错误 or 没有用户信息
    if (err || !userInfo) {
      wx.navigateTo({
        url: '/pages/realname/index'
      })

      return
    }

    store.userInfo = {
      ...userInfo
    }
  }

})
