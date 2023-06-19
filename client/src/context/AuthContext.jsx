import { createContext, useState, useEffect } from 'react'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth'
import Cookie from 'js-cookie'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

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

  const logout = () => {
    Cookie.remove('token')
    setUser(null)
    setIsAuthenticated(false)
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

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookie.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const res = await verifyTokenRequest()
        setLoading(false)
        if (!res.data) {
          setIsAuthenticated(false)
          setUser(null)
        } else {
          setUser(res.data)
          setIsAuthenticated(true)
        }
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
