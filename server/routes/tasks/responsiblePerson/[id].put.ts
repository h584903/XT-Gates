export default defineEventHandler(async event => {
    try {
      // gjør klar body
      const body = await readBody(event);
      const { taskID, newResponsiblePerson } = body;
  
      if (!taskID || !newResponsiblePerson) {
        // Sender en error hvis requesten er feil
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: 'taskID and newResponsiblePerson must be provided',
        });
      }
      // Update the task in the database
      await connectAndQuery(`UPDATE gates.db_owner.taskModel SET responsiblePerson = '${newResponsiblePerson}' WHERE ID = ${taskID}`);

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
  
  