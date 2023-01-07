import {
  axios
} from "../../utils/axios"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 上传类型
    accept: {
      type: String,
      value: 'image'
    },
    // 可删除
    deletable: {
      type: Boolean,
      value: true
    },
    // max-count
    maxCount: {
      type: Number,
      value: 1
    },
    // disabled
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // * 上传
    afterRead(event) {
      const {
        file
      } = event.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: axios.baseURL + '/upload', // 仅为示例，非真实的接口地址
        filePath: file.url,
        name: 'file',
        formData: {
          user: 'test'
        },
        success: (res) => {
          // 上传完成需要更新 fileList
          const {
            fileList = []
          } = this.data;
          fileList.push({
            ...file,
            url: res.data
          });
          this.setData({
            fileList
          });
          this.triggerEvent('uploaded', fileList);
        },
        fail: () => {
          wx.showToast({
            icon: 'error',
            title: '上传失败'
          });
        }
      });
    },
    // 删除
    delete(event) {
      const {
        index
      } = event.detail;
      const {
        fileList = []
      } = this.data;
      fileList.splice(index, 1);
      this.setData({
        fileList,
      })
      this.triggerEvent('uploaded', fileList);
    }
  }
})
