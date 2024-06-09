import path from 'path'
import fs from 'fs-extra'
import { input, select } from '@inquirer/prompts'
import { clone } from 'src/utils/clone'

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
