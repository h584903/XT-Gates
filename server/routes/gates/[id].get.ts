// Henter gates til et prosjekt
// GET for gates
export default defineEventHandler (async (event) => {
	const id = getRouterParam(event, 'id')

	let gateList;

	try {
        if (id === undefined || isNaN(id as any)) {
            console.log("Invalid or missing project ID. Cannot fetch gates.");
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
            });
        }
		gateList = await connectAndQuery(`SELECT * FROM gateModel WHERE prosjektID = ${id}`)
		console.log(gateList)
	} catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to fetch gates',
        });
	}

	return gateList
})

