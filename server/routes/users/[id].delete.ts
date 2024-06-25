// routes/users/[id].delete.ts

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        if (id === undefined || isNaN(id as any)) {
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing user ID',
            });
        }

        // Assuming you have a stored procedure or SQL query to delete the user by ID
        const result = await connectAndQuery(`
            DELETE FROM db_owner.validUsers WHERE id = ${id};
        `);


        return { deleted: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to delete user',
        });
    }
});
