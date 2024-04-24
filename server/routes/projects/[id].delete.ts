// routes/projects/[id].get.ts

//slette prosjekt
export default defineEventHandler (async (event) => {
	const id = getRouterParam(event, 'id')
	try {
		if(id == undefined || isNaN(id as any)) {
			console.log("id undefined, cannot delete project")
			return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
            });
		} else {
		
		console.log(`Project deletion initiated for ID ${id}`);
        return `Project deletion initiated for ID ${id}`;
		}
	} catch (error) {
		return createError({
			statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
		  });
	}
});
