import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  render() {
    const { user } = this.props
    const { name, avatarURL } = user
    return(
      <div>
        <h2>User</h2>
        <img src={avatarURL} alt={`Avatar of ${name}`}/>
        <p>{name}</p>
      </div>
    )
  }
}

function mapStateToProps({users}, {id}) {
  const user = users[id]

  return {
    user
  }
}

export default connect(mapStateToProps)(User)