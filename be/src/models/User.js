import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true, default: 'Employee' }],
    isActive: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
