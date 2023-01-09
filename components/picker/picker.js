import {
  storeBindingsBehavior
} from "mobx-miniprogram-bindings";
// 获取应用实例
import {
  store
} from "../../store/index"
Component({
  behaviors: [storeBindingsBehavior],
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
  lifetimes: {
    attached() {
      console.log(this.data);
    },
    detached() {
      this.storeBindings.destroyStoreBindings()
    }
  },
  storeBindings: {
    store,
    fileds: store.keys,
  },
  methods: {
    change(e) {
      const {
        value
      } = e.detail;
      this.triggerEvent('confirm', this.properties.columns[value])
    },
    cancel() {
      this.triggerEvent('cancel')
    }
  }
})
