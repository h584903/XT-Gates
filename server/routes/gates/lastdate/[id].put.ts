export default defineEventHandler(async event => {
    try {
        // Prepare the body
        const body = await readBody(event);
        const { gateID, lastDate } = body;


        if (!gateID || !lastDate) {
            // Send an error if the request is invalid
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'gateID and lastDate must be provided',
            });
        }

        await connectAndQuery(`UPDATE gates.db_owner.gateModel SET latestDateOnTime = '${lastDate}' WHERE ID = ${gateID}`);
        return { updated: true };
    } catch (error) {
        console.error('Failed to update the last date for gates:', error);
        // Return an error response if there's an internal server error
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to update the last date for gates',
        });
    }
});
