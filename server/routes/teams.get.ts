export default defineEventHandler(async event => {
    let teams;
    let organizedData = {};
  
    try {
      teams = await connectAndQuery("SELECT t.id, t.team FROM [db_owner].[user_teams] t;");
    } catch (error) {
      console.log(error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to retrieve team records.',
      });
    }
  
    // Organize the data into an object
    teams.forEach(row => {
      if (!organizedData[row.id]) {
        organizedData[row.id] = {
          ID: row.id,
          team: row.team,
        };
      }
    });
  
    return {
      status: 'success',
      data: organizedData
    };
  });
  