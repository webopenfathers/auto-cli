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
