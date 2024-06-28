export default defineEventHandler(async event => {
  let projects;

  try {
    if (await verifyToken(event.req.headers.authentication) === true) {
      const body = await readBody(event);
      const {ID, title, progress, plannedDate, PODate, status, PEM, comment, team, template } = body;

      // Ensure the template parameter is a boolean
      const isTemplate = template ? 1 : 0;

      console.log("Copied ID: "+ID)

      // Create the project
      projects = await connectAndQuery(`
        EXEC gates.db_owner.DuplicateProject
        @OldProjectID = ${ID},
        @NewProjectTitle = '${title}',
        @PEMName = '${PEM}',
        @PODate = '${PODate}',
        @SFDate = '${plannedDate}',
        @team = ${team},
        @template = ${isTemplate};`);

      return { updated: true };
    } else {
      return false;
    }
  } catch (error) {
    console.log("error: " + error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
