import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from 'components/core/Layout'

const Admin = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={() => <div>admin home</div>} />
        <Redirect to="/" />
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
