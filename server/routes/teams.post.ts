export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    try {
      const body = await readBody(event);
      const { team } = body;

      if (!team) {
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: 'Team name is required',
        });
      }

      // Fetch the current maximum id
      const maxIdResult = await connectAndQuery(`
        SELECT MAX(id) AS maxId FROM [db_owner].[user_teams];
      `);
      
      const maxId = maxIdResult[0].maxId || 0;
      const newId = maxId + 1;

      // Insert the new team into the database
      const result = await connectAndQuery(`
        INSERT INTO [db_owner].[user_teams] (id, team)
        VALUES (${newId}, '${team}');
      `);

      return {
        status: 'success',
        data: {
          id: newId,
          team: team,
        },
      };
    } catch (error) {
      console.error(error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to add the new team',
      });
    }
  } else {
    return createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
      data: 'Only POST requests are allowed',
    });
  }
});
