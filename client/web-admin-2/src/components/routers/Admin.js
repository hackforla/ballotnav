import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from 'components/core/Layout'
import AdminDashboard from 'components/admin/AdminDashboard'
import AssignJurisdictions from 'components/admin/AssignJurisdictions'
import WipEditor from 'components/WipEditor'

const Admin = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/dashboard" component={AdminDashboard} />
        <Route path="/assign" component={AssignJurisdictions} />
        <Route path="/jurisdictions" component={WipEditor} />
        <Redirect to="/dashboard" />
      </Switch>
    </Layout>
  )
}

export default Admin
