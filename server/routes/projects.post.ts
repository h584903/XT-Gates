// projects.post.ts 
export default defineEventHandler(async event => {

  let projects;
  let gates;
  
  var gateListe: any[][];
  
  gateListe = [
    [1,"navn1"], //gate 1
    [2,"navn2"], //gate 2
    [3,"navn3"], //gate 3
    [4,"navn4"], //gate 4
    [5,"navn5"], //gate 5
    [6,"navn6"], //gate 6
    [7,"navn7"], //gate 7
    [8,"navn8"], //gate 8
    [9,"navn9"], //gate 9
    [10,"navn10"], //gate 10
    [11,"navn11"], //gate 11
    [12,"navn12"], //gate 12
    [13,"navn13"], //gate 13
    [14,"navn14"] // gate 14
  ]

  try {
    const body = await readBody(event);
    const { title, progress, plannedDate, POdate, status, PEM, comment } = body;

    const ID = 20;
    console.log("Attempting to create project in DB..");
    // Insert project into projectModel table
    projects = await connectAndQuery(`INSERT INTO projectModel VALUES (${ID}, '${title}', 0, 1, '${PEM}', 'Sample comment', '01-01-2025', '01-01-2025', 0)`);

    // Insert gates into gateModel table
    for (const gate of gateListe) {
      const gateNR = gate[0];
      const gateName = gate[1];
      const gateID = ID*1000 + gateNR; // Assuming a gateNR will not exceed 999
      
      await connectAndQuery(`INSERT INTO gateModel VALUES (${gateID}, ${ID}, ${gateNR}, '${gateName}')`);
    }

    return { updated: true };
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: 'Failed to retrieve records',
    });
  }
});
