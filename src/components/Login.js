import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'

class Login extends React.Component {
  state = {
    selectedUser: [],
  }
  handleLogin = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const { selectedUser } = this.state

    if (selectedUser.length > 0) {
      dispatch(setAuthedUser(selectedUser[0]))
    }
  }

  handleSelectedUser = option => {
    this.setState(() => ({
      selectedUser: [option]
    }))
  }

  render() {
    const { users } = this.props
    const { selectedUser } = this.state

    return(
      <Grid textAlign='center' style={{ height: '87vh', marginTop: '50px' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as='h1'
            color='teal'
            textAlign='center'
          >
            Welcome to Would You Rather!
          </Header>
          <Header
            as='h4'
            color='grey'
            textAlign='center'
          >
            Would You Rather lets you makes choices on thoughtful and 
            unique questions. Create new questions, answer others' polls, 
            and see how your answers compare. Join the fun!
          </Header>
          <Header
            as='h3'
            color='grey'
            textAlign='center'
          >
            Let's begin by first logging in!<br/>
            Please select a user you would like to be:
          </Header>
          <Form size='large'>
            <Select
              options={Object.keys(users)}
              getOptionLabel={(option) => users[option].name}
              getOptionValue={(option) => users[option].id}
              onChange={this.handleSelectedUser}
              value={selectedUser}
            >
            </Select><br/>
            <Button
              color='teal'
              fluid size='large'
              onClick={this.handleLogin}
              disabled={this.state.selectedUser.length === 0}
            >
              Sign in
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Login)