export default defineEventHandler(async event => {
  try {
    // Leser body fra put requesten
    const body = await readBody(event);
    const { gates } = body;
    console.log("Putting the new order on database")

    if (!tasks ) {
      // Error hvis ingen tasks ble sendt
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: 'gates must be provided',
      });
    }


    // Oppdaterer tasks i databasen
    const updatePromises = tasks.map(gate =>
      connectAndQuery(`UPDATE gateModel SET gateNR = ${gate.gateNR} WHERE ID = ${gate.ID}`)
    );

    await Promise.all(updatePromises);

    return { updated: true };
  } catch (error) {
    // Error hvis noe skule gå feil
    console.error('Failed to update the gate:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to update the task',
    });
  }
});


