# SQL Commands

ALTER TABLE [db_owner].[gateModel]
ADD stage Int;

ALTER TABLE [db_owner].[gateModel]
ADD CONSTRAINT stage
DEFAULT 0 FOR stage;

UPDATE [db_owner].[gateModel]
SET stage = 0

UPDATE [db_owner].[gateModel]
SET stage = 1
WHERE gateNR > 8;


# The view

CREATE VIEW [db_owner].[ProjectProgresses]
AS SELECT p.ID, AVG(t.progress) AS AverageProgress FROM projectModel 
p JOIN taskModel t ON p.ID = t.prosjektID Group BY p.ID

ALTER VIEW [db_owner].[ProjectProgresses]
AS 
SELECT p.ID, g.stage, AVG(t.progress) AS AverageProgress 
FROM projectModel p 
JOIN gateModel g ON p.ID = g.prosjektId 
JOIN taskModel t ON p.ID = t.prosjektID AND g.ID = t.gateID
GROUP BY p.ID, g.stage;


# The select statement
SELECT p.ID, p.team, g.stage, AVG(t.progress) AS AverageProgress 
FROM [db_owner].[projectModel] p 
JOIN [db_owner].[gateModel] g ON p.ID = g.prosjektId 
JOIN [db_owner].[taskModel] t ON p.ID = t.prosjektID AND g.ID = t.gateID
WHERE p.team = 1
GROUP BY p.ID, p.team, g.stage;
