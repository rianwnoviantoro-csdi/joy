import mongoose from 'mongoose'

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.APP_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.log(error.message)
  }
}

export default DBConnect
