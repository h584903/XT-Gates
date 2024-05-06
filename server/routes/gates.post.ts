export default defineEventHandler(async event => {
  let gate;

  try {

    const body = await readBody(event);
    const { projectID, gateNR, title } = body;

    //Oppretter prosjektet
    gate = await connectAndQuery(`
      EXEC AdjustAndInsertGate
      @ProsjektID = ${projectID},
      @GateNR = ${gateNR},
      @GateTitle = '${title}';
    `); return { gate };
  } catch (error) {
    console.log("error: " + error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
