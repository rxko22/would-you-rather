import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'
import ScoreCard from './ScoreCard'
import { generateUID } from '../utils/_DATA'

class Leaderboard extends React.Component {
  render() {
    const { users } = this.props

    return (
      <div className='center container'>
        <Grid textAlign='center' style={{ height: '75vh', marginTop: '20px' }}>
          <Grid.Column style={{ maxWidth: 1000 }}>
            <Header as='h2' color='teal'>Leaderboard</Header>
            {Object.entries(users).map(([user, userInfo]) => (
              <ul key={user + generateUID()} >
                <li key={user + generateUID()} >
                  <ScoreCard userInfo={userInfo} />
                </li>
              </ul>
            ))}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({ users }, ) {
  const userScore = user => 
    Object.keys(user.answers).length + user.questions.length

  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))

  }
}

export default connect(mapStateToProps)(Leaderboard)