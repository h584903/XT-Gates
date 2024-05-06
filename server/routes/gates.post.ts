export default defineEventHandler(async event => {
  let gate;

  try {

    const body = await readBody(event);
    const { projectID, gateNR, title } = body;

    //Oppretter prosjektet
    gate = await connectAndQuery(`
      INSERT INTO gateModel (prosjektID, gateNR, gateTitle)
      VALUES (${projectID}, ${gateNR}, '${title}')
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
