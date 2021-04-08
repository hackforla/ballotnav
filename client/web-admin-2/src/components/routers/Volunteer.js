import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from 'components/core/Layout'
import WipEditor from 'components/WipEditor'

const Volunteer = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/jurisdictions" component={WipEditor} />
        <Redirect to="/jurisdictions" />
      </Switch>
    </Layout>
  )
}

export default Volunteer
