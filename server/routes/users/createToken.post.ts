import jwt from "jsonwebtoken"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  let newRole;
  try {
    const body = await readBody(event);
    const { username, password, userRole, userTeam } = body;
    const token = await createToken(username, userRole, userTeam)

    if (token == false) {
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: result,
      })
    }

    return token
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

