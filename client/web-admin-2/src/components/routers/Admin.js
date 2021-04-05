import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from 'components/core/Layout'
import AdminJurisdictions from 'components/AdminJurisdictions'
import AssignJurisdictions from 'components/AssignJurisdictions'

const Admin = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/jurisdictions" component={AdminJurisdictions} />
        <Route exact path="/assign" component={AssignJurisdictions} />
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Admin

// {isAdmin && <Route exact path="/states" component={ListStates} />}
// {isAdmin && <Route exact path="/states/:id" component={EditState} />}
// {isAdmin && <Route exact path="/review/:wipJurisdictionId" component={EditJurisAdmin} />}
// {isAdmin && <Route exact path="/review" component={ListReleasedJurisdictions} />}
// {isAdmin && <Route exact path="/assign" component={AssignJurisdictions} />}
// {isAdmin && <Redirect to="/review" />}
