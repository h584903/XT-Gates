export default defineEventHandler(async event => {
    let user;
  
    console.log("ATTEMPTING TO APPROVE")

    try {
  
      const body = await readBody(event);
      const { username, team} = body;
  
      //Oppretter prosjektet
      user = await connectAndQuery(`
        INSERT INTO gates.db_owner.validUsers (username, team, role)
        VALUES ('${username}', ${team}, 1)
      `);
  
      return { user };
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to retrieve records',
      });
    }
  });
  