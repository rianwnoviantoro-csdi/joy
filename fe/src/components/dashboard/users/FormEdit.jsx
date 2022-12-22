import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../features/users/usersApiSlice'
import { ROLES } from '../../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^[A-z0-9@._]{4,255}$/

const FormEdit = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation()
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user.fullName)
  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState(user.email)
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [isActive, setIsActive] = useState(user.isActive)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setFullName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onFullNameChanged = (e) => setFullName(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value)
    setRoles(values)
  }

  const onIsActiveChanged = () => setIsActive((prev) => !prev)

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, fullName, username, email, password, roles, isActive })
    } else {
      await updateUser({ id: user.id, fullName, username, email, roles, isActive })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  let canSave

  if (password) {
    canSave = [roles.length, validUsername, validEmail, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername, validEmail].every(Boolean) && !isLoading
  }

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validUsernameClass = !validUsername ? 'border border-2 border-red-300 focus:outline-red-200' : 'focus:outline-slate-200'
  const validEmailClass = !validEmail ? 'border border-2 border-red-300 focus:outline-red-200' : 'focus:outline-slate-200'
  const validPasswordClass = password && !validPassword ? 'border border-2 border-red-300 focus:outline-red-200' : 'focus:outline-slate-200'
  const validRolesClass = !Boolean(roles.length) ? 'border border-2 border-red-300 focus:outline-red-200' : 'focus:outline-slate-200'

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="bg-white p-2 rounded-lg shadow" onSubmit={(e) => e.preventDefault()}>
        <div className="">
          <h2 className="text-lg font-semibold tracking-widest capitalize">Edit User {user.fullName}</h2>
          <button className="px-4 py-1 mr-1 rounded-lg bg-blue-400 text-white" onClick={onSaveUserClicked} disabled={!canSave}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button className="px-4 py-1 ml-1 rounded-lg bg-red-400 text-white" onClick={onDeleteUserClicked}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm font-semibold">
              Full name
            </label>
            <input className={`p-2 rounded-lg bg-slate-50 mt-1 text-slate-500 focus:outline-slate-200`} type="text" autoComplete="off" value={fullName} onChange={onFullNameChanged} />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm font-semibold">
              Username
            </label>
            <input className={`p-2 rounded-lg bg-slate-50 mt-1 text-slate-500 ${validUsernameClass}`} type="text" autoComplete="off" value={username} onChange={onUsernameChanged} />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm font-semibold">
              Email
            </label>
            <input className={`p-2 rounded-lg bg-slate-50 mt-1 text-slate-500 ${validEmailClass}`} type="text" autoComplete="off" value={email} onChange={onEmailChanged} />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm font-semibold">
              Password
            </label>
            <input className={`p-2 rounded-lg bg-slate-50 mt-1 text-slate-500 ${validPasswordClass}`} type="password" autoComplete="off" value={password} onChange={onPasswordChanged} />
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="" className="text-sm font-semibold">
              Active
            </label>
            <input className={`p-2 h-4 w-4 rounded-lg bg-slate-50 ml-2 text-slate-500`} type="checkbox" autoComplete="off" checked={isActive} onChange={onIsActiveChanged} />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm font-semibold">
              Role
            </label>
            <select className={`p-2 rounded-lg bg-slate-50 mt-1 text-slate-500 ${validRolesClass}`} multiple={true} value={roles} onChange={onRolesChanged}>
              {options}
            </select>
          </div>
        </div>
      </form>
    </>
  )

  return content
}

export default FormEdit
