import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import FilterModal from '../components/FilterModal'
import Table from '../components/TableComp'
import TableItem from '../components/TableItem'
import { useGetUsersQuery } from '../features/users/usersApiSlice'

const UserList = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState('createdAt')
  const [order, setOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(
    { page, limit, search, sort, order },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  )

  let table

  if (isError) {
    table = <Table tableHeading={['No.', 'Fullname', 'Username', 'Email', 'Role']} totalRecord={0} />
  }

  if (isSuccess) {
    const { ids } = users
    let iterate = limit * users.currentPage - limit + 1

    const tableContent =
      ids?.length && ids.map((userId, index) => <TableItem key={userId} userId={userId} page={page} limit={limit} sort={sort} order={order} index={iterate + index} search={search} />)

    const prevPageHandler = () => {
      setPage(users.prevPage)
    }

    const nextPageHandler = () => {
      setPage(users.nextPage)
    }

    table = (
      <Table
        tableHeading={['No.', 'Fullname', 'Username', 'Email', 'Role']}
        totalRecord={users.countData}
        tableContent={tableContent}
        prevPageHandler={users.prevPage ? prevPageHandler : null}
        nextPageHandler={users.nextPage ? nextPageHandler : null}
      />
    )
  }

  const modalHandler = () => {
    setShowModal(!showModal)
  }

  const sortBy = [
    { value: 'createdAt', name: 'Created at' },
    { value: 'fullName', name: 'Fullname' },
    { value: 'username', name: 'Username' },
    { value: 'email', name: 'Email' }
  ]

  const filterSubmit = (e) => {
    e.preventDefault()
    setLimit(e.target.limit.value)
    setSort(e.target.sort.value)
    setOrder(e.target.order.value)
    setShowModal(!showModal)
  }

  return (
    <>
      <FilterModal toggled={showModal} toggle={modalHandler} submitHandler={filterSubmit} sortBy={sortBy} sortValue={sort} orderValue={order} limitValue={limit} />
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <UserGroupIcon className="h-5 w-5 text-indigo-500" />
          </div>
          <h1 className="ml-2 text-xl font-semibold tracking-widest text-slate-700">User List</h1>
        </div>
        <div className="flex">
          <Link to={'/dash/users/new'} className="bg-white border-2 border-green-500 px-4 py-1 rounded-md font-semibold text-green-500 tracking-wide flex items-center">
            <UserPlusIcon className="h-5 w-5" />
            <span className="ml-2">Create New</span>
          </Link>
          <button onClick={() => setShowModal(!showModal)} className="bg-white border-2 border-indigo-500 px-4 py-1 ml-2 rounded-md font-semibold text-indigo-500 tracking-wide flex items-center">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            <span className="ml-2">Filter</span>
          </button>
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg shadow-sm mt-2">
        <input onChange={(e) => setSearch(e.target.value)} type="text" className="px-4 py-1 w-full bg-slate-50 rounded-md focus:outline-none" placeholder="Search" />
      </div>
      {table}
    </>
  )
}

export default UserList
