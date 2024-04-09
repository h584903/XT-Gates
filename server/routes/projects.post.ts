// projects.post.ts 
export default defineEventHandler(async event => {

  let projects;
  let gates;
  
  var gateListe: any[][];
  
  //Liste over gates som blir lagt til i opprettelsen av et prosjekt
  gateListe = [
    [1,"RFQ"], //gate 1
    [2,"QUOTATION"], //gate 2
    [3,"PURCHASE ORDER"], //gate 3
    [4,"DISASSEMBLY OF XT"], //gate 4
    [5,"INSPECTION OF COMPONENTS"], //gate 5
    [6,"3RD PARTY SERVICES"], //gate 6
    [7,"RE-INSPECTION OF COMPONENTS AFTER 3RD PARTY"], //gate 7
    [8,"CLEAN START REVIEW"], //gate 8
    [9,"PRE-ASSEMBLY"], //gate 9
    [10,"ASSEMBLY"], //gate 10
    [11,"PRE TEST"], //gate 11
    [12,"TEST"], //gate 12
    [13,"POST TEST ACTIVITIES"], //gate 13
    [14,"DELIVERY"] // gate 14
  ]

  try {
    const body = await readBody(event);
    const { title, progress, plannedDate, POdate, status, PEM, comment } = body;

    const ID = 22; // Må gjøres dynamisk etter hvert.

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
