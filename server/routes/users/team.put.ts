export default defineEventHandler(async event => {
    try {
        // Parse request body
        const body = await readBody(event);
        const { userID, newTeam } = body;

        if (!userID || !newTeam) {
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'userID and newTeam must be provided',
            });
        }

        // Update the user's team in the database
        await connectAndQuery(`UPDATE db_owner.validUsers SET team = ${newTeam} WHERE id = ${userID}`);

        // Return success response
        return { updated: true };
    } catch (error) {
        console.error('Failed to update the user team:', error);
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to update the user team',
        });
    }
});
