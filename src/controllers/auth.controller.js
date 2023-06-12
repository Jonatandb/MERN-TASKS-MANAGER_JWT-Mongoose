import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../utils/jwt.js'

export const register = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      password: passwordHash,
      email,
    })
    const userSaved = await newUser.save()

    const token = await createAccessToken({ id: userSaved.id })
    res.cookie('token', token)
    //res.json({ token }) // Alternatively
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    })
  } catch (error) {
    res.sendStatus(500).json({ message: error.message })
  }
}

export const login = (req, res) => {
  res.send('login')
}
