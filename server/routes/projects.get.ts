// projects.get.ts 
export default defineEventHandler(async (event) => {

  let projects;
  let progressList;
  let organizedData = {};

  try {
    projects = await connectAndQuery(
      "SELECT pm.*, pavg.AverageProgress FROM gates.db_owner.projectModel pm LEFT JOIN gates.db_owner.ProjectAverageProgress pavg ON pm.ID = pavg.ID;")

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
      SELECT p.ID, g.stage, AVG(t.progress) AS AverageProgress 
      FROM [db_owner].[projectModel] p 
      JOIN [db_owner].[gateModel] g ON p.ID = g.prosjektId 
      JOIN [db_owner].[taskModel] t ON p.ID = t.prosjektID AND g.ID = t.gateID
      GROUP BY p.ID, g.stage
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


  // Organiserer dataen i prosjektet til et object
  projects.forEach(row => {
    const IDAsString = String(row.ID); // Convert ID to string
    if (!organizedData[IDAsString]) {
      organizedData[IDAsString] = {
        ID: IDAsString,
        title: row.title,
        progress: [],
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

    // If this row has a gate and we haven't seen this gate yet, initialize it
    if (row.gateID && !organizedData[IDAsString].gates[row.gateID]) {
      organizedData[IDAsString].gates[row.gateID] = {
        gateID: row.gateID,
        gateTitle: row.gateTitle,
        tasks: []
      };
    }

    // If this row has a task, add it to the appropriate gate
    if (row.gateID && row.step) {
      organizedData[IDAsString].gates[row.gateID].tasks.push({
        step: row.step,
        title: row.title,
        responsiblePerson: row.responsiblePerson,
        onTimeDate: row.onTimeDate,
        progress: row.progress,
        duration: row.duration
      });
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

  console.log(projects)



  return {
    hello: 'world',
    data: organizedData
  }
})
