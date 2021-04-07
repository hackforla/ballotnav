import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useWip } from 'store/selectors'
import useWipActions from 'store/actions/wip'
import JurisdictionDetails from './JurisdictionDetails'
import EditLocation from './EditLocation'

const EditWip = ({
  match: {
    params: { jid },
    path,
  },
}) => {
  const { getWip } = useWipActions()
  const wip = useWip(jid)

  useEffect(() => {
    if (!wip) getWip(jid)
  }, [jid, wip, getWip])

  if (!wip) return null
  return (
    <Switch>
      <Route exact path={path} component={JurisdictionDetails} />
      <Route path={`${path}/locations/:lid`} component={EditLocation} />
    </Switch>
  )
}

export default EditWip
