import React, { useEffect, useState } from 'react'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { ROLES } from '../config/roles'
import InputComp from '../components/InputComp'
import SelectComp from '../components/SelectComp'
import { useAddNewUserMutation } from '../features/users/usersApiSlice'
import { useNavigate } from 'react-router-dom'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^[A-z0-9@._]{4,255}$/

const AddUser = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)
  const [roles, setRoles] = useState(['Employee'])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidConfirmPassword(PWD_REGEX.test(confirmPassword))
  }, [confirmPassword])

  useEffect(() => {
    if (isSuccess) {
      setFullName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  const onFullNameChanged = (e) => setFullName(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    )
    setRoles(values)
  }

  const canSave = [roles.length, validUsername, validEmail, validPassword].every(Boolean) && validPassword === validConfirmPassword && !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ fullName, username, email, password, roles })
    }
  }

  const onCancelCLicked = () => {
    setFullName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setRoles([])
    navigate('/dash/users')
  }

  const roleOptions = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validUsernameClass = username && !validUsername ? 'border-2 border-red-300 focus:border-red-200' : ''
  const validEmailClass = email && !validEmail ? 'border-2 border-red-300 focus:border-red-200' : ''
  const validPasswordClass = password && !validPassword ? 'border-2 border-red-300 focus:border-red-200' : ''
  const validConfirmPasswordClass = confirmPassword && !validConfirmPassword ? 'border-2 border-red-300 focus:border-red-200' : ''
  const validRolesClass = !Boolean(roles.length) ? 'border-2 border-red-300 focus:border-red-200' : ''

  return (
    <>
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <UserGroupIcon className="h-5 w-5 text-indigo-500" />
          </div>
          <h1 className="ml-2 text-xl font-semibold tracking-widest text-slate-700">User List - New</h1>
        </div>
      </div>
      <div className="bg-white mt-2 rounded-lg shadow-sm">
        <form className="mt-2" onSubmit={onSaveUserClicked}>
          <div className="grid grid-cols-6 gap-2 p-2">
            <label htmlFor="fullName" className="font-semibold">
              Full name
            </label>
            <div className="col-span-5">
              <input
                onChange={onFullNameChanged}
                id="fullName"
                name="fullName"
                type="text"
                className={`px-4 py-2 w-full bg-slate-50 rounded-md focus:outline-none`}
                placeholder="Full name"
                value={fullName}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-2 pb-2">
            <InputComp handler={onUsernameChanged} customClass={validUsernameClass} name={'username'} label={'Username'} value={username} />
            <InputComp handler={onEmailChanged} customClass={validEmailClass} name={'email'} label={'Email'} type={'email'} value={email} />
            <InputComp handler={onPasswordChanged} customClass={validPasswordClass} name={'password'} label={'Password'} type={'password'} value={password} />
            <InputComp handler={onConfirmPasswordChanged} customClass={validConfirmPasswordClass} name={'confirmPassword'} label={'Confirm password'} type={'password'} value={confirmPassword} />
            <SelectComp handler={onRolesChanged} customClass={validRolesClass} name={'roles'} label={'Roles'} multiple={true} options={roleOptions} value={roles} />
            <div></div>
          </div>
          <div className="bg-slate-50 p-2 flex items-center justify-end rounded-b-lg">
            <button className="border-2 border-green-500 rounded-md font-semibold text-green-500 tracking-wider px-4 py-1" disabled={!canSave}>
              Save
            </button>
            <button onClick={onCancelCLicked} className="border-2 border-red-500 rounded-md font-semibold text-red-500 tracking-wider px-4 py-1 ml-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddUser
