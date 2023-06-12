import User from '../models/user.model.js'

export const register = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const newUser = new User({ username, password, email })
    const userSaved = await newUser.save()
    res.send(userSaved)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const login = (req, res) => {
  res.send('login')
}