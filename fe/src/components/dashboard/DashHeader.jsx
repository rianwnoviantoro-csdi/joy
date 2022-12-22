import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
  return (
    <>
      <header className="h-16 px-4 bg-white shadow-sm flex items-center justify-between">
        <div>
          <Link className="text-slate-800 font-bold text-xl" to="/dash">
            Joy
          </Link>
        </div>
        <nav className="text-slate-800">{/* nav menu */}</nav>
      </header>
    </>
  )
}

export default DashHeader
