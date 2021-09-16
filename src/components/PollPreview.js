import React from 'react'
import { connect } from 'react-redux'
import { Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PollPreview extends React.Component {
  render() {
    const { question, users } = this.props
    const { author, id, optionOne } = question

    return (
      <div className='question'>
        <div>
        <img
          alt={`Avatar of ${users[author].name}`}
          className='avatar'
          src={users[author].avatarURL}
        />
        </div>
        <div className='question-preview'>
          <Header as='h3' color='teal'>{users[author].name} asks:</Header>
          <Header as='h4'>Would you rather...</Header>
          <p>1) {optionOne.text}</p>
          <Header as='h4' style={{height: '5px'}}>OR .....</Header><br/>
          <Button className='btn'>
            <Link
              to={{
                pathname: `/questions/${id}`,
              }}
            >
              <span style={{ color: 'black' }}>View Poll</span>
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question,
    users: users,
  }
}

export default connect(mapStateToProps)(PollPreview)