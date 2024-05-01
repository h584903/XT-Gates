// Henter tasks til et prosjekt
// GET for tasks
export default defineEventHandler (async (event) => {
    const id = getRouterParam(event, 'id')
    let taskList;
    try {
        if (id === undefined) {
            console.log("Invalid or missing project ID. Cannot fetch tasks.");
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
            });
        }
        taskList = await connectAndQuery(`SELECT * FROM taskModel WHERE prosjektID = ${id}`)
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to fetch tasks',
        });
    }

    return taskList
})

