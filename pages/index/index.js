import {
  createStoreBindings
} from "mobx-miniprogram-bindings"
// 获取应用实例
const app = getApp();
const {
  axios
} = app.require('/utils/axios');
const {
  store
} = app.require('/store/index');
import {
  vantLoding
} from "../../utils/toast"

Page({
  data: {
    msg: 'forzl小程序',
    date: app.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: store.keys,
      actions: ['getUserProfile']
    })
    console.log(store, 'store');
    axios({
      url: '/newsInfo/voPage',
      method: 'POST',
      data: {
        page: 1,
        size: 9999,
      }
    })
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  select(e) {
    // 操作
    this.setData({
      msg: e.detail.text,
    })
  },
  cancel() {
    console.log('取消选择');
  },
  // 上传文件成功
  uploaded(filelist = []) {
    console.log(filelist);
  },
  onClick() {
    vantLoding()
  }
})
