import jwt from "jsonwebtoken"

export default defineEventHandler(async event => {
  let newRole;
  const config = useRuntimeConfig()
  try {
    const body = await readBody(event);
    const { token } = body;
    let verifiedToken = ''
    try {
      verifiedToken = await jwt.verify(token, config.tokenSecret);
    } catch (error) {
      console.log("Authentication error: " + error)
      return false;
    }

    return verifiedToken;
  } catch (error) {
    // If there's an error during the database operation, return an internal server error
    console.error('Failed to create Token', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: result,
    });
  }
});

