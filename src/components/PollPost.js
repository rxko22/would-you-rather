import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header } from 'semantic-ui-react'
import { handleAddQuestionAnswer } from '../actions/questions'
import PollResults from './PollResults'
import Error from './Error'

class PollPost extends React.Component {
  state = {
    vote: false,
    selectedOption: '',
  }
  handleChange = (e) => {
    this.setState(() => ({
      selectedOption: e.target.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, id } = this.props
    const { selectedOption } = this.state

    dispatch(handleAddQuestionAnswer(id, selectedOption))

    this.setState(() => ({
      vote: true
    }))
  }

  render() {  
    const {
      question,
      id,
      author,
      authedUserAnswers,
      questionExists
    } = this.props

    if (questionExists) {
      const { optionOne, optionTwo } = question
      const { vote, selectedOption } = this.state

      if ((question.id in authedUserAnswers) || vote) {
        return (
          <PollResults id={id} choice={vote? selectedOption : authedUserAnswers[question.id]} />
        )
      }

      return (
        <div className='pollpost-container'>
          <Header as='h2' color='teal' style={{ marginBottom: '30px' }}>Vote!</Header>
          <div className='question'>
            <div>
              <img
                alt={`Avatar of ${author.name}`}
                className='avatar'
                src={author.avatarURL}
              />
            </div>
            <div className='question-preview'>
              <Form>
                <Header as='h3' color='teal'>{author.name} asks:</Header>
                <Header as='h4'>Would you rather...</Header>
                <input type='radio' name='vote' value='optionOne' onChange={this.handleChange} />
                <label>{optionOne.text}</label><br></br>
                <Header as='h5'>OR</Header>
                <input type='radio' name='vote' value='optionTwo' onChange={this.handleChange}/>
                <label>{optionTwo.text}</label><br></br><br></br>
                <Button
                  className='btn'
                  onClick={this.handleSubmit}
                  disabled={this.state.selectedOption.length === 0}
                >
                  Vote!
                </Button>
              </Form>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Error />
      )
    }
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const questionExists = question? true : false
  const author = (users && questionExists)? users[question.author] : null
  const authedUserAnswers = users[authedUser].answers

  return {
    users,
    authedUser,
    questions,
    question: question,
    author,
    id,
    authedUserAnswers,
    questionExists,
  }

}

export default connect(mapStateToProps)(PollPost)