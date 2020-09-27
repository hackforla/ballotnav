import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import Login from 'components/auth/Login'
import Register from 'components/auth/Register'
import Jurisdictions from 'components/volunteer/Jurisdictions'
import Jurisdiction from 'components/volunteer/Jurisdiction'
import Location from 'components/volunteer/Location'
import AdminHome from 'components/admin/AdminHome'
import Review from 'components/admin/Review'
import Header from 'components/Header'
import { useAuth } from 'components/use-auth'

function AuthRoutes() {
  return (
    <Switch>
      <Route path='/login'><Login /></Route>
      <Route path='/register'><Register /></Route>
      <Redirect to={{ pathname: '/login' }} />
    </Switch>
  )
}

function AdminRoutes() {
  const { path, url } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${path}/`}><AdminHome /></Route>
      <Route path={`${path}/review`}><Review /></Route>
      <Redirect to={{ pathname: `${path}/` }} />
    </Switch>
  )
}

function VolunteerRoutes() {
  const { user, logout } = useAuth()
  console.log('user:', user)
  if (!user)
    return (
      <Redirect
        to={{ pathname: "/login" }}
      />
    )

  return (
    <>
      <Header user={user} logout={logout} />
      <div style={{ padding: 20 }}>
        <Switch>
          <Route exact path="/"><Jurisdictions /></Route>
          <Route path="/jurisdictions/:jid/location/:lid" component={Location} />
          <Route path="/jurisdictions/:id" component={Jurisdiction} />

          {user.role === 'admin' && (
            <Route path="/admin"><AdminRoutes /></Route>
          )}
          <Redirect to={{ pathname: '/' }} />
        </Switch>
      </div>
    </>
  )
}

function Routes() {
  const { user } = useAuth()
  return (
    <Router>
      { user ? <VolunteerRoutes /> : <AuthRoutes /> }
    </Router>
  )
}


export default Routes
