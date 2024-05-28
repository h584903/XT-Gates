export default defineEventHandler(async event => {
  try {
    // Read the incoming request body
    const body = await readBody(event);
    const { taskID, newDuration } = body;

    if (!taskID || !newDuration) {
      // If taskID or newDuration is not provided in the request, return an error response
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: 'taskID and newDuration must be provided',
      });
    }


    // Update the task in the database
    await connectAndQuery(`UPDATE gates.db_owner.taskModel SET duration = ${newDuration} WHERE ID = ${taskID}`);

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

