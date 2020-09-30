import { useLocation } from 'react-router-dom'
import models from 'models'

const BASE_PATH = '/models'

export default function usePath() {
  const location = useLocation()
  const pathname = location.pathname
  const sections = pathname.replace(BASE_PATH, '').slice(1).split('/')
  const len = sections.length
  const pageType = len % 2 === 0 ? 'edit' : 'search'
  const instanceId = pageType === 'edit' ? +sections[len - 1] : null
  const modelName = pageType === 'edit' ? sections[len - 2] : sections[len - 1]

  const modelSections = sections.filter((section, idx) => idx % 2 === 0)

  let model
  let root = models
  modelSections.forEach(modelName => {
    model = root.find(model => model.name === modelName)
    root = model.children
  })

  return {
    pageType,
    pathname,
    sections,
    instanceId,
    modelName,
    modelPath: sections.join('/'),
    model,
  }
}
