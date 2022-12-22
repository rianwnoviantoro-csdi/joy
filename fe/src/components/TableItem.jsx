import React from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useGetUsersQuery } from '../features/users/usersApiSlice'
import { useNavigate } from 'react-router-dom'

const TableItem = ({ userId, page, limit, sort, order, index, search }) => {
  const { user } = useGetUsersQuery(
    { page, limit, search, sort, order },
    {
      selectFromResult: ({ data }) => ({
        user: data?.entities[userId]
      })
    }
  )

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)
    const userRolesString = user.roles.toString().replaceAll(',', ', ')
    const cellStatus = user.isActive ? '' : 'text-slate-300'
    return (
      <tr>
        <td className={`p-2 ${cellStatus} font-semibold`}>{index}.</td>
        <td className={`p-2 ${cellStatus} capitalize`}>{user.fullName}</td>
        <td className={`p-2 ${cellStatus}`}>{user.username}</td>
        <td className={`p-2 ${cellStatus}`}>{user.email}</td>
        <td className={`p-2 ${cellStatus}`}>{userRolesString}</td>
        <td className={`p-2 ${cellStatus}`}>
          <button className="text-amber-500 bg-amber-100 p-1 rounded-md" onClick={handleEdit}>
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        </td>
      </tr>
    )
  } else return null
}

export default TableItem
