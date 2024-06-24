export default defineEventHandler(async event => {
  let newRole;
  try {
    const body = await readBody(event);
    const { username } = body;
    // Querying the role
    const result = await connectAndQuery(`SELECT role FROM [db_owner].[validUsers] WHERE username = '${username}'`)


    if (result.length > 0) {
      newRole = result[0]; // Get the first row
      console.log('Data from the first row:', newRole);
    } else {
      console.log('No data found.');
    }

    // Returning only the first match for the name
    return (newRole)
  } catch (error) {
    // If there's an error during the database operation, return an internal server error
    console.error('Failed validify user:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: result,
    });
  }
});

