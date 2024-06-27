// projects.get.ts 
export default defineEventHandler(async (event) => {
  let projects;
  let organizedData = {};

  try {
    projects = await connectAndQuery("SELECT pm.*, pavg.AverageProgress FROM gates.db_owner.projectModel pm LEFT JOIN gates.db_owner.ProjectAverageProgress pavg ON pm.ID = pavg.ID;")

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


  return {
    hello: 'world',
    data: organizedData
  }
})
