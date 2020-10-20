import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import Layout from './Layout'

import ListAssignedJurisdictions from './ListAssignedJurisdictions'
import AssignJurisdictions from './AssignJurisdictions'
import ListStates from './ListStates'
import EditState from './EditState'
import ListReleasedJurisdictions from './ListReleasedJurisdictions'
import EditJurisVolunteer from './EditJurisVolunteer'
import EditJurisAdmin from './EditJurisAdmin'

function Dashboard() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'
  return (
    <Layout>
      <Switch>
        {!isAdmin && <Route exact path="/jurisdictions" component={ListAssignedJurisdictions} />}
        {!isAdmin && <Route exact path="/jurisdictions/:jurisdictionId" component={EditJurisVolunteer} />}
        {!isAdmin && <Redirect to="/jurisdictions" />}

        {isAdmin && <Route exact path="/states" component={ListStates} />}
        {isAdmin && <Route exact path="/states/:id" component={EditState} />}
        {isAdmin && <Route exact path="/review/:wipJurisdictionId" component={EditJurisAdmin} />}
        {isAdmin && <Route exact path="/review" component={ListReleasedJurisdictions} />}
        {isAdmin && <Route exact path="/assign" component={AssignJurisdictions} />}
        {isAdmin && <Redirect to="/review" />}
      </Switch>
    </Layout>
  )
}

export default Dashboard
