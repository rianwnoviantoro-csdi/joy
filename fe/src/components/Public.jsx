import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="font-bold text-xl text-slate-800">Welcome</h1>
        <Link to="/login">Employee Login</Link>
      </div>
    </>
  )
}

export default Public
