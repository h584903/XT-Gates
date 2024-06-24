export default defineEventHandler(async event => {
    try {
      // gjør klar body
      const body = await readBody(event);
      const {} = body;

      // Update the task in the database
      await connectAndQuery(`SELECT gates.db_owner.validUsers SET responsiblePerson = '${newResponsiblePerson}' WHERE ID = ${taskID}`);

      // Return success response
      return { updated: true };
    } catch (error) {
      // If there's an error during the database operation, return an internal server error
      console.error('Failed to update the task:', error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to update the task',
      });
    }
  });

