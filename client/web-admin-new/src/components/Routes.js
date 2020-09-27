import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'
import { useAuth } from 'components/use-auth'

import Login from 'components/auth/Login'
import Register from 'components/auth/Register'
import Jurisdictions from 'components/volunteer/Jurisdictions'
import Jurisdiction from 'components/volunteer/Jurisdiction'
import Location from 'components/volunteer/Location'
import AdminHome from 'components/admin/AdminHome'
import Review from 'components/admin/Review'
import Header from 'components/Header'

function Auth() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to={{ pathname: '/login' }} />
    </Switch>
  )
}

function Admin() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${path}/`} component={AdminHome} />
      <Route path={`${path}/review`} component={Review} />
      <Redirect to={{ pathname: `${path}/` }} />
    </Switch>
  )
}

function Dashboard() {
  const { user } = useAuth()

  if (!user) return <Redirect to={{ pathname: '/login' }} />

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <Switch>
          <Route exact path="/" component={Jurisdiction} />
          <Route
            path="/jurisdictions/:jid/location/:lid"
            component={Location}
          />
          <Route path="/jurisdictions/:id" component={Jurisdiction} />
          {user.role === 'admin' && <Route path="/admin" component={Admin} />}
          <Redirect to={{ pathname: '/' }} />
        </Switch>
      </div>
    </>
  )
}

function Routes() {
  const { user } = useAuth()
  return <Router>{user ? <Dashboard /> : <Auth />}</Router>
}

export default Routes
