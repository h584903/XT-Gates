import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async event => {
  let users;
  let organizedData = {};

  try {
    users = await connectAndQuery("SELECT u.id, u.username, ur.role, ut.team FROM [db_owner].[validUsers] u LEFT JOIN [db_owner].[user_roles] ur ON u.role = ur.id LEFT JOIN [db_owner].[user_teams] ut on u.team = ut.id;")
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve user records.',
    });
  }

  // Organize the data into an object
  users.forEach(row => {
    if (!organizedData[row.id]) {
      organizedData[row.id] = {
        ID: row.id,
        username: row.username,
        team: row.team,
        role: row.role
      };
    }
  });

  return {
    status: 'success',
    data: organizedData
  };
});