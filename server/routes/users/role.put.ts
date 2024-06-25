export default defineEventHandler(async event => {
    try {
        // Parse request body
        const body = await readBody(event);
        const { userID, newRole } = body;

        if (!userID || !newRole) {
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'userID and newRole must be provided',
            });
        }

        // Update the user's role in the database
        await connectAndQuery(`UPDATE db_owner.validUsers SET role = ${newRole} WHERE id = ${userID}`);

        // Return success response
        return { updated: true };
    } catch (error) {
        console.error('Failed to update the user role:', error);
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to update the user role',
        });
    }
});
