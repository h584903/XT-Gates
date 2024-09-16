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

      // Fetch the highest id in the teams table to calculate the new id
      const maxIdResult = await connectAndQuery(`
        SELECT MAX(id) as maxId FROM [db_owner].[user_teams]
      `);
      const newId = maxIdResult[0].maxId + 1;

      // Insert the new team into the database
      await connectAndQuery(`
        INSERT INTO [db_owner].[user_teams] (id, team)
        VALUES (${newId}, '${team}');
      `);

      // Create a template for the new team
      await connectAndQuery(`
        EXEC gates.db_owner.DuplicateProject
        @OldProjectID = 1,
        @NewProjectTitle = 'Template ${team} ',
        @PEMName = 'NONE',
        @PODate = '3000-01-01',
        @SFDate = '3000-01-01',
        @team = ${newId},
        @template = 1;
      `);

      // Fetch the newly inserted team to return it
      const newTeam = await connectAndQuery(`
        SELECT id, team FROM [db_owner].[user_teams]
        WHERE id = ${newId};
      `);

      return {
        status: 'success',
        data: newTeam[0],
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
