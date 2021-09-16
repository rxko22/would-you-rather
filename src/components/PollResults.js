import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import ProgressBar from './ProgressBar'

class PollResults extends React.Component {
  render() {
    const { question, author, choice } = this.props
    const { optionOne, optionTwo } = question
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const optionOnePerc = ((question.optionOne.votes.length / totalVotes) * 100).toFixed(1)
    const optionTwoPerc = ((question.optionTwo.votes.length / totalVotes) * 100).toFixed(1)

    return(
      <div className='pollresults-container'>
        <Header as='h2' color='teal' style={{ marginBottom: '40px' }}>Poll Results</Header>
        <div className='question'>
          <div>
            <img
              alt={`Avatar of ${author.name}`}
              className='avatar'
              src={author.avatarURL}
            />
          </div>
          <div className='question-preview'>
            <Header as='h3' color='teal'>{author.name} asks:</Header>
            <Header as='h4'>Would you rather...</Header>
            <div className='results-container'>
              {choice === 'optionOne' &&
              <Header as='h4' color='red'>Your Choice: </Header>}
              <label className='results-label'>{optionOne.text}</label>
              <ProgressBar bgColor='#90ee90' completed={optionOnePerc} />
              <p className='results-text'>{optionOne.votes.length} out of {totalVotes}</p>
              
            </div>
            <Header as='h4'>OR</Header>
            <div className='results-container'>
              {choice === 'optionTwo' && 
                <Header as='h4' color='red'>Your Choice: </Header>}
              <label className='results-label'>{optionTwo.text}</label>
              <ProgressBar bgColor='#FFC0CB' completed={optionTwoPerc}/>
              <p className='results-text'>{optionTwo.votes.length} out of {totalVotes}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users}, props) {
  const question = questions[props.id]
  const author = users[question.author]

  return {
    authedUser,
    question,
    author,
  }
}

export default connect(mapStateToProps)(PollResults)