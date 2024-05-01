// projects.get.ts 
export default defineEventHandler(async (event) => {
  let projects;
  let organizedData = {};

  try {
    projects = await connectAndQuery("SELECT pm.*, pavg.AverageProgress FROM projectModel pm LEFT JOIN ProjectAverageProgress pavg ON pm.ID = pavg.ID;")

  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records.',
    });
  }

  // Organiserer dataen i prosjektet til et object
  projects.forEach(row => {
    if (!organizedData[row.ID]) {
      organizedData[row.ID] = {
        ID: row.ID,
        title: row.title,
        progress: row.AverageProgress,
        onTime: row.onTime,
        PEM: row.PEM,
        comment: row.comment,
        POdate: row.POdate,
        SFdate: row.SFdate,
        archive: row.archive,
      };
    }

    // If this row has a gate and we haven't seen this gate yet, initialize it
    if (row.gateID && !organizedData[row.ID].gates[row.gateID]) {
      organizedData[row.ID].gates[row.gateID] = {
        gateID: row.gateID,
        gateTitle: row.gateTitle,
        tasks: []
      };
    }

    // If this row has a task, add it to the appropriate gate
    if (row.gateID && row.step) {
      organizedData[row.ID].gates[row.gateID].tasks.push({
        step: row.step,
        title: row.title,
        responsiblePerson: row.responsiblePerson,
        onTime: row.onTime,
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
