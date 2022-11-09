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
