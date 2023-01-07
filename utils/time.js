// * 时间格式化
import dayjs from "dayjs";

export function format(date, type = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(type);
}
