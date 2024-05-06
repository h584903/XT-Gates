export default defineEventHandler(async event => {
  let task;

  try {

    const body = await readBody(event);
    const { projectID, gateID, step, title, responsiblePerson, duration} = body;

    //Oppretter prosjektet
    task = await connectAndQuery(`
      INSERT INTO taskModel (prosjektID, gateID, step, title, responsiblePerson, onTime, progress, duration)
      VALUES (${projectID}, ${gateID}, ${step}, '${title}', '${responsiblePerson}', 0, 0, ${duration})
    `);

    return { task };
  } catch (error) {
    console.log("error: " + error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
