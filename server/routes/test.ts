import sql from 'mssql';

export default defineEventHandler(async (event) => {
  let projects;
  try {
    projects = await connectAndQuery("SELECT * FROM gates.db_owner.projectModel WHERE ID = 1;");
    getUserToken();

  } catch (error) {
    // Handle error, for example, by returning an error status and message
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records.',
    });
  }

  return {
    hello: 'world',
    data: projects
  }
})
