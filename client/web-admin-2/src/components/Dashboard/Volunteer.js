import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useMyJurisdictions } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import Layout from './core/Layout'
import MyJurisdictions from './MyJurisdictions'
import JurisdictionDetails from './JurisdictionDetails'
import EditLocation from './EditLocation'

const Volunteer = () => {
  const jurisdictions = useMyJurisdictions()
  const { getMyJurisdictions } = useVolunteerActions()

  useEffect(() => {
    if (!jurisdictions) getMyJurisdictions()
  }, [jurisdictions, getMyJurisdictions])

  return (
    <Layout>
      <Switch>
        <Route exact path="/jurisdictions" component={MyJurisdictions} />
        <Route path="/jurisdictions/:jid/locations/:lid" component={EditLocation} />
        <Route path="/jurisdictions/:jid" component={JurisdictionDetails} />
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Volunteer
