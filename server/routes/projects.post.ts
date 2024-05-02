// projects.post.ts 
export default defineEventHandler(async event => {

  try {
    const body = await readBody(event);
    const { title, progress, plannedDate, POdate, status, PEM, comment } = body;

    //Oppretter prosjektet
    projects = await connectAndQuery(`
      EXEC DuplicateProject
      @OldProjectID = 1,
      @NewProjectTitle = '${title}',
      @PEMName = '${PEM}',
      @PODate = '2024-12-12',
      @SFDate = '2024-12-12';`);

    return { updated: true };
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
