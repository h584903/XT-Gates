// projects.post.ts 
export default defineEventHandler(async event => {
  let projects;

  try {

    const body = await readBody(event);
    const { projectID, gateNR, title } = body;

    //Oppretter prosjektet
    projects = await connectAndQuery(`
      INSERT INTO gateModel (prosjektID, gateNR, gateTitle)
      VALUES (${projectID}, ${gateNR}, '${title}')
    `);

    return { updated: true };
  } catch (error) {
    console.log("error: " + error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
