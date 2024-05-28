// Henter tasks til et prosjekt
// GET for tasks
export default defineEventHandler (async (event) => {
    const id = getRouterParam(event, 'id')
    let taskList;
    try {

        if (id === undefined || isNaN(id as any)) {
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
            });
        }
        taskList = await connectAndQuery(`SELECT * FROM gates.db_owner.taskModel WHERE prosjektID = ${id}`)
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to fetch tasks',
        });
    }

    return taskList
})

