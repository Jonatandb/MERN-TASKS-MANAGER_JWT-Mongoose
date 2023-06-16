import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../utils/jwt.js'

export const register = async (req, res) => {
  const { username, password, email } = req.body
  try {
    const userFound = await User.findOne({ email })
    if(userFound) return res.status(400).json(['The email is already in use'])

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
    res.status(500).json([error.message])
  }
}

export const login = async (req, res) => {
  const { password, email } = req.body

  try {
    const userFound = await User.findOne({ email })
    if(!userFound) return res.status(404).json({ message: 'User not found' })

    const isMathPassword = await bcrypt.compare(password, userFound.password)
    if(!isMathPassword) return res.status(400).json({ message: 'Incorrect password' })

    const token = await createAccessToken({ id: userFound.id })

    res.cookie('token', token)
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({ message: 'User not found' })

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
}