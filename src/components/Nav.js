import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { unsetAuthedUser } from '../actions/authedUser'

class Nav extends React.Component {
  toggleLogin = (e) => {
    const { authedUser, dispatch } = this.props
    if (authedUser != null ) {
      dispatch(unsetAuthedUser())
    }
  }
  render() {
    const { authedUser, users } = this.props
    const name = users[authedUser].name
    return(
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
            <Menu.Item>
              <NavLink to='/'>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to='/add'>
                New Question
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to='/leaderboard'>
                Leaderboard
              </NavLink>
            </Menu.Item>
            <Menu.Item
              position='right'
              style={{ marginRight: '50px' }}
            >
              <span style={{ marginRight: '50px' }}>Hello {name}!</span>
              <NavLink
                to='/'
                onClick={this.toggleLogin}
                style={{ fontWeight: 'normal' }}
              >
                Logout
              </NavLink>
            </Menu.Item>
        </Menu>
      </nav>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)