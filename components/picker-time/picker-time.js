Component({
  properties: {
    // mode 1.date 日期 2.time 时间
    mode: {
      type: String,
      value: 'time'
    },
    start: {
      type: String
    },
    end: {
      type: String
    }
  },
  methods: {
    change(e) {
      const {
        value
      } = e.detail;
      this.triggerEvent('confirm', value)
    },
    cancel() {
      this.triggerEvent('cancel')
    }
  }
})
