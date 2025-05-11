import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";

import Cookies from 'js-cookie'

const AuthContext = createContext()

//hook para importar el useContext
//para exporta automaticamente el uso de contexto
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deberia estar dentro de un AuthProvider");
  }
  return context
}

export { useAuth };

// para guardar el contexto del usuario y poder ocupar sus datos
// otras paginas
export const AuthProvide = ({ children }) => {

  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [isLoading, setLoading] = useState(true)


  const signUp = async (user) => {
    try {
      //paso 1
      const res = await registerRequest(user);
      setUser(res.data)
      //paso 2
      setIsAuthenticated(true)
    } catch (error) {
      //paso 3
      const msjDeError = error?.response?.data?.error || "Ocurrio un error inesperado"
      setErrors([{ msg: msjDeError }])
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      const msjDeError = error?.response?.data?.error || "Ocurrio un error inesperado"
      setErrors([{ msg: msjDeError }])
      console.log(error)
    }
  }
  //para eliminar los errores que aparecen en el form
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [errors])
  //para guardar la cookie con js-cookie
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()

      if (!cookies.access_token) {
          setIsAuthenticated(false)
          setLoading(false)
          return setUser(null)
      }
        try {
          const res = await verifyTokenRequest(cookies.access_token)
          console.log(res)
          if (!res.data) {
            setLoading(false)
            return setIsAuthenticated(false)
          }
          setIsAuthenticated(true)
          setUser(res.data)
          setLoading(false)
        }
        catch (error) {
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
          console.log(error)
        }
    }
    checkLogin()
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      user,
      isAuthenticated,
      isLoading,
      errors,

    }}>
      {children}
    </AuthContext.Provider>
  )
}
