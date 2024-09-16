export default defineEventHandler(async event => {
    try {
      const body = await readBody(event);
      const { pass, role } = body;
      const result = await connectAndQuery(`SELECT * FROM [db_owner].[admin_pass] WHERE pass = '${pass}' AND role = ${role}`)
  
      if (result.length > 0) {
        return true
      } else {
        return false;
      }
  
    } catch (error) {
      console.error('pass failed:', error);
      return false;
    }
  });
  
  