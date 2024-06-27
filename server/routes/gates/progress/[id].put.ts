export default defineEventHandler(async event => {
  try {
    // gjør klar body
    const body = await readBody(event);
    const { gateID, progress } = body;

    if (!gateID) {
      // Sender en error hvis requesten er feil
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: 'gateID and progress must be provided',
      });
    }


    // Update the task in the database
    await connectAndQuery(`UPDATE gates.db_owner.gateModel SET progress = ${progress} WHERE ID = ${gateID}`);


    // Return success response
    return { updated: true };
  } catch (error) {
    // If there's an error during the database operation, return an internal server error
    console.error('Failed to update the gate:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to update the task',
    });
  }
});

