// components/picker/picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // * 禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 数据
    columns: {
      type: Array,
      value: []
    },
    // range-key
    key: {
      type: String,
      value: 'id'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      const { value } = e.detail;
      this.triggerEvent('confirm', this.properties.columns[value])
    },
    cancel() {
      this.triggerEvent('cancel')
    }
  }
})
