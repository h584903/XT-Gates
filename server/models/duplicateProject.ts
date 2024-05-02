CREATE PROCEDURE DuplicateProject
    @OldProjectID INT,
    @NewProjectTitle VARCHAR(255),
    @PEMName VARCHAR(255),
    @PODate DATE,
    @SFDate DATE
AS
BEGIN
    DECLARE @NewProjectID INT;

    -- Insert the new project
    INSERT INTO dbo.projectModel (title, progress, onTime, PEM, COMMENT, POdate, SFdate, archive)
    VALUES (@NewProjectTitle, 0, 0, @PEMName, '', @PODate, @SFDate, 0);

    SELECT @NewProjectID = SCOPE_IDENTITY();

    -- Duplicate gates
    INSERT INTO dbo.gateModel (prosjektID, gateNR, gateTitle)
    SELECT @NewProjectID, gateNR, gateTitle
    FROM dbo.gateModel
    WHERE prosjektID = @OldProjectID;

    -- Duplicate tasks
    INSERT INTO dbo.taskModel (prosjektID, gateID, title, responsiblePerson, duration, step, onTime, progress)
    SELECT @NewProjectID, newGate.ID, title, responsiblePerson, duration, step, onTime, progress
    FROM dbo.taskModel oldTask
    JOIN dbo.gateModel oldGate ON oldTask.gateID = oldGate.ID
    JOIN dbo.gateModel newGate ON oldGate.gateNR = newGate.gateNR AND newGate.prosjektID = @NewProjectID
    WHERE oldTask.prosjektID = @OldProjectID;
END

