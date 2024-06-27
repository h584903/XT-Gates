import jwt from "jsonwebtoken"

export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody(event);
    const { username, pass, userRole } = body;
    let adminRole;
    // Querying the role
    const result = await connectAndQuery(`SELECT role FROM [db_owner].[admin_pass] WHERE pass = '${pass}' AND role = ${userRole}`)

    if (result.length > 0) {
      adminRole = result[0]; // Get the first row
    } else {
      return false;
    }

    // Returning only the first match for the name
    const token = await jwt.sign({ user: username, userRole: userRole , team: 1}, config.tokenSecret);

    return token
  } catch (error) {
    // If there's an error during the database operation, return an internal server error
    console.error('pass failed:', error);
    return false;
  }
});

