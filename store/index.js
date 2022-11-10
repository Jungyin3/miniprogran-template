import { observable, reaction, action } from "mobx-miniprogram";

export const store = observable({
  /** token */
  token: null,
  /** 用户信息 */
  userInfo: {},
  /** 全局的一些功能 */
  /**
   * 推荐使用wx.getUserProfile获取用户信息
   * 开发者每次通过该接口获取用户个人信息均需用户确认
   * 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
   * 必须要手动触发 bindtap
   * api: wx.getUserProfile
   */
  canIUseGetUserProfile: Boolean(wx.getUserProfile),
  /**
   * 不用弹窗授权也能获取用户头像和昵称
   * 不过只能用于纯展示
   * 头像 <open-data type="userAvatarUrl" />
   * 昵称 <open-data type="userNickName" />
   */
  canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),

  // 计算属性
  /** 是否登录 */
  get isLogin () {
    return Boolean(this.token)
  },

  // actions
  /** 根据token获取用户信息 */
  getUserProfile: action(async function () {

  })
})

/**
 * 获取所有的keys,就不用一个一个去绑定了
 * 第一个是$mobx 需要剔除
 */
store.keys = Reflect.ownKeys(store).slice(1);

/** 有token后才允许操作 */
export function tokenReady (cb) {
  return new Promise(r => {
    reaction(
      () => store.isLogin,
      isLogin => {
        if (isLogin) {
          cb?.()

          r()
        }
      },
      {
        // 第一次运行后立即触发
        fireImmediately: true
      }
    )
  })
}