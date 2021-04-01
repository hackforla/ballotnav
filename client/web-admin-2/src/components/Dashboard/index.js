import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from 'store/selectors'
import Layout from './core/Layout'
import MyJurisdictions from './MyJurisdictions'
import JurisdictionDetails from './JurisdictionDetails'

const Dashboard = () => {
  const { user } = useAuth()

  switch (user.role) {

    case 'volunteer':
      return (
        <Layout>
          <Switch>
            <Route exact path="/" component={MyJurisdictions} />
            <Route path="/jurisdiction/:jid" component={JurisdictionDetails} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      )

    case 'admin':
      return (
        <Layout>
          <Switch>
            <Route exact path="/" component={() => <div>admin home</div>} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      )

    default:
      throw new Error('invalid user role')

  }
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
