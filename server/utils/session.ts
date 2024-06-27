import jwt from "jsonwebtoken"
import { ViteConfig } from "nuxt/schema"
import {H3Event, getCookie} from 'h3'



// Trenger vi å knytte pasw til token?
// Oppretter en JWT token med brukernavnet
async function createToken (username, userRole, team) {
  const config = useRuntimeConfig()
  return await jwt.sign(
    {
      user: username,
      userRole: userRole,
      team: team
    },
    config.tokenSecret,
    {
      expiresIn: config.tokenExpiration
    } 
  )
}
// Verifiserer tokenen
async function verifyToken(token) {
  const config = useRuntimeConfig()
  let verifiedToken = '';
  try {
    verifiedToken = await jwt.verify(token, config.tokenSecret);
    return true;
  } catch (error) {
    console.log("Authentication error")
    return false;
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


