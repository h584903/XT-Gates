export default defineEventHandler(async event => {
  let gate;

  try {

    if (await verifyToken(event.req.headers.authentication) == true) {
      const body = await readBody(event);
      const { projectID, gateNR, title } = body;

      //Oppretter prosjektet
      gate = await connectAndQuery(`
        EXEC gates.db_owner.AdjustAndInsertGate
        @ProsjektID = ${projectID},
        @GateNR = ${gateNR},
        @GateTitle = '${title}';
      `); return { gate };
    } else {
      return false;
    }
  } catch (error) {
    console.log("error: " + error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
