query {

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,2,'RFQ received from Company', 'XT House Manager', 5, 1, 1, 0),
    (1,2,'Verify that all necessary information is available in RFQ or if there is need for clarifications', 'XT House Manager', 5, 1, 1, 0),
    (1,2,'Communicate received RFQ to Project Team. Assign PEM and specify compensation format.', 'XT House Manager', 5, 1, 1, 0),
    (1,2,'Create WBS', 'XT Project Controller', 5, 1, 1, 0),
    (1,2,'Create Service Orders', 'XT PCO', 5, 1, 1, 0),
    (1,2,'Release Quotation Work SO and inform Project Team', 'XT PCO', 5, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,3,'Evaluate RFQ technical scope', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Evaluate Equipment History with open service and quality notifications', 'XT PEM', 14, 1, 1, 0),
    (1,3,'ECN Check and recommended modifications', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish proposal for scope of work', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Clarification of scope with customer (if necessary)', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Define spare part, re-use, repair and 3rd party services needed', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Define spare parts for internal production. Contact Production Planner and xxxx', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Verify if BOM exist for KOS2 for spare parts for internal production.', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish production BOM for KOS2. Update MRP controller and material data', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish Routing for spare parts for internal production. (if not already in place)', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Check M-spec related to NDT requirements for pressure and loadbearing fasteners.', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Ensure that none of the fasteners are Galvanized, Elzik or Phosphate. Find replacement where necessary.', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Scope service orders', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Create <<Spare parts list>> for screening of parts.', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Screening of spare parts (Use <<CTR and screening of parts>> in training material in Teams.', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Estimate hours', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Verify need for new/updated test procedure', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish list of CPI test Equipment and Rental of test equipment', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish CTR and Quotation text.', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish schedule', 'XT PEM', 14, 1, 1, 0),
    (1,3,'CTR Cost input', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Bid meeting', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Establish SAP Quotation', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Quotation approved and signed', 'XT PEM', 14, 1, 1, 0),
    (1,3,'Send quotation to Customer', 'XT PEM', 14, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,4,'Review and communicate PO to Project Team', 'XT House Manager', 30, 1, 1, 0),
    (1,4,'Verify PO amount', 'XT Project Controller', 30, 1, 1, 0),
    (1,4,'Verify plan vs. PO date', 'XT PCO', 30, 1, 1, 0),
    (1,4,'Verify technical scope in PO.', 'XT PEM', 30, 1, 1, 0),
    (1,4,'Close down Quotation Work SO', 'XT Project Controller', 30, 1, 1, 0),
    (1,4,'Finalize Service Orders', 'XT PEM', 30, 1, 1, 0),
    (1,4,'Release Service Orders and Update dates', 'XT PCO', 30, 1, 1, 0),
    (1,4,'Update <<Spare parts list>>. Identify parts with late delivery date. Contact procurement if necessary.', 'XT PCO', 30, 1, 1, 0),
    (1,4,'ASO of Spare parts. Need date 1-2 month before assembly start-up.', 'XT WCO', 30, 1, 1, 0),
    (1,4,'Create Project Folder in Box. Include necessary documentation for Disassemble & Inspection.', 'XT WS TL / Supervisor', 30, 1, 1, 0),
    (1,4,'Create <<3rd party service list>> and <<parts to be scrap list>> for workshop. To be placed in box folder.', 'XT PEM', 30, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,5,'Initiate start-up of project towards workshop', 'XT PCO', 35, 1, 1, 0),
    (1,5,'Arrange transport of XT to workshop according to THI', 'XT WCO', 35, 1, 1, 0),
    (1,5,'Kick-off with Workshop and Technical Support', 'XT PEM', 35, 1, 1, 0),
    (1,5,'Disassemble XT phase 1 - CVB with upper body ready for 3rd party (removal of Upper body)', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Disassemble XT phase 2 - CVB ready for technical support.', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Disassemble XT phase 3 - Complete disassembly scope.', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Fill out information in <<3rd party service list>> and <<parts to be scrap list>>', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Prepare specified components for inspection according to SO and LWI. Find ID.', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Pack dismantled component according to <<3rd party service list>> and <<parts to be scrap list>>', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Arrange shipment/transport from workshop to storage/3rd party', 'XT WCO', 35, 1, 1, 0),
    (1,5,'Inform PEM of issues/challenges or damages discovered during disassembly', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'Evaluation and follow-up of findings during disassembly', 'XT PEM', 35, 1, 1, 0),
    (1,5,'Update scope and 3rd party requisitions based on findings', 'XT PEM', 35, 1, 1, 0),
    (1,5,'Evaluate need for VOR', 'XT PEM', 35, 1, 1, 0),
    (1,5,'CNF of completed workshop operations in Disassembly SO', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,5,'CNF of completed admin and 3rd party operations in Disassembly SO', 'XT PEM', 35, 1, 1, 0),
    (1,5,'TECO of Disassembly SO. Verify that there is no remaining commited cost before TECO.', 'XT PEM', 35, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,6,'<<Task>> technical support', 'XT WS TL / Supervisor', 56, 1, 1, 0),
    (1,6,'Original MRB identified and sorted for CVB, PWB and AWB.', 'XT PEM', 56, 1, 1, 0),
    (1,6,'CVB inspection completed', 'XT PEM', 56, 1, 1, 0),
    (1,6,'PWB inspection completed', 'XT PEM', 56, 1, 1, 0),
    (1,6,'AWB inspection completed', 'XT PEM', 56, 1, 1, 0),
    (1,6,'MBH / Flowloop inspection completed', 'XT PEM', 56, 1, 1, 0),
    (1,6,'AUX Parts inspection completed', 'XT PEM', 56, 1, 1, 0),
    (1,6,'Evaluation and follow-up of findings during Inspection', 'XT PEM', 56, 1, 1, 0),
    (1,6,'Update scope and 3rd party requisitions based on findings', 'XT PEM', 56, 1, 1, 0),
    (1,6,'Complete all 3rd party requisition', 'XT PEM', 56, 1, 1, 0),
    (1,6,'Pack and prepare XT components for storage or shipment to 3rd party', 'XT WS TL / Supervisor', 56, 1, 1, 0),
    (1,6,'Arrange shipment/transport from workshop to storage/3rd party', 'XT WCO', 56, 1, 1, 0),
    (1,6,'Long lead repair items ready for shipment (CVB, Choke, etc)', 'XT WS TL / Supervisor', 56, 1, 1, 0),
    (1,6,'CNF of completed workshop operations in Inspection SO.', 'XT WS TL / Supervisor', 56, 1, 1, 0),
    (1,6,'CNF of completed technical support operations in Inspection SO', 'XT PEM', 56, 1, 1, 0),
    (1,6,'CNF of completed admin and 3rd party operations in Inspection SO', 'XT PEM', 56, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,7,'ASO spare parts that shall be sent to 3rd party - Anodes', 'XT WCO', 90, 1, 1, 0),
    (1,7,'ASO spare parts that shall be sent to 3rd party -  New Spare part for coating', 'XT WCO', 90, 1, 1, 0),
    (1,7,'Arrange Shipment to 3rd party.', 'XT WCO', 90, 1, 1, 0),
    (1,7,'3rd party long leads embedded in Schedule', 'XT PCO', 90, 1, 1, 0),
    (1,7,'Create overview over 3rd party components to be re-inspected by technical support in status sheet.', 'XT PEM', 90, 1, 1, 0),
    (1,7,'Returning 3rd party service components into workshop for Inspection or to storage', 'XT WCO', 90, 1, 1, 0),
    (1,7,'3rd party completed', 'XT PEM', 90, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,8,'Prepare specified components for inspection', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,8,'Create overview of QN number that need to be marked on components', 'XT PEM', 14, 1, 1, 0),
    (1,8,'Ensure that all XT components are marked with QN according to provided info from PEM', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,8,'CVB inspection after weld repair', 'XT PEM', 14, 1, 1, 0),
    (1,8,'PWB inspection after weld repair', 'XT PEM', 14, 1, 1, 0),
    (1,8,'AWB inspection after weld repair', 'XT PEM', 14, 1, 1, 0),
    (1,8,'Inspection after machining of components (flanges etc).', 'XT PEM', 14, 1, 1, 0),
    (1,8,'Approved components to be packed for shipment to 3rd party Coating', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,8,'Shipment to 3rd party coating', 'XT WCO', 14, 1, 1, 0),
    (1,8,'CVB final inspection completed - VT accepted', 'XT PEM', 14, 1, 1, 0),
    (1,8,'PWB final inspection completed - VT accepted', 'XT PEM', 14, 1, 1, 0),
    (1,8,'AWB final inspection completed - VT accepted', 'XT PEM', 14, 1, 1, 0),
    (1,8,'MBH / Flowloop final inspection completed - VT accepted', 'XT PEM', 14, 1, 1, 0),
    (1,8,'AUX Parts final inspection completed - VT accepted', 'XT PEM', 14, 1, 1, 0),
    (1,8,'Approved components to be packed for storage', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,8,'Storage of approved components', 'XT WCO', 14, 1, 1, 0),
    (1,8,'CNF of operations in 3rd party  & Inspection SO', 'XT PEM', 14, 1, 1, 0),
    (1,8,'TECO of 3rd party  & Inspection SO', 'XT PEM', 14, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,9,'Ensure that all spare parts are picked for a clean start in workshop.', 'XT WCO', 30, 1, 1, 0),
    (1,9,'Ensure that all 3rd party services are completed before assembly start.', 'XT WCO', 30, 1, 1, 0),
    (1,9,'GR on 3rd PO', 'XT WCO', 30, 1, 1, 0),
    (1,9,'Assembly of tubing on XT Frame performed', 'XT PCO', 30, 1, 1, 0),
    (1,9,'Test of XT Frame performed', 'XT PCO', 30, 1, 1, 0),
    (1,9,'Verify plan vs. PO date and available resources with WCO / WTL - Hall G, Orbital, Test', 'XT PCO', 30, 1, 1, 0),
    (1,9,'Verify that all NDT and dimensional reports are in approved status.', 'XT PEM', 30, 1, 1, 0),
    (1,9,'Ensure that all established QN on XT components are processed and closed down.', 'XT PEM', 30, 1, 1, 0),
    (1,9,'Ensure that Equipment number is created for assemblies in pre-assembly', 'XT PEM', 30, 1, 1, 0),
    (1,9,'Create project folder in BOX for assembly with all necessary documentation, procedures, torque sheets.', 'XT PEM', 30, 1, 1, 0),
    (1,9,'Create traceability list for pre-assembly and assembly and upload to BOX', 'XT PEM', 30, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,10,'Kick-off with workshop', 'XT PEM', 14, 1, 1, 0),
    (1,10,'Assembly XT phase 1 - Torus & Pre-assembly components', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,10,'Test of Torus performed', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,10,'Test of M140/M175 performed', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,10,'Ensure that traceability list is filled out and verified', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,10,'Ensure that all workshop documentation are filled out correctly', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,10,'Quality review of workshop documentation, move relevant documents to document controller folder in box', 'XT PEM', 14, 1, 1, 0),
    (1,10,'Link pre-assembly component equipments to Superior Equipment.', 'XT PEM', 14, 1, 1, 0),
    (1,10,'CNF of completed workshop operations in Pre-Assembly SO', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,10,'CNF of completed admin and 3rd party operations in Pre-Assembly SO', 'XT PEM', 14, 1, 1, 0),
    (1,10,'Create COC for pre-assembly equipments and upload to document controller folder in box', 'XT PEM', 14, 1, 1, 0),
    (1,10,'Create MRB for pre-assembly components', 'Document Controller', 14, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,11,'Kick-off with workshop', 'XT PEM', 35, 1, 1, 0),
    (1,11,'Assembly XT phase 2 - XT Kit Assembly', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,11,'Assembly XT phase 3 - Complete XT Assembly before test', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,11,'Ensure that traceability list is filled out and verified', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,11,'Ensure that Torque sheets are filled out and correspond with batches in traceability list', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,11,'Ensure that all workshop documentation are filled out correctly', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,11,'Quality review of workshop documentation, move relevant documents to document controller folder in box', 'XT PEM', 35, 1, 1, 0),
    (1,11,'Communicate to WCO which XT equipment that need to be changed to available in SAP.', 'XT PEM', 35, 1, 1, 0),
    (1,11,'Update status of XT Equipments to available in SAP', 'XT WCO', 35, 1, 1, 0),
    (1,11,'Link XT component equipments to Superior Equipment.', 'XT PEM', 35, 1, 1, 0),
    (1,11,'CNF of completed workshop operations in Assembly SO', 'XT WS TL / Supervisor', 35, 1, 1, 0),
    (1,11,'CNF of completed admin and 3rd party operations in Assembly SO', 'XT PEM', 35, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,12,'Finalize Test Center Handover', 'XT PEM', 1, 1, 1, 0),
    (1,12,'Establish and release test procedure', 'TEST PEM', 1, 1, 1, 0),
    (1,12,'Scope Test SO', 'TEST PEM', 1, 1, 1, 0),
    (1,12,'Specify Test Equipment Part Numbers', 'TEST PEM', 1, 1, 1, 0),
    (1,12,'Verify availability of test Equipment', 'Test WCO', 1, 1, 1, 0),
    (1,12,'Additional test CPI EQ (if required).', 'XT PCO', 1, 1, 1, 0),
    (1,12,'Establish SO for preparation of test equipment.', 'XT PCO', 1, 1, 1, 0),
    (1,12,'Initiate necessary preparation of test equipment', 'Test WCO', 1, 1, 1, 0),
    (1,12,'Allocate transport skid/lifting Equipment from Company', 'XT WCO', 1, 1, 1, 0),
    (1,12,'Verify plan vs. PO date and available resources with Test WCO / WTL', 'XT PCO', 1, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,13,'Ensure that XT, consumables and test equipment are available in workshop as planned', 'Test WCO', 35, 1, 1, 0),
    (1,13,'Flushing of XT prior to test (if required)', 'Test Workshop Supervisor', 35, 1, 1, 0),
    (1,13,'XT Test phase 1 - Instrument and small bore test', 'Test Workshop Supervisor', 35, 1, 1, 0),
    (1,13,'XT Test phase 2 - Hydrostatic Bore test (Test TH) or Softseal test (Standard TH)', 'Test Workshop Supervisor', 35, 1, 1, 0),
    (1,13,'XT Test phase 3 - Gas test (Test TH) or M2M seal test (Standard TH)', 'Test Workshop Supervisor', 35, 1, 1, 0),
    (1,13,'Ensure that all workshop documentation are filled out correctly', 'Test Workshop Supervisor', 35, 1, 1, 0),
    (1,13,'Ensure that all test equipment is listed in object list in SO', 'Test WCO', 35, 1, 1, 0),
    (1,13,'CNF of workshop operations in Test SO', 'Test Workshop Supervisor', 35, 1, 1, 0),
    (1,13,'TECO of Test SO', 'XT PEM', 35, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,14,'Establish SO for demob of test equipment.', 'XT PCO', 14, 1, 1, 0),
    (1,14,'Initiate necessary demob of test equipment', 'Test WCO', 14, 1, 1, 0),
    (1,14,'Arrange return of test equipment', 'Test WCO', 14, 1, 1, 0),
    (1,14,'Arrange transport of XT from Test Center to XT workshop', 'Test WCO', 14, 1, 1, 0),
    (1,14,'Perform Post test Assembly Activities in workshop', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,14,'Review equipment history - close notifications', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Create Service Report and S2/M3 for final completion.', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Create/update SAP Structure', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Quality review of workshop documentation, move relevant documents to document controller folder in box', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Ensure completion of all rental', 'XT PCO', 14, 1, 1, 0),
    (1,14,'Internal MCCR', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Customer MCCR', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Prepare XT for transport.', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,14,'Collect all leftovers from assembly', 'XT WS TL / Supervisor', 14, 1, 1, 0),
    (1,14,'Specify what to be scrapped, stored, returned to storage or Customer', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Create overview list over remaining / leftover project specific temp pallets and Equipment', 'XT WCO', 14, 1, 1, 0),
    (1,14,'Update list from with what to be scrapped, returned to Customer or to be stored', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Update SAP with information about scrapped equipment numbers', 'XT PEM', 14, 1, 1, 0),
    (1,14,'Perform actions according to list provided by PEM', 'XT WS TL / Supervisor', 14, 1, 1, 0);

INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
VALUES
    (1,15,'Complete MRB', 'Document Controller', 5, 1, 1, 0),
    (1,15,'Ship XT to Customer with MMT / DN', 'XT WCO', 5, 1, 1, 0),
    (1,15,'Move Shipped Equipment in SAP', 'XT WCO', 5, 1, 1, 0),
    (1,15,'CNF of workshop operations in Assembly SO and other remaining SO', 'XT WS TL / Supervisor', 5, 1, 1, 0),
    (1,15,'CNF of admin and 3rd party operations in Assembly SO and other remaining SO', 'XT PEM', 5, 1, 1, 0),
    (1,15,'TECO of Assembly SO and other remaining SO', 'XT PEM', 5, 1, 1, 0),
    (1,15,'Close project SO', 'Project Controller', 5, 1, 1, 0),
    (1,15,'Send MRB to Customer', 'Document Controller', 5, 1, 1, 0),
    (1,15,'Receive MRB in Code 1 from Customer', 'Document Controller', 5, 1, 1, 0),
    (1,15,'Send Proposal for Final Account and Close out Report', 'Project Controller', 5, 1, 1, 0),
    (1,15,'Receive Completion Certificate and Acceptance of Final Account', 'Project Controller', 5, 1, 1, 0),
    (1,15,'Lesson Learned performed', 'XT House Manager', 5, 1, 1, 0),
    (1,15,'Celebrate delivery of XT', 'XT House Manager', 5, 1, 1, 0);
}


addProjectQuery:



DECLARE @NewProjectID INT;

-- Insert the new project and capture the new project ID
INSERT INTO dbo.projectModel (title, progress, onTime, PEM, COMMENT, POdate, SFdate, archive)
    VALUES ('Project 1', 0, 0, 'Petter Tesdal', '', '2024-12-12', '2024-12-12', 0); -- Updated values
OUTPUT INSERTED.ID INTO @NewProjectID
SELECT title, progress, onTime, PEM, COMMENT, POdate, SFdate, archive 
FROM dbo.projectModel
WHERE ID = 1; -- Assuming 1 is the template project ID

DECLARE @GateMap TABLE (OldGateID INT, NewGateID INT);

-- Insert gates for the new project and map old gate IDs to new gate IDs
INSERT INTO dbo.gateModel (prosjektID, gateNR, gateTitle)
OUTPUT inserted.ID, old.ID INTO @GateMap(NewGateID, OldGateID)
SELECT @NewProjectID, gateNR, gateTitle
FROM dbo.gateModel
WHERE prosjektID = 1; -- Assuming 1 is the template project ID

-- Insert tasks for the new gates based on the mapping from old gates to new gates
INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
SELECT @NewProjectID, gm.NewGateID, tm.title, tm.responsiblePerson, tm.duration, tm.step, tm.onTime, tm.progress
FROM dbo.taskModel tm
JOIN @GateMap gm ON tm.gateID = gm.OldGateID
WHERE tm.prosjektID = 1; -- Assuming 1 is the template project ID



Better one

DECLARE @NewProjectID INT;

-- Insert the new project and capture the new project ID
INSERT INTO dbo.projectModel (title, progress, onTime, PEM, COMMENT, POdate, SFdate, archive)
VALUES ('Project 1', 0, 0, 'Petter Tesdal', '', '2024-12-12', '2024-12-12', 0);

-- Capture the newly inserted project ID
SELECT @NewProjectID = SCOPE_IDENTITY();

-- Insert gates for the new project
INSERT INTO dbo.gateModel (prosjektID, gateNR, gateTitle)
SELECT @NewProjectID, gateNR, gateTitle
FROM dbo.gateModel
WHERE prosjektID = 1;

-- Establish the mapping of old gate IDs to new gate IDs based on gateNR if it is unique per project
DECLARE @GateMap TABLE (OldGateID INT, NewGateID INT);

INSERT INTO @GateMap (OldGateID, NewGateID)
SELECT old.ID, new.ID
FROM dbo.gateModel old
JOIN dbo.gateModel new ON old.gateNR = new.gateNR AND old.prosjektID = 1 AND new.prosjektID = @NewProjectID;

-- Insert tasks for the new gates based on the mapping from old gates to new gates
INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
SELECT @NewProjectID, gm.NewGateID, tm.title, tm.responsiblePerson, tm.duration, tm.step, tm.onTime, tm.progress
FROM dbo.taskModel tm
JOIN @GateMap gm ON tm.gateID = gm.OldGateID
WHERE tm.prosjektID = 1;
