import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Routes from './Routes'

class App extends React.Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
  render() {
    const { authorized } = this.props

    return (
      <Router>
        <div className='container'>
            <nav className='nav'>
              <Menu inverted fixed='top' key='teal' color='teal'>
                <Menu.Item
                  header
                  style={{
                    fontSize: 'large',
                    marginLeft: '50px',
                  }}
                >
                  Would You Rather
                </Menu.Item>
              </Menu>
            </nav>
          {authorized
            ? 
            <div>
              <Nav />
              <Routes />
            </div>
            : 
            <div>
              <Login />
            </div>
          }
        </div>
        <LoadingBar />
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authorized: authedUser != null,
    authedUser
  }
}

export default connect(mapStateToProps, {handleInitialData})(App)