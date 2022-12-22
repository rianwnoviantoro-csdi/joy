import React from 'react'
import { useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import FormEdit from '../components/dashboard/users/FormEdit'
import { useGetUsersQuery } from '../features/users/usersApiSlice'

const EditUser = ({ page, limit, search }) => {
  const { id } = useParams()

  const { user } = useGetUsersQuery(
    { page, limit, search },
    {
      selectFromResult: ({ data }) => ({
        user: data?.entities[id]
      })
    }
  )

  if (!user) return <PulseLoader color={'#FFF'} />

  const content = <FormEdit user={user} />

  return content
}

export default EditUser
