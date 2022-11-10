import dayjs from "dayjs"

/** 格式化值 */
export function formatValue (v) {
  if (v === null || typeof v === 'undefined') {
    return '--'
  }

  if (typeof v === 'string' && !v) {
    return '--'
  }

  if (typeof v === 'number' && Number.isNaN(v)) {
    return '--'
  }

  return v
}

/** 格式化日期 */
export function formatDate (v, type = 'YYYY-MM-DD HH:mm:ss') {
  if (!v) {
    return formatValue()
  }

  const m = dayjs(v)

  if (!m.isValid()) {
    return formatValue()
  }

  return m.format(type || 'YYYY-MM-DD HH:mm:ss')
}

/** 普通方法Promise化 */
export function promisify (original) {
  return function (options) {
    return new Promise((resolve, reject) => {
      options = Object.assign({
        success: resolve,
        fail: reject
      }, options)

      original(options)
    })
  }
}

/** 获取一个事件总线 */
export function getEventBus () {
  return {
    handlers: {},

    /** 监听 */
    on (type, handler) {
      if (!this.handlers[type]) {
        this.handlers[type] = []
      }

      this.handlers[type].push(handler)
    },

    /** 触发 */
    emit (type, ...args) {
      if (this.handlers[type]) {
        this.handlers[type].forEach(v => {
          v(...args)
        })
      }
    },

    /** 卸载监听 */
    off (type) {
      if (this.handlers[type]) {
        this.handlers[type] = []
      }
    }
  }
}

/** 解析地址 */
export function parseSrc (src) {
  if (!src) {
    return undefined
  }

  if (src.startsWith('http')) {
    return src
  }

  if (src.startsWith('/') && src.length > 40) {
    return `data:image/jpeg;base64,${src}`
  }

  if (src.startsWith(',/') && src.length > 40) {
    return `data:image/jpeg;base64${src}`
  }

  return src
}