export default defineEventHandler(async (event) => {
  const team = getRouterParam(event, 'id')

  let projects;
  let progressList;
  let stageList;
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
    progressList = await connectAndQuery(`
      SELECT p.ID, p.team, g.stage, AVG(t.progress) AS AverageProgress 
      FROM [db_owner].[projectModel] p 
      JOIN [db_owner].[gateModel] g ON p.ID = g.prosjektId 
      JOIN [db_owner].[taskModel] t ON p.ID = t.prosjektID AND g.ID = t.gateID
      WHERE p.team = ${team}
      GROUP BY p.ID, p.team, g.stage
      ORDER BY p.ID, stage;
  `);
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records.',
    });
  }
  try {
    stageList = await connectAndQuery(`
      SELECT ID, divider
      FROM dbo.gatedivider AS gd
      JOIN db_owner.projectModel AS pm ON gd.prosjektID = pm.ID
      WHERE pm.team = ${team};
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
        progress: [], // Initialize progress as an array to store stage-based progress
        dividers: [], // Initialize progress as an array to store stage-based progress
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

  // Add stage-based progress to each project
  progressList.forEach(progressRow => {
    const IDAsString = String(progressRow.ID);
    if (organizedData[IDAsString]) {
      organizedData[IDAsString].progress.push(
        progressRow.AverageProgress
      );
    }
  });
  stageList.forEach(stageRow => {
    const IDAsString = String(stageRow.ID);
    if (organizedData[IDAsString]) {
      organizedData[IDAsString].dividers.push(
        stageRow.divider
      );
    }
  });

  return {
    hello: 'world',
    data: organizedData
  }
});
