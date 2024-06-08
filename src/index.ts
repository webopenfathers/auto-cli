import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'

// 指令的名称 zbw
const program = new Command('zbw')
program.version(version, '-v,--version')

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    await create(dirName)
  })

program.parse()
