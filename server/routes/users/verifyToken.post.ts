export default defineEventHandler(async event => {
  let newRole;
  try {
    const body = await readBody(event);
    const { token } = body;
    const username = await jwt.verify({ username }, 'mysecrettoken').username;

    return username;
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

