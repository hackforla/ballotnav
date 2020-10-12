import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import Layout from './Layout'

import ListJurisdictions from './ListJurisdictions'
import EditJurisdiction from './EditJurisdiction'
import ListStates from './ListStates'
import EditState from './EditState'
import Review from './Review'

function Dashboard() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'
  return (
    <Layout>
      <Switch>
        <Route exact path="/jurisdictions" component={ListJurisdictions} />
        <Route exact path="/jurisdictions/:id" component={EditJurisdiction} />
        {isAdmin && <Route exact path="/states" component={ListStates} />}
        {isAdmin && <Route exact path="/states/:id" component={EditState} />}
        {isAdmin && <Route exact path="/review" component={Review} />}
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Dashboard
