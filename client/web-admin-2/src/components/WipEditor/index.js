import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useWipList } from 'store/selectors'
import useWipActions from 'store/actions/wip'
import SelectWip from './SelectWip'
import EditWip from './EditWip'

const WipEditor = ({ match: { path } }) => {
  const wipList = useWipList()
  const { listWips } = useWipActions()

  useEffect(() => {
    if (!wipList) listWips()
  }, [wipList, listWips])

  if (!wipList) return null
  return (
    <Switch>
      <Route exact path={path} component={SelectWip} />
      <Route path={`${path}/:jid`} component={EditWip} />
      <Redirect to={path} />
    </Switch>
  )
}

export default WipEditor
