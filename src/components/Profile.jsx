import React from 'react'
import { getMe } from '../api-adapter'
const Profile = (props) => {
    const username = props.loggedInUser.username

console.log(props)



  return (
    <div>{props.loggedInUser.username}</div>
  )
}

export default Profile