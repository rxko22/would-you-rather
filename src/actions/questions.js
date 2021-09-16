import { saveQuestion, saveQuestionAnswer } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addAnswerToUser, addQuestionToUser } from '../actions/users'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestionAnswer (authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return (dispatch) => {

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question))
        dispatch(hideLoading())
      })
  }
}

export function handleAddQuestionAnswer (qid, answer) {
  return (dispatch, getState) => {  
    const { authedUser } = getState()

    dispatch(showLoading())   
    saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(addQuestionAnswer(authedUser, qid, answer))
        dispatch(addAnswerToUser(authedUser, qid, answer))
        dispatch(hideLoading())
      }
    )
  }
}