import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      password: passwordHash,
      email
    })
    const userSaved = await newUser.save()
    res.send({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const login = (req, res) => {
  res.send('login')
}