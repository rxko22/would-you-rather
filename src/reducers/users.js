import { ADD_QUESTION_TO_USER, RECEIVE_USERS, ADD_ANSWER_TO_USER } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
      case ADD_QUESTION_TO_USER:
        const { id, author } = action

        return {
          ...state,
          [author]: {
            ...state[author],
            questions: state[author].questions.concat(id)
          }
        }
      case ADD_ANSWER_TO_USER:
      const { auth, option, qid } = action
      
        return {
          ...state,
          [auth]: {
            ...state[auth],
            answers: {
              ...state[auth].answers,
              [qid]: option
            }
          }
        }
    default:
      return state
  }
}