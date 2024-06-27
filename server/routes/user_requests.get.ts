import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async event => {
  let userRequests;
  let organizedData = {};

  try {
    userRequests = await connectAndQuery("SELECT ur.id, ur.username, ut.team FROM [db_owner].[userRequests] ur LEFT JOIN [db_owner].[user_teams] ut on ur.team = ut.id;");
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve user request records.',
    });
  }

  // Organize the data into an object
  userRequests.forEach(row => {
    if (!organizedData[row.id]) {
      organizedData[row.id] = {
        ID: row.id,
        username: row.username,
        team: row.team
      };
    }
  });

  return {
    status: 'success',
    data: organizedData
  };
});
