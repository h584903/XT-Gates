export default defineEventHandler(async event => {
  let newRole;
  try {
    const body = await readBody(event);
    const { _username, _password } = body;
    const token = await jwt.sign({ _username, _password }, 'mysecrettoken');

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

