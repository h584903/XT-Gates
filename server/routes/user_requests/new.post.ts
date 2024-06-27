export default defineEventHandler(async event => {
    try {
      const body = await readBody(event);
      const { username, selectedTeam } = body;
  
      const insertQuery = `
        INSERT INTO [db_owner].[userRequests] (username, team)
        VALUES ('${username}', ${selectedTeam})
      `;
      const result = await connectAndQuery(insertQuery);
  
      return {
        statusCode: 200,
        statusMessage: 'Request submitted successfully',
        data: result, 
      };
    } catch (error) {
      
      console.error('Failed to submit user request:', error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: error.message,
      });
    }
  });
  