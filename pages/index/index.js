// 获取应用实例
const app = getApp();
const { axios } = app.require('/utils/axios');

const { store } = app.require('/store/index');

Page({
  data: {
    msg: 'forzl小程序',
    date: app.formatDate(new Date(), 'YYYY-MM-DD')
  },
  onLoad () {
    // console.log(store, 'store');
    axios({
      url: '/newsInfo/voPage',
      method: 'POST',
      data: {
        page: 1,
        size: 9999,
      }
    })

    // console.log(err, '错误信息');

    setTimeout(() => {
      store.token = '666'
    }, 3000)
  }
})
