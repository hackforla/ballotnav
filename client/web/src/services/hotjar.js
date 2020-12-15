import { hotjar as hj } from 'react-hotjar'

const SNIPPET_VERSION = 6

const hotjar = {
  initialize: () => {
    const id = process.env.REACT_APP_HOTJAR_ID
    if (id) hj.initialize(id, SNIPPET_VERSION)
  },
}

export default hotjar
