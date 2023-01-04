// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 居中Title
    title: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backHome() {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})
