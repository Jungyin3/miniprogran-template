Component({
  properties: {
    start: {
      type: String
    },
    end: {
      type: String
    }
  },
  // lifetimes: {
  //   attached() {
  //     console.log(format(undefined, 'YYYY-MM-DD'));
  //   }
  // },
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
