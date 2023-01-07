import Toast from "@vant/weapp/toast/toast"

// * wx.showToast
export function wxLoading(duration = 3000) {
  wx.showToast({
    icon: 'loading',
    duration,
    title: '加载中'
  })
}

export function wxError(msg, duration = 3000) {
  wx.showToast({
    icon: 'error',
    duration,
    title: msg || '错误'
  })
}

export function wxSuccess(msg, duration = 3000) {
  wx.showToast({
    icon: 'success',
    duration,
    title: msg || '成功'
  })
}

export function wxToast(msg, duration = 3000) {
  wx.showToast({
    icon: 'none',
    duration,
    title: msg || ''
  })
}

// * vant-weapp Toast 页面内需添加 <van-toast id="van-toast" />

// 相较于wx.Toast() Loding 更好看
export function vantLoding() {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 3000
  })
}
