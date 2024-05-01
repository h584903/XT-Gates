export default defineEventHandler(async event => {
  try {
    // Leser body fra put requesten
    const body = await readBody(event);
    const { tasks } = body;
    console.log("Putting the new order on database")

    if (!tasks ) {
      // Error hvis ingen tasks ble sendt
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: 'tasks must be provided',
      });
    }


    // Oppdaterer tasks i databasen
    await tasks.forEach((task) => {
      connectAndQuery(`UPDATE taskModel SET step = ${task.step} WHERE ID = ${task.ID}`);
    });

    return { updated: true };
  } catch (error) {
    // Error hvis noe skule gå feil
    console.error('Failed to update the task:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to update the task',
    });
  }
});


