import process from 'child_process'
import chalk from 'chalk'
import ora from 'ora'

const spinner = ora({
  text: 'zbw-cli 正在更新...',
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
      chalk.blue(item)
    ),
  },
})
export function update() {
  spinner.start()
  process.exec('npm install zbw-cli@latest -g', (error) => {
    spinner.stop()
    if (error) {
      console.log(chalk.red(error))
    } else {
      console.log(chalk.green('更新成功'))
    }
  })
}
