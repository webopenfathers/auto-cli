// 插件作用--文字前面加小图标
import logSymbols from 'log-symbols'

export const log = {
  success: (msg: string) => {
    console.log(logSymbols.success, msg)
  },
  error: (msg: string) => {
    console.log(logSymbols.error, msg)
  },
  info: (msg: string) => {
    console.log(logSymbols.info, msg)
  },
  warn: (msg: string) => {
    console.log(logSymbols.warning, msg)
  },
}

export default log
