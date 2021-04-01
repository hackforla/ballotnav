import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useMyJurisdictions } from 'store/selectors'
import { getMyJurisdictions } from 'store/actions/volunteer'
import Layout from './core/Layout'
import MyJurisdictions from './MyJurisdictions'
import JurisdictionDetails from './JurisdictionDetails'

const Volunteer = () => {
  const dispatch = useDispatch()
  const jurisdictions = useMyJurisdictions()

  useEffect(() => {
    if (!jurisdictions) dispatch(getMyJurisdictions())
  }, [dispatch, jurisdictions])

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={MyJurisdictions} />
        <Route path="/jurisdiction/:jid" component={JurisdictionDetails} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  )
}

export default Volunteer
