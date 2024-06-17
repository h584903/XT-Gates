export default defineEventHandler(async event => {
    try {
      // gjør klar body
      const body = await readBody(event);
      const { taskID, newTitle } = body;

      if (!taskID || !newTitle) {
        // Sender en error hvis requesten er feil
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: 'taskID and newTitle must be provided',
        });
      }
      
      await connectAndQuery(`UPDATE gates.db_owner.taskModel SET title = '${newTitle}' WHERE ID = ${taskID}`);
      return { updated: true };
    } catch (error) {
      console.error('Failed to update the task:', error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to update the task',
      });
    }
  });