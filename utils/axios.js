// 网络请求
import {
  tokenReady
} from "../store/index"

/** 
 * 小程序版本
 * 
 * develop -> 开发板
 * trial -> 体验版
 * release -> 正式版
 */
const {
  miniProgram: {
    envVersion
  }
} = wx.getAccountInfoSync();

/** 根据环境配置域名 */
axios.baseURL = {
  develop: 'http://10.36.16.99:8083',
  trial: 'https://forzl.cn',
  release: 'https://forzl.cn'
} [envVersion];

axios.defaults = {};

/** 接口code */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 服务器返回code */
export const ServerCode = {
  success: 0,
  error: -1,
}

/** 服务器返回error */
export const ServerError = {
  unlogin: '401'
};

/** 不需要token的接口 */
const WHITE_URL = [
  '/orgUserInfo/wxLogin'
];

/** 还原完整URL */
export function getUrl(url) {
  // 除去多余斜杠
  if (axios.baseURL.endsWith('/') && url.startsWith('/')) {
    return `${axios.baseURL}${url.slice(1)}`
  }

  return `${axios.baseURL}${url}`
}

/** 请求函数 */
function axios({
  formatRes,
  formatQus,

  url,

  ...options
}) {
  const _url = getUrl(url)

  return new Promise(async r => {
    // 需要有token
    if (!WHITE_URL.includes(url)) {
      await tokenReady()
    }

    // 请求配置
    const config = {
      url: _url,
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      ...axios.defaults,
      ...options
    };

    if (config.method) {
      config.method = config.method.toUpperCase()
    }

    if (config.formatQus) {
      config.data = config.formatQus(config.data)
    }

    wx.request({
      ...config,
      success: (res) => {
        if (res.statusCode !== 200) {
          if (res.statusCode in codeMessage) {
            return r([codeMessage[res.statusCode], res.data])
          }

          return r([res.errMsg || '请求错误', res.data])
        }

        const {
          code,
          error,
          message,
          object,
        } = res.data || {};

        if (code !== ServerCode.success) {
          if (error === ServerError.unlogin) {
            return r([message || '登录凭证失效', object, res])
          }

          return r([message || '请求失败', object, res])
        }

        return r([, formatRes && formatRes(object, res.data) || object, res.data])
      },
      fail: (err) => {
        r([err])
      }
    })
  })
}

export {
  axios
}
