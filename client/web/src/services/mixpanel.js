import * as mxpnl from 'mixpanel-browser'

mxpnl.init(process.env.REACT_APP_MIXPANEL_TOKEN)

const mixpanel = {
  track: (name, props) => {
    if (mxpnl.config) mxpnl.track(name, props)
  },
  time_event: (name) => {
    if (mxpnl.config) mxpnl.time_event(name)
  },
}

export default mixpanel
