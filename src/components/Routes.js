import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import PollPost from './PollPost'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Error from './Error'

class Routes extends React.Component {
  render() {
    return(
      <Fragment>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/add' component={NewPoll} />
          <Route path='/questions/:id' component={PollPost} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/logout' compoent={Login} />
          <Route component={Error} />
        </Switch>
      </Fragment>
    )
  }
}

export default Routes