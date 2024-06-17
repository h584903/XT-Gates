export default defineEventHandler(async event => {
  try {
    // Read the request body
    const body = await readBody(event);
    const { projectID, archive } = body;

    if (!projectID || archive === undefined) {
      // Send an error if the request is malformed
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: 'projectID and archive must be provided',
      });
    }

    // Convert boolean to bit
    const archiveBit = archive ? 1 : 0;

    // Update the archive status in the database
    await connectAndQuery(`UPDATE gates.db_owner.projectModel SET archive = ${archiveBit} WHERE ID = ${projectID}`);

    // Return success response
    return { updated: true };
  } catch (error) {
    // If there's an error during the database operation, return an internal server error
    console.error('Failed to update the project archive status:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to update the project archive status',
    });
  }
});
