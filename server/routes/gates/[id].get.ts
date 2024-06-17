// Henter gates til et prosjekt
// routes/projects/[id].get.ts
// GET for gates
export default defineEventHandler (async (event) => {
    const id = getRouterParam(event, 'id')
    let gateList;

    try {
        if (id === undefined || isNaN(id as any)) {
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing project ID',
            });
        }
        gateList = await connectAndQuery(`SELECT * FROM gates.db_owner.gateModel WHERE prosjektID = ${id}`)
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to fetch gates' + error,
        });
    }

    return gateList
})

