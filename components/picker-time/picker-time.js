Component({
  properties: {
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
