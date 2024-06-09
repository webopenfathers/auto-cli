import simpleGit, { SimpleGitOptions } from 'simple-git'
const createLogger = require('progress-estimator')
import chalk from 'chalk'

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  },
})

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

    console.log(chalk.green('\n代码下载成功'))
    console.log(chalk.blueBright('\n====================================='))
    console.log(chalk.blueBright('\n====== 欢迎使用 zbw-cli 脚手架 ======'))
    console.log(chalk.blueBright('\n====================================='))
    console.log(
      chalk.blackBright('\n==== 请进入项目目录执行 pnpm install 安装依赖 ====')
    )
    console.log(
      chalk.blackBright('\n======== pnpm run dev 启动项目 ==========')
    )
  } catch (error) {
    console.error(chalk.red('\n代码下载失败'))
    console.log(error)
  }
}
