import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useMyJurisdictions } from 'store/selectors'
import useWipActions from 'store/actions/wip'
import Layout from 'components/core/Layout'
import MyJurisdictions from 'components/volunteer/MyJurisdictions'
import JurisdictionEditor from 'components/JurisdictionEditor'

const Volunteer = () => {
  const myJurisdictions = useMyJurisdictions()
  const { getMyJurisdictions } = useWipActions()

  useEffect(() => {
    if (!myJurisdictions) getMyJurisdictions()
  }, [myJurisdictions, getMyJurisdictions])

  if (!myJurisdictions) return null
  return (
    <Layout>
      <Switch>
        <Route exact path="/jurisdictions" component={MyJurisdictions} />
        <Route path="/jurisdictions/:jid" component={JurisdictionEditor} />
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Volunteer
