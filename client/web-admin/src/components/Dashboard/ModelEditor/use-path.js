import { useLocation } from 'react-router-dom'

const BASE_PATH = '/models'

export default function usePath() {
  const location = useLocation()
  const pathname = location.pathname
  const sections = pathname.replace(BASE_PATH, '').slice(1).split('/')
  const len = sections.length
  const type = len % 2 === 0 ? 'edit' : 'search'
  const instanceId = type === 'edit' ? +sections[len - 1] : null
  const modelName = type === 'edit' ? sections[len - 2] : sections[len - 1]
  return {
    type,
    pathname,
    sections,
    instanceId,
    modelName,
  }
}
