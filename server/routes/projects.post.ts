// projects.post.ts 
export default defineEventHandler(async event => {

  let projects;
  let gates;
  var ID;

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

  var taskListe: any[][][]

  /*
  Liste over tasks opprettet sammen med et prosjekt,
  hentet fra Excel-dokumentet.
  formattert ["navn","ansvarlig person",duration] for hver task.
  */
  taskListe = [
    [/*GATE 1*/
    ["RFQ received from Company", "XT House Manager", 5],
    ["Verify that all necessary information is available in RFQ or if there is need for clarifications", "XT House Manager", 5],
    ["Communicate received RFQ to Project Team. Assign PEM and specify compensation format.", "XT House Manager", 5],
    ["Create WBS", "XT Project Controller", 5],
    ["Create Service Orders", "XT PCO", 5],
    ["Release Quotation Work SO and inform Project Team", "XT PCO", 5]
  ],
    [/*GATE 2*/
    ["Evaluate RFQ technical scope", "XT PEM", 14],
    ["Evaluate Equipment History with open service and quality notifications", "XT PEM", 14],
    ["ECN Check and recommended modifications", "XT PEM", 14],
    ["Establish proposal for scope of work", "XT PEM", 14],
    ["Clarification of scope with customer (if necessary)", "XT PEM", 14],
    ["Define spare part, re-use, repair and 3rd party services needed", "XT PEM", 14],
    ["Define spare parts for internal production. Contact Production Planner and xxxx", "XT PEM", 14],
    ["Verify if BOM exist for KOS2 for spare parts for internal production.", "XT PEM", 14],
    ["Establish production BOM for KOS2. Update MRP controller and material data", "XT PEM", 14],
    ["Establish Routing for spare parts for internal production. (if not already in place)", "XT PEM", 14],
    ["Check M-spec related to NDT requirements for pressure and loadbearing fasteners.", "XT PEM", 14],
    ["Ensure that none of the fasteners are Galvanized, Elzik or Phosphate. Find replacement where necessary.", "XT PEM", 14],
    ["Scope service orders", "XT PEM", 14],
    ["Create <<Spare parts list>> for screening of parts.", "XT PEM", 14],
    ["Screening of spare parts (Use <<CTR and screening of parts>> in training material in Teams.", "XT PEM", 14],
    ["Estimate hours", "XT PEM", 14],
    ["Verify need for new/updated test procedure", "XT PEM", 14],
    ["Establish list of CPI test Equipment and Rental of test equipment", "XT PEM", 14],
    ["Establish CTR and Quotation text.", "XT PEM", 14],
    ["Establish schedule", "XT PEM", 14],
    ["CTR Cost input", "XT PEM", 14],
    ["Bid meeting", "XT PEM", 14],
    ["Establish SAP Quotation", "XT PEM", 14],
    ["Quotation approved and signed", "XT PEM", 14],
    ["Send quotation to Customer", "XT PEM", 14]
  ],
    [/*GATE 3*/
    ["Review and communicate PO to Project Team", "XT House Manager", 30],
    ["Verify PO amount", "XT Project Controller", 30],
    ["Verify plan vs. PO date", "XT PCO", 30],
    ["Verify technical scope in PO.", "XT PEM", 30],
    ["Close down Quotation Work SO", "XT Project Controller", 30],
    ["Finalize Service Orders", "XT PEM", 30],
    ["Release Service Orders and Update dates", "XT PCO", 30],
    ["Update <<Spare parts list>>. Identify parts with late delivery date. Contact procurement if necessary.", "XT PCO", 30],
    ["ASO of Spare parts. Need date 1-2 month before assembly start-up.", "XT WCO", 30],
    ["Create Project Folder in Box. Include necessary documentation for Disassemble & Inspection.", "XT WS TL / Supervisor", 30],
    ["Create <<3rd party service list>> and <<parts to be scrap list>> for workshop. To be placed in box folder.", "XT PEM", 30]
  ],
    [/*GATE 4*/
    ["Initiate start-up of project towards workshop", "XT PCO", 35],
    ["Arrange transport of XT to workshop according to THI", "XT WCO", 35],
    ["Kick-off with Workshop and Technical Support", "XT PEM", 35],
    ["Disassemble XT phase 1 - CVB with upper body ready for 3rd party (removal of Upper body)", "XT WS TL / Supervisor", 35],
    ["Disassemble XT phase 2 - CVB ready for technical support.", "XT WS TL / Supervisor", 35],
    ["Disassemble XT phase 3 - Complete disassembly scope.", "XT WS TL / Supervisor", 35],
    ["Fill out information in <<3rd party service list>> and <<parts to be scrap list>>", "XT WS TL / Supervisor", 35],
    ["Prepare specified components for inspection according to SO and LWI. Find ID.", "XT WS TL / Supervisor", 35],
    ["Pack dismantled component according to <<3rd party service list>> and <<parts to be scrap list>>", "XT WS TL / Supervisor", 35],
    ["Arrange shipment/transport from workshop to storage/3rd party", "XT WCO", 35],
    ["Inform PEM of issues/challenges or damages discovered during disassembly", "XT WS TL / Supervisor", 35],
    ["Evaluation and follow-up of findings during disassembly", "XT PEM", 35],
    ["Update scope and 3rd party requisitions based on findings", "XT PEM", 35],
    ["Evaluate need for VOR", "XT PEM", 35],
    ["CNF of completed workshop operations in Disassembly SO", "XT WS TL / Supervisor", 35],
    ["CNF of completed admin and 3rd party operations in Disassembly SO", "XT PEM", 35],
    ["TECO of Disassembly SO. Verify that there is no remaining commited cost before TECO.", "XT PEM", 35]
  ],
    [/*GATE 5*/
    ["<<Task>> technical support", "XT WS TL / Supervisor", 56],
    ["Original MRB identified and sorted for CVB, PWB and AWB.", "XT PEM", 56],
    ["CVB inspection completed", "XT PEM", 56],
    ["PWB inspection completed", "XT PEM", 56],
    ["AWB inspection completed", "XT PEM", 56],
    ["MBH / Flowloop inspection completed", "XT PEM", 56],
    ["AUX Parts inspection completed", "XT PEM", 56],
    ["Evaluation and follow-up of findings during Inspection", "XT PEM", 56],
    ["Update scope and 3rd party requisitions based on findings", "XT PEM", 56],
    ["Complete all 3rd party requisition", "XT PEM", 56],
    ["Pack and prepare XT components for storage or shipment to 3rd party", "XT WS TL / Supervisor", 56],
    ["Arrange shipment/transport from workshop to storage/3rd party", "XT WCO", 56],
    ["Long lead repair items ready for shipment (CVB, Choke, etc)", "XT WS TL / Supervisor", 56],
    ["CNF of completed workshop operations in Inspection SO.", "XT WS TL / Supervisor", 56],
    ["CNF of completed technical support operations in Inspection SO", "XT PEM", 56],
    ["CNF of completed admin and 3rd party operations in Inspection SO", "XT PEM", 56]
  ],
    [/*GATE 6*/
    ["ASO spare parts that shall be sent to 3rd party - Anodes", "XT WCO", 90],
    ["ASO spare parts that shall be sent to 3rd party -  New Spare part for coating", "XT WCO", 90],
    ["Arrange Shipment to 3rd party.", "XT WCO", 90],
    ["3rd party long leads embedded in Schedule", "XT PCO", 90],
    ["Create overview over 3rd party components to be re-inspected by technical support in status sheet.", "XT PEM", 90],
    ["Returning 3rd party service components into workshop for Inspection or to storage", "XT WCO", 90],
    ["3rd party completed", "XT PEM", 90]
  ],
    [/*GATE 7*/
    ["Prepare specified components for inspection", "XT WS TL / Supervisor", 14],
    ["Create overview of QN number that need to be marked on components", "XT PEM", 14],
    ["Ensure that all XT components are marked with QN according to provided info from PEM", "XT WS TL / Supervisor", 14],
    ["CVB inspection after weld repair", "XT PEM", 14],
    ["PWB inspection after weld repair", "XT PEM", 14],
    ["AWB inspection after weld repair", "XT PEM", 14],
    ["Inspection after machining of components (flanges etc).", "XT PEM", 14],
    ["Approved components to be packed for shipment to 3rd party Coating", "XT WS TL / Supervisor", 14],
    ["Shipment to 3rd party coating", "XT WCO", 14],
    ["CVB final inspection completed - VT accepted", "XT PEM", 14],
    ["PWB final inspection completed - VT accepted", "XT PEM", 14],
    ["AWB final inspection completed - VT accepted", "XT PEM", 14],
    ["MBH / Flowloop final inspection completed - VT accepted", "XT PEM", 14],
    ["AUX Parts final inspection completed - VT accepted", "XT PEM", 14],
    ["Approved components to be packed for storage", "XT WS TL / Supervisor", 14],
    ["Storage of approved components", "XT WCO", 14],
    ["CNF of operations in 3rd party  & Inspection SO", "XT PEM", 14],
    ["TECO of 3rd party  & Inspection SO", "XT PEM", 14]
  ],
    [/*GATE 8*/
    ["Ensure that all spare parts are picked for a clean start in workshop.", "XT WCO", 30],
    ["Ensure that all 3rd party services are completed before assembly start.", "XT WCO", 30],
    ["GR on 3rd PO", "XT WCO", 30],
    ["Assembly of tubing on XT Frame performed", "XT PCO", 30],
    ["Test of XT Frame performed", "XT PCO", 30],
    ["Verify plan vs. PO date and available resources with WCO / WTL - Hall G, Orbital, Test", "XT PCO", 30],
    ["Verify that all NDT and dimensional reports are in approved status.", "XT PEM", 30],
    ["Ensure that all established QN on XT components are processed and closed down.", "XT PEM", 30],
    ["Ensure that Equipment number is created for assemblies in pre-assembly", "XT PEM", 30],
    ["Create project folder in BOX for assembly with all necessary documentation, procedures, torque sheets.", "XT PEM", 30],
    ["Create traceability list for pre-assembly and assembly and upload to BOX", "XT PEM", 30]
  ],
    [/*GATE 9*/
    ["Kick-off with workshop", "XT PEM", 14],
    ["Assembly XT phase 1 - Torus & Pre-assembly components", "XT WS TL / Supervisor", 14],
    ["Test of Torus performed", "XT WS TL / Supervisor", 14],
    ["Test of M140/M175 performed", "XT WS TL / Supervisor", 14],
    ["Ensure that traceability list is filled out and verified", "XT WS TL / Supervisor", 14],
    ["Ensure that all workshop documentation are filled out correctly", "XT WS TL / Supervisor", 14],
    ["Quality review of workshop documentation, move relevant documents to document controller folder in box", "XT PEM", 14],
    ["Link pre-assembly component equipments to Superior Equipment.", "XT PEM", 14],
    ["CNF of completed workshop operations in Pre-Assembly SO", "XT WS TL / Supervisor", 14],
    ["CNF of completed admin and 3rd party operations in Pre-Assembly SO", "XT PEM", 14],
    ["Create COC for pre-assembly equipments and upload to document controller folder in box", "XT PEM", 14],
    ["Create MRB for pre-assembly components", "Document Controller", 14]
  ],
    [/*GATE 10*/
    ["Kick-off with workshop", "XT PEM", 35],
    ["Assembly XT phase 2 - XT Kit Assembly", "XT WS TL / Supervisor", 35],
    ["Assembly XT phase 3 - Complete XT Assembly before test", "XT WS TL / Supervisor", 35],
    ["Ensure that traceability list is filled out and verified", "XT WS TL / Supervisor", 35],
    ["Ensure that Torque sheets are filled out and correspond with batches in traceability list", "XT WS TL / Supervisor", 35],
    ["Ensure that all workshop documentation are filled out correctly", "XT WS TL / Supervisor", 35],
    ["Quality review of workshop documentation, move relevant documents to document controller folder in box", "XT PEM", 35],
    ["Communicate to WCO which XT equipment that need to be changed to available in SAP.", "XT PEM", 35],
    ["Update status of XT Equipments to available in SAP", "XT WCO", 35],
    ["Link XT component equipments to Superior Equipment.", "XT PEM", 35],
    ["CNF of completed workshop operations in Assembly SO", "XT WS TL / Supervisor", 35],
    ["CNF of completed admin and 3rd party operations in Assembly SO", "XT PEM", 35]
  ],
    [/*GATE 11*/
    ["Finalize Test Center Handover", "XT PEM", 1],
    ["Establish and release test procedure", "TEST PEM", 1],
    ["Scope Test SO", "TEST PEM", 1],
    ["Specify Test Equipment Part Numbers", "TEST PEM", 1],
    ["Verify availability of test Equipment", "Test WCO", 1],
    ["Additional test CPI EQ (if required).", "XT PCO", 1],
    ["Establish SO for preparation of test equipment.", "XT PCO", 1],
    ["Initiate necessary preparation of test equipment", "Test WCO", 1],
    ["Allocate transport skid/lifting Equipment from Company", "XT WCO", 1],
    ["Verify plan vs. PO date and available resources with Test WCO / WTL", "XT PCO", 1]
  ],
    [/*GATE 12*/
    ["Ensure that XT, consumables and test equipment are available in workshop as planned", "Test WCO", 35],
    ["Flushing of XT prior to test (if required)", "Test Workshop Supervisor", 35],
    ["XT Test phase 1 - Instrument and small bore test", "Test Workshop Supervisor", 35],
    ["XT Test phase 2 - Hydrostatic Bore test (Test TH) or Softseal test (Standard TH)", "Test Workshop Supervisor", 35],
    ["XT Test phase 3 - Gas test (Test TH) or M2M seal test (Standard TH)", "Test Workshop Supervisor", 35],
    ["Ensure that all workshop documentation are filled out correctly", "Test Workshop Supervisor", 35],
    ["Ensure that all test equipment is listed in object list in SO", "Test WCO", 35],
    ["CNF of workshop operations in Test SO", "Test Workshop Supervisor", 35],
    ["TECO of Test SO", "XT PEM", 35]
  ],
    [/*GATE 13*/
    ["Establish SO for demob of test equipment.", "XT PCO", 14],
    ["Initiate necessary demob of test equipment", "Test WCO", 14],
    ["Arrange return of test equipment", "Test WCO", 14],
    ["Arrange transport of XT from Test Center to XT workshop", "Test WCO", 14],
    ["Perform Post test Assembly Activities in workshop", "XT WS TL / Supervisor", 14],
    ["Review equipment history - close notifications", "XT PEM", 14],
    ["Create Service Report and S2/M3 for final completion.", "XT PEM", 14],
    ["Create/update SAP Structure", "XT PEM", 14],
    ["Quality review of workshop documentation, move relevant documents to document controller folder in box", "XT PEM", 14],
    ["Ensure completion of all rental", "XT PCO", 14],
    ["Internal MCCR", "XT PEM", 14],
    ["Customer MCCR", "XT PEM", 14],
    ["Prepare XT for transport.", "XT WS TL / Supervisor", 14],
    ["Collect all leftovers from assembly", "XT WS TL / Supervisor", 14],
    ["Specify what to be scrapped, stored, returned to storage or Customer", "XT PEM", 14],
    ["Create overview list over remaining / leftover project specific temp pallets and Equipment", "XT WCO", 14],
    ["Update list from with what to be scrapped, returned to Customer or to be stored", "XT PEM", 14],
    ["Update SAP with information about scrapped equipment numbers", "XT PEM", 14],
    ["Perform actions according to list provided by PEM", "XT WS TL / Supervisor", 14]
  ],
    [/*GATE 14*/
    ["Complete MRB", "Document Controller", 5],
    ["Ship XT to Customer with MMT / DN", "XT WCO", 5],
    ["Move Shipped Equipment in SAP", "XT WCO", 5],
    ["CNF of workshop operations in Assembly SO and other remaining SO", "XT WS TL / Supervisor", 5],
    ["CNF of admin and 3rd party operations in Assembly SO and other remaining SO", "XT PEM", 5],
    ["TECO of Assembly SO and other remaining SO", "XT PEM", 5],
    ["Close project SO", "Project Controller", 5],
    ["Send MRB to Customer", "Document Controller", 5],
    ["Receive MRB in Code 1 from Customer", "Document Controller", 5],
    ["Send Proposal for Final Account and Close out Report", "Project Controller", 5],
    ["Receive Completion Certificate and Acceptance of Final Account", "Project Controller", 5],
    ["Lesson Learned performed", "XT House Manager", 5],
    ["Celebrate delivery of XT", "XT House Manager", 5]
  ],
    
];



  try {
    const body = await readBody(event);
    const { title, progress, plannedDate, POdate, status, PEM, comment } = body;

    var IDobject = await connectAndQuery('SELECT MAX(ID) FROM projectModel')
    ID = IDobject[0]['']
    if(ID === null) {
      ID = 1
    } else {
      ID++
    }
    

    //Oppretter prosjektet
    projects = await connectAndQuery(`INSERT INTO projectModel VALUES (${ID}, '${title}', 0, 1, '${PEM}', 'Sample comment', '01-01-2025', '01-01-2025', 0)`);

    //Looper gjennom gateListe og ligger disse til et nygenerert prosjekt
    for (const gate of gateListe) {
      const gateNR = gate[0];
      const gateName = gate[1];
      const gateID = ID*10000 + gateNR; // Assuming a gateNR will not exceed 9999
      
      await connectAndQuery(`INSERT INTO gateModel VALUES (${gateID}, ${ID}, ${gateNR}, '${gateName}')`);
    }

    //Looper gjennom taskListe og ligger disse til et nygenerert prosjekt
    var gatecounter = 1;
    for (const gate of taskListe) {
      var step = 1;
      for (const task of gate) {
        const taskName = task[0];
        const taskPEM = task[1];
        const duration = task[2];
        const taskID = ID*100000000 + gatecounter*10000 + step; // ppppggggtttt lager taskID med gatenr og prosjektID innebakt
        const gateID = ID*10000 + gatecounter;

        await connectAndQuery(`INSERT INTO taskModel VALUES (${taskID}, ${ID}, ${gateID}, ${step}, '${taskName}', '${taskPEM}', 1, 0.00, ${duration})`)
        step++;
      }
      gatecounter++;
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
