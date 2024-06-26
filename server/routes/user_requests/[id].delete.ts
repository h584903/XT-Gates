// routes/user_requests/[id].delete.ts
import { defineEventHandler, getRouterParam, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    try {
        if (id === undefined || isNaN(id as any)) {
            return createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: 'Invalid or missing user request ID',
            });
        }

        // Assuming you have a stored procedure or SQL query to delete the user request by ID
        const result = await connectAndQuery(`
            DELETE FROM db_owner.userRequests WHERE id = ${id};
        `);

        return { deleted: true };
    } catch (error) {
        console.error('Error deleting user request:', error);
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: 'Failed to delete user request',
        });
    }
});
