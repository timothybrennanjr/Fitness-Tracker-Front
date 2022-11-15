import React from 'react'
import { getMe } from '../api-adapter'
const Profile = (props) => {
    const username = props.loggedInUser.username
    const id = props.loggedInUser.id


  return (
    <div>
      {props.loggedInUser.username}
      {props.loggedInUser.id}
      </div>
  )
}

export default Profile