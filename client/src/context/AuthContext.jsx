import { createContext, useState, useEffect } from 'react'
import { loginRequest, registerRequest } from '../api/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])

  const signup = async user => {
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      } else {
        setErrors([error.response.data.message])
      }
    }
  }

  const signin = async user => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      } else {
        setErrors([error.response.data.message])
      }
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timerId = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => {
        clearTimeout(timerId)
      }
    }
  }, [errors])

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
