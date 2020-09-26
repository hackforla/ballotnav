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
import AdminHome from 'components/admin/AdminHome'
import Review from 'components/admin/Review'
import Header from 'components/Header'

function AuthRoutes({ login }) {
  return (
    <Switch>
      <Route path='/login'><Login login={login} /></Route>
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

function VolunteerRoutes({ user, logout, children }) {
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
      <Switch>
        <Route exact path="/"><Jurisdictions /></Route>
        {user.role === 'admin' && (
          <Route path="/admin"><AdminRoutes /></Route>
        )}
        <Redirect to={{ pathname: '/' }} />
      </Switch>
    </>
  )
}

function Routes({ user, logout, login }) {
  return (
    <Router>
      { user ? <VolunteerRoutes user={user} logout={logout} /> : <AuthRoutes login={login} /> }
    </Router>
  )
}

export default Routes
