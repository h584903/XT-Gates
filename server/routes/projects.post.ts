// projects.post.ts 
export default defineEventHandler(async event => {

  let projects;
  

  try {
    const body = await readBody (event)
    const requestBody = JSON.parse(body)
    const { title, progress, plannedDate, POdate, status, PEM, comment} = requestBody;

    console.log("Attempting to create project in DB..")
    projects = await connectAndQuery("INSERT INTO projectModel VALUES (9,'TestdalTestdalTestdal',0,1,'" + "John Doe" + "', 'Sample comment','" + "2024-10-05" + "','" + "2024-09-25" + "',0)");

    return {updated: true}
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    })
  }
  
})
