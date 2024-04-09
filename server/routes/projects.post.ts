// projects.post.ts 
export default defineEventHandler(async event => {

  let projects;
  

  try {
    const body = await readBody (event)
    const { title, progress, plannedDate, POdate, status, PEM, comment} = body;

    console.log("Attempting to create project in DB..")
    projects = await connectAndQuery("INSERT INTO projectModel VALUES (21,'" + title +"',0,1,'" + PEM + "', 'Sample comment','01-01-2025','01-01-2025',0)");

    return {updated: true}
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    })
  }
  
})
