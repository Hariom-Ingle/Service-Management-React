import React from 'react'
import { useAuth } from '../store/auth'

function Profile() {

    const user =useAuth()

    console.log("profile user.",user.user)

  return (
    <div>

        <div className='bg-gray-500'>
            

        </div>
    </div>
  )
}

export default Profile
