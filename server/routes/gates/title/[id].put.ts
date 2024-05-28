export default defineEventHandler(async event => {
    try {
      // gjør klar body
      const body = await readBody(event);
      const { gateID, newTitle } = body;

      if (!gateID || !newTitle) {
        // Sender en error hvis requesten er feil
        return createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: 'gateID and newTitle must be provided',
        });
      }

      await connectAndQuery(`UPDATE gates.db_owner.gateModel SET gateTitle = '${newTitle}' WHERE ID = ${gateID}`);
      return { updated: true };
    } catch (error) {
      console.error('Failed to update the gate:', error);
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to update the gate',
      });
    }
  });