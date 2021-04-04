import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useMyJurisdictions, useWipJurisdiction } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import Layout from 'components/core/Layout'
import MyJurisdictions from 'components/MyJurisdictions'
import JurisdictionDetails from 'components/JurisdictionDetails'
import EditLocation from 'components/EditLocation'

// ensure that the wipJurisdiction is loaded before any subroutes are rendered
const WipJurisdictionLoader = ({ match: { params: { jid }, path } }) => {
  const { getWipJurisdiction } = useVolunteerActions()
  const wipJurisdiction = useWipJurisdiction(jid)

  useEffect(() => {
    if (!wipJurisdiction) getWipJurisdiction(jid)
  }, [jid, wipJurisdiction, getWipJurisdiction])

  if (!wipJurisdiction) return null
  return (
    <Switch>
      <Route exact path={path} component={JurisdictionDetails} />
      <Route path={`${path}/locations/:lid`} component={EditLocation} />
    </Switch>
  )
}

const Volunteer = () => {
  const myJurisdictions = useMyJurisdictions()
  const { getMyJurisdictions } = useVolunteerActions()

  useEffect(() => {
    if (!myJurisdictions) getMyJurisdictions()
  }, [myJurisdictions, getMyJurisdictions])

  if (!myJurisdictions) return null
  return (
    <Layout>
      <Switch>
        <Route exact path="/jurisdictions" component={MyJurisdictions} />
        <Route path="/jurisdictions/:jid" component={WipJurisdictionLoader} />
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Volunteer
