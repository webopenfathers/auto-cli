import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'
import { update } from './command/update'

// 指令的名称 zbw
const program = new Command('zbw')
program.version(version, '-v,--version')

program
  .command('update')
  .description('更新脚手架 zbw-cli')
  .action(async (dirName) => {
    await update()
  })

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    await create(dirName)
  })

program.parse()
