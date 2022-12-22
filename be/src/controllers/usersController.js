import bcrypt from 'bcrypt'
import Logging from '../library/logging.js'
import UserModel from '../models/User.js'

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const { limit = 10, page = 1, search = '', sortBy = 'createdAt', order = 'ASC' } = req.query
  try {
    const filter = { $or: [{ fullName: { $regex: '.*' + search + '.*' } }, { username: { $regex: '.*' + search + '.*' } }, { email: { $regex: '.*' + search + '.*' } }] }
    const offset = (page - 1) * limit
    const usersCount = await UserModel.find(filter).count().lean()
    const totalPage = Math.ceil(parseInt(usersCount) / parseInt(limit))
    const nextPage = parseInt(page) === totalPage ? null : parseInt(page) + 1
    const prevPage = parseInt(page) !== 1 ? parseInt(page) - 1 : null

    let sorting = {}
    sorting[sortBy] = order

    const users = await UserModel.find(filter).select('-password').limit(limit).skip(offset).sort(sorting).lean()

    if (!users?.length) {
      return res.status(400).json({ message: 'No users found.' })
    }

    res.json({
      message: 'Success.',
      countData: usersCount,
      perPage: parseInt(limit),
      currentCountData: users.length,
      data: users,
      totalPage: totalPage,
      currentPage: parseInt(page),
      nextPage: nextPage,
      prevPage: prevPage
    })
    // res.json(users)
  } catch (err) {
    Logging.error(err)

    res.status(400).json({ message: 'Bad request.' })
  }
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { fullName, username, email, password, roles } = req.body

  try {
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const duplicate = await UserModel.findOne({ username }).lean().exec()

    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate username.' })
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { fullName, username, email, password: hashedPwd, roles }

    const user = await UserModel.create(userObject)

    if (user) {
      res.status(201).json({ message: `New user ${username} created.` })
    } else {
      res.status(400).json({ message: 'Invalid user data received.' })
    }
  } catch (err) {
    Logging.error(err)

    res.status(400).json({ message: 'Bad request.' })
  }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, fullName, username, email, roles, isActive, password } = req.body

  console.log(req.body)

  try {
    if (!id || !fullName || !username || !email || !Array.isArray(roles) || !roles.length || typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'All fields except password are required.' })
    }

    const user = await UserModel.findById(id).exec()

    if (!user) {
      return res.status(400).json({ message: 'User not found.' })
    }

    const duplicate = await UserModel.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: 'Duplicate username.' })
    }

    user.fullName = fullName
    user.username = username
    user.email = email
    user.roles = roles
    user.isActive = isActive

    if (password) {
      user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated.` })
  } catch (err) {
    Logging.error(err)

    res.status(400).json({ message: 'Bad request.' })
  }
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body

  try {
    if (!id) {
      return res.status(400).json({ message: 'User ID Required.' })
    }

    const user = await UserModel.findById(id).exec()

    if (!user) {
      return res.status(400).json({ message: 'User not found.' })
    }

    const result = await UserModel.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted.`

    res.json(reply)
  } catch (err) {
    Logging.error(err)

    res.status(400).json({ message: 'Bad request.' })
  }
}

export default {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}
