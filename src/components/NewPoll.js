import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Form, Button } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewPoll extends React.Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleOptionOneChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }

  handleOptionTwoChange = (e) => {
    const optionTwoText  = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return(
      <div className='center'>
        <Grid textAlign='center' style={{ height: '70px', marginTop: '20px'}}>
          <Grid.Column style={{ maxWidth: 550 }}>
            <Header
              as='h2'
              color='teal'
              style={{
                marginTop: '40px',
                marginBottom: '40px',
              }}
              >
              Create a New Question
            </Header>
            <Form onSubmit={this.handleSubmit}>
              <Header as='h3'>Would you rather...</Header>
                <input
                  placeholder='Enter option one text here'
                  value={optionOneText}
                  onChange={this.handleOptionOneChange}
                />
              <Header as='h3' style={{ margin: '20px'}}>OR</Header>
                <input
                  placeholder='Enter option two text here'
                  value={optionTwoText}
                  onChange={this.handleOptionTwoChange}
                />
              <Button
                className='button'
                type='submit'
                disabled={optionOneText === '' || optionTwoText === ''}
                onClick={this.handleSubmit}
                style={{ marginTop: '20px' }}
              >
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewPoll)