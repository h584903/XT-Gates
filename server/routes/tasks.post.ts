export default defineEventHandler(async event => {
  let task;

  try {

    if (await verifyToken(event.req.headers.authentication) == true) {
      const body = await readBody(event);
      const { projectID, gateID, step, title, responsiblePerson, duration} = body;


      //Oppretter prosjektet
      task = await connectAndQuery(`
INSERT INTO gates.db_owner.taskModel (prosjektID, gateID, step, title, responsiblePerson, onTime, progress, duration)
VALUES (${projectID}, ${gateID}, ${step}, '${title}', '${responsiblePerson}', 0, 0, ${duration})
`);

      return { task };
    } else {
      return false;
    }
  } catch (error) {
    console.log("nå error: " + error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
