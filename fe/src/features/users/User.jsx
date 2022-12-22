import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId, index }) => {
  const user = useSelector((state) => selectUserById(state, userId))
  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)
    const userRolesString = user.roles.toString().replaceAll(',', ', ')
    const cellStatus = user.isActive ? '' : 'text-slate-300'

    return (
      <tr>
        <td className={`p-2 ${cellStatus}`}>{index + 1}</td>
        <td className={`p-2 ${cellStatus}`}>{user.fullName}</td>
        <td className={`p-2 ${cellStatus}`}>{user.username}</td>
        <td className={`p-2 ${cellStatus}`}>{user.email}</td>
        <td className={`p-2 ${cellStatus}`}>{userRolesString}</td>
        <td className={`p-2 ${cellStatus}`}>
          <button className="text-amber-400" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

export default User
