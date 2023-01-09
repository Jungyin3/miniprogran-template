// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入搜索关键词'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
    isFocus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch() {
      this.triggerEvent('search', this.data.value);
    },
    onCancel() {
      this.triggerEvent('search', '');
    },
    onClick() {
      this.triggerEvent('search', this.data.value);
    },
  }
})
