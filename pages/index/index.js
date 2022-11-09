// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: 'forzl小程序',
    date: app.formatDate(new Date(), 'YYYY-MM-DD')
  },
})
