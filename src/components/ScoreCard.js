import React from 'react'
import { Header } from 'semantic-ui-react'

class ScoreCard extends React.Component {
  render() {

    const { userInfo } = this.props
    const totalAnswers = Object.keys(userInfo.answers).length
    const totalCreatedQuestions = userInfo.questions.length
    const scoreCount = totalAnswers + totalCreatedQuestions

    return (
      <div className='score-card'>
        <img
          alt={`Avatar of ${userInfo.name}`}
          className='avatar'
          src={userInfo.avatarURL}
        />
        <div className='score-info'>
          <Header as='h3' color='teal'>{userInfo.name}</Header>
          <Header as='h5'>Answered Questions: {totalAnswers}</Header>
          <Header as='h5'>Questions Created: {totalCreatedQuestions}</Header>
          <Header as='h2'>Score: {scoreCount}</Header>
        </div>
      </div>
    )
  }
}

export default ScoreCard