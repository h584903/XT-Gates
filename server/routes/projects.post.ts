// projects.post.ts 
export default defineEventHandler(async event => {
  let projects;

  try {

    const body = await readBody(event);
    const { title, progress, plannedDate, PODate, status, PEM, comment, team } = body;

    //Oppretter prosjektet
    projects = await connectAndQuery(`
      EXEC gates.db_owner.DuplicateProject
      @OldProjectID = 1,
      @NewProjectTitle = '${title}',
      @PEMName = '${PEM}',
      @PODate = '${PODate}',
      @SFDate = '${plannedDate}',
      @team = ${team},
      @template = 0;`);

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
