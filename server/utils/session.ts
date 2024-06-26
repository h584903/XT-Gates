import jwt from "jsonwebtoken"
import { ViteConfig } from "nuxt/schema"
import {H3Event, getCookie} from 'h3'



// Trenger vi å knytte pasw til token?
// Oppretter en JWT token med brukernavnet
const createToken = async (username: string) => {
  const config = useRuntimeConfig()
  return await jwt.sign(
    {
      id: username,
    },
    config.tokenSecret,
    {
      expiresIn: config.tokenExpiration
    } 
  )
}
// Verifiserer tokenen
const verifyToken = async (token: string) => {
  try {
  const config = useRuntimeConfig()
  return await jwt.verify(token, config.tokenSecret)
  } catch (err) {
    return "Token expired"
  }
}

const getUserToken = (event: H3Event) => {
  const cookie = getCookie(event, "__session")
  if (!cookie) {
    return null
  }
  const token = verifyToken(cookie)
  if (!token) {
    return null 
  }
  return token
}
export { createToken,verifyToken, getUserToken }


