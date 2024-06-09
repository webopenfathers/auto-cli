import path from 'path'
import fs from 'fs-extra'
import { gt } from 'lodash'
import chalk from 'chalk'
import { input, select } from '@inquirer/prompts'
import { clone } from 'src/utils/clone'
import { name, version } from '../../package.json'
import axios from 'axios'

export interface TemplateInfo {
  name: string // 模板名名称
  downloadUrl: string // 模板下载地址
  description: string // 模板描述
  branch: string // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    'Vite-Vue3-Typescript-template',
    {
      name: 'Vite-Vue3-Typescript-template',
      downloadUrl: 'https://github.com/webopenfathers/admin-pro.git',
      description: 'Vue3技术栈开发模板',
      branch: 'main',
    },
  ],
  [
    'vue3-webpack-element-admin',
    {
      name: 'vue3-webpack-element-admin',
      downloadUrl:
        'https://github.com/webopenfathers/vue3-vue-element-admin.git',
      description: '基于Vue3新标准，打造后台综合解决方案',
      branch: 'main',
    },
  ],
])

export function isOverwrite(fileName: string) {
  console.warn(`${fileName}文件夹已存在，是否覆盖？`)
  return select({
    message: '是否覆盖？',
    choices: [
      {
        name: '覆盖',
        value: true,
      },
      {
        name: '取消',
        value: false,
      },
    ],
  })
}

export const getNpmLatestVersion = async (name: string) => {
  const npmUrl = `https://registry.npmjs.org/${name}`
  try {
    const { data } = await axios.get(npmUrl)
    return data['dist-tags'].latest
  } catch (error) {
    console.error(error)
  }
}

// 检查版本更新
export const checkVersion = async (name: string, version: string) => {
  const latestVersion = await getNpmLatestVersion(name)
  const need = gt(latestVersion, version)
  if (need) {
    console.warn(
      `检测到zbw最新版本：${chalk.blackBright(
        latestVersion
      )}，当前版本是：${chalk.blackBright(version)}，请及时更新`
    )
    console.log(
      `可使用：${chalk.yellow(
        'npm install zbw-cli@latest -g'
      )}，或者使用：${chalk.yellow('zbw update')}更新`
    )
  }

  return need
}

export async function create(projectName?: string) {
  // 初始化模板列表
  const templateList = Array.from(templates).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item
      return {
        name,
        value: name,
        description: info.description,
      }
    }
  )

  if (!projectName) {
    // 获取用户输入的项目
    projectName = await input({
      message: '请输入项目名称',
    })
  }

  // 如果文件夹已经存在，则提示是覆盖
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName)
    // 覆盖 删除之前的文件夹
    if (run) {
      await fs.remove(filePath)
    } else {
      // 否  不覆盖直接结束
      return
    }
  }

  // 检查版本更新
  await checkVersion(name, version)

  const templateName = await select({
    message: '请选择模板',
    choices: templateList,
  })

  const info = templates.get(templateName)
  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch])
  }

  console.log('create', projectName)
}
