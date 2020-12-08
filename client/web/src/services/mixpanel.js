import * as mxpnl from 'mixpanel-browser'

const PRODUCTION_HOST = 'www.ballotnav.org'
const devToken = process.env.REACT_APP_MIXPANEL_TOKEN_DEV
const prodToken = process.env.REACT_APP_MIXPANEL_TOKEN_PROD

// initialize with dev token for hostname other than PRODUCTION_HOST
if (PRODUCTION_HOST.toLowerCase().search(window.location.hostname) < 0) mxpnl.init(devToken)
else mxpnl.init(prodToken)

const mixpanel = {
  track: (name, props) => {
    if (mxpnl.config.token) {
      mxpnl.track(name, props);
    }
  },
  time_event: name => {
    if (mxpnl.config.token) {
      mxpnl.time_event(name);
    }
  },
}

export default mixpanel
