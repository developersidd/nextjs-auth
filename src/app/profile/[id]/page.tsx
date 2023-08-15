import React from 'react'

const userProfile = ({params: {id}}: {params: {id: string}}) => {
  return (
    <div className="bg-white h-screen">user Profile : <span> {id} </span></div>
  )
}

export default userProfile