import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from 'store/selectors'
import Layout from './Layout'

const Dashboard = () => {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'
  return (
    <Layout>
      <Switch>
        {!isAdmin && <Route exact path="/" component={() => <div>main</div>} />}
        {!isAdmin && <Redirect to="/" />}
      </Switch>
    </Layout>
  )
}

export default Dashboard

// {!isAdmin && <Route exact path="/jurisdictions" component={ListAssignedJurisdictions} />}
// {!isAdmin && <Route exact path="/jurisdictions/:jurisdictionId" component={EditJurisVolunteer} />}
// {!isAdmin && <Redirect to="/jurisdictions" />}
//
// {isAdmin && <Route exact path="/states" component={ListStates} />}
// {isAdmin && <Route exact path="/states/:id" component={EditState} />}
// {isAdmin && <Route exact path="/review/:wipJurisdictionId" component={EditJurisAdmin} />}
// {isAdmin && <Route exact path="/review" component={ListReleasedJurisdictions} />}
// {isAdmin && <Route exact path="/assign" component={AssignJurisdictions} />}
// {isAdmin && <Redirect to="/review" />}
