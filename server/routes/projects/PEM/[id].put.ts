export default defineEventHandler(async event => {
    try {
      // gjør klar body
      const body = await readBody(event);
      const { projectID, newPEM } = body;
  
      if (!projectID || !newPEM) {
        // Sender en error hvis requesten er feil
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: 'prosjektID and newPEM must be provided',
        });
      }
  
  
      // Update the task in the database
      await connectAndQuery(`UPDATE projectModel SET PEM = '${newPEM}' WHERE ID = ${projectID}`);

  
      // Return success response
      return { updated: true };
    } catch (error) {
      // If there's an error during the database operation, return an internal server error
      console.error('Failed to update the project:', error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to update the project',
      });
    }
  });
  
  