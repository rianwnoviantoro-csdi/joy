import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import Public from './components/Public'
import DashLayout from './components/dashboard/DashLayout'
import Welcome from './features/auth/Welcome'
import EditUser from './page/EditUser'
import UserList from './page/UserList'
import AddUser from './page/AddUser'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Start Dash routes */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<AddUser />} />
          </Route>
        </Route>
        {/* End Dash routes */}
      </Route>
    </Routes>
  )
}

export default App
