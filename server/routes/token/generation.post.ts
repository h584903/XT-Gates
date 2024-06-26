export default async (event: any) => {
  try {
    // Parse request body to get username
    const body = await readBody(event);
    const { username } = body;

    // Validate username
    if (!username) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: 'Username must be provided',
      });
    }

    // Generate JWT token
    const token = createToken(username);

    // Return success response with token
    return {
      statusCode: 200,
      statusMessage: 'OK',
      data: { token },
    };
  } catch (error) {
    console.error('Failed to generate token:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to generate token',
    });
  }
};
