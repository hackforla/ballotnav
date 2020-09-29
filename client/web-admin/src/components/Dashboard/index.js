import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import Layout from './Layout'

import UserJurisdictions from './UserJurisdictions'
import EditJurisdiction from './EditJurisdiction'
import SearchStates from './SearchStates'
import EditState from './EditState'
import ReviewWIP from './ReviewWIP'
import ModelEditor from './ModelEditor'
import model from 'models'

function Dashboard() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'
  return (
    <Layout>
      <Switch>
        <Route path="/models/state">
          <ModelEditor model={model} />
        </Route>
        <Route exact path="/jurisdictions" component={UserJurisdictions} />
        <Route exact path="/jurisdictions/:jid" component={EditJurisdiction} />
        {isAdmin && <Route exact path="/states" component={SearchStates} />}
        {isAdmin && <Route exact path="/states/:id" component={EditState} />}
        {isAdmin && <Route exact path="/review" component={ReviewWIP} />}
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Dashboard
