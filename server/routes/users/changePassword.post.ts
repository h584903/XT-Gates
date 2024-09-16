export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { newPass, role } = body;

        if (!newPass || !role) {
            throw new Error('Missing required fields');
        }

        const result = await connectAndQuery(`
            UPDATE [db_owner].[admin_pass]
            SET pass = '${newPass}'
            WHERE role = ${role}
        `);
    } catch (error) {
        console.error('Password update failed:', error);
        return { success: false, message: 'Internal server error' };
    }
});
