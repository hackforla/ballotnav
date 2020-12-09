import { hotjar as hj } from 'react-hotjar'

const PRODUCTION_HOST = 'www.ballotnav.org'
const devId = process.env.REACT_APP_HOTJAR_ID_DEV
const prodId = process.env.REACT_APP_HOTJAR_ID_PROD
const snippetVersion = 6

const hotjar = {
  initialize: () => {
    let id;
    if (PRODUCTION_HOST.toLowerCase().search(window.location.hostname) < 0)
      id = devId
    else id = prodId

    if (id) hj.initialize(id, snippetVersion)
  }
}

export default hotjar