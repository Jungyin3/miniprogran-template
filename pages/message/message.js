import {wxLoading} from "../../utils/toast"

Page({
  data: {

  },
  onLoad(options) {

  },
  onClick() {
    // message('我是提示文案，建议不超过十五字~');
    // wxToast({
    //   icon: 'loading',
    //   title: 'Hello'
    // })
    // wx.showToast({
    //   icon: 'loading',
    //   duration: 4000,
    //   title: '加载中'
    // })
    wxLoading()
    console.log('结束Loading');
  }
})