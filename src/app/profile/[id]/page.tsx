import React from 'react'

const userProfile = ({params: {id}}: {params: {id: string}}) => {
  return (
    <div>user Profile : <span> {id} </span></div>
  )
}

export default userProfile