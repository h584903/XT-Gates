// projects.get.ts 
export default defineEventHandler(async (event) => {
    const team = getRouterParam(event, 'id')

    let projects;
    let organizedData = {};
    
    try {
        projects = await connectAndQuery(
            `SELECT pm.*, pavg.AverageProgress FROM gates.db_owner.projectModel pm LEFT JOIN gates.db_owner.ProjectAverageProgress pavg ON pm.ID = pavg.ID WHERE pm.team = ${team}`);
    } catch (error) {
      console.log(error)
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to retrieve records.',
      });
    }
    try {
        progressList = await connectAndQuery(
            `SELECT p.ID, p.team, g.stage, AVG(t.progress) AS AverageProgress 
            FROM [db_owner].[projectModel] p 
            JOIN [db_owner].[gateModel] g ON p.ID = g.prosjektId 
            JOIN [db_owner].[taskModel] t ON p.ID = t.prosjektID AND g.ID = t.gateID
            WHERE p.team = 1
            GROUP BY p.ID, p.team, g.stage;
        `);
    } catch (error) {
      console.log(error)
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: 'Failed to retrieve records.',
      });
    }
  
    // Organiserer dataen i prosjektet til et object
    projects.forEach(row => {
      const IDAsString = String(row.ID); // Convert ID to string
      if (!organizedData[IDAsString]) {
        organizedData[IDAsString] = {
          ID: IDAsString,
          title: row.title,
          progress: row.AverageProgress,
          onTimeDate: row.onTimeDate,
          PEM: row.PEM,
          comment: row.COMMENT,
          POdate: row.POdate,
          SFdate: row.SFdate,
          archive: row.archive,
          gates: {}, // Initialize gates as an empty object
          team: row.team,
          template: row.template
        };
      }
    });
  
  
    return {
      hello: 'world',
      data: organizedData
    }
  })
  
