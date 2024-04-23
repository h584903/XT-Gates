import Id from "~/pages/projectList/[id].vue";

// routes/projects/[id].get.ts
export default defineEventHandler (async (event) => {
	const id = getRouterParam(event, 'id')

	let taskList;

	try {
		if (id == undefined || isNaN(id as any)) {
			console.log("Invalid or missing project ID. Cannot fetch tasks.")
			return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
            });
		}
		taskList = await connectAndQuery(`SELECT * FROM taskModel WHERE projectID = ${Id}`)
		console.log(taskList)

	} catch (error) {
		return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to fetch gates',
        });
	}

	return 'individual project!'
})
