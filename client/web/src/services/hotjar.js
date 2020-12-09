import { hotjar as hj } from 'react-hotjar'

const PRODUCTION_HOST = 'www.ballotnav.org'
const SNIPPET_VERSION = 6

const hotjar = {
  initialize: () => {
    let id
    if (PRODUCTION_HOST.toLowerCase().search(window.location.hostname) < 0)
      id = process.env.REACT_APP_HOTJAR_ID_DEV
    else id = process.env.REACT_APP_HOTJAR_ID_PROD

    if (id) hj.initialize(id, SNIPPET_VERSION)
  },
}

export default hotjar
