// projects.get.ts 
export default defineEventHandler(async (event) => {
  let projects;
  let organizedData = {};

  try {
    projects = await connectAndQuery("SELECT * FROM [db_owner].[validUsers]")
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records.',
    });
  }

  // Organiserer dataen i prosjektet til et object
  projects.forEach(row => {
    const IDAsString = String(row.id); // Convert ID to string
    if (!organizedData[IDAsString]) {
      organizedData[IDAsString] = {
        ID: IDAsString,
        username: row.username,
        role: row.role,
        team: row.team,
      };
    }


  });
  return {
    hello: 'world',
    data: organizedData
  }
})
