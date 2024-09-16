// routes/teams/[id].delete.ts

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        if (id === undefined || isNaN(id as any)) {
            console.log(id)
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing user ID',
            });
        }

        // Assuming you have a stored procedure or SQL query to delete the user by ID
        const result = await connectAndQuery(`
            DELETE FROM db_owner.user_teams WHERE id = ${id};
        `);

        const result2 = await connectAndQuery(`
            update [db_owner].[validUsers] set team = 0 where team = ${id};
        `);

        const result3 = await connectAndQuery(`
            update [db_owner].[projectModel] set team = 0 where team = ${id};
        `);


        return { deleted: true };
    } catch (error) {
        console.error('Error deleting team:', error);
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to delete team',
        });
    }
});
