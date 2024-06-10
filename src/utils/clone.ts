import simpleGit, { SimpleGitOptions } from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'
// 作用控制台打印出较大文字
// const figlet = require('figlet')
import log from './log'

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  },
})

// const goodPrinter = async () => {
//   const data = await figlet('zbw-cli')
//   console.log(chalk.rgb(40, 156, 193).visible(data))
// }

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前工作目录
  binary: 'git',
  maxConcurrentProcesses: 6, // 最大的并发进程数
}

export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git = simpleGit(gitOptions)

  try {
    await logger(git.clone(url, projectName, options), '代码下载中...', {
      estimate: 7000, // 预计下载时间
    })
    // await goodPrinter()
    console.log(chalk.green('\n代码下载成功'))
    console.log(chalk.blueBright('\n====================================='))
    console.log(chalk.blueBright('\n====== 欢迎使用 zbw-cli 脚手架 ======'))
    console.log(chalk.blueBright('\n====================================='))
    console.log()
    log.success(`项目创建成功 ${chalk.blueBright(projectName)}`)
    log.success(`执行以下命令启动项目：`)
    log.info(`cd ${chalk.blueBright(projectName)}`)
    log.info(`${chalk.yellow('pnpm')} install`)
    log.info(`${chalk.yellow('pnpm')} run dev`)
  } catch (error) {
    log.error(chalk.red('\n代码下载失败'))
    // console.log(error)
  }
}
