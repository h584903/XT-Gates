export default defineEventHandler(async event => {
    let roles;
    let organizedData = {};
  
    try {
      roles = await connectAndQuery("SELECT r.id, r.role FROM [db_owner].[user_roles] r;");
    } catch (error) {
      console.log(error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to retrieve role records.',
      });
    }
  
    // Organize the data into an object
    roles.forEach(row => {
      if (!organizedData[row.id]) {
        organizedData[row.id] = {
          ID: row.id,
          role: row.role
        };
      }
    });
  
    return {
      status: 'success',
      data: organizedData
    };
  });
  