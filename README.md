# Database Schema and Sample Data

This README provides the SQL schema for creating tables and inserting sample data into the database. The schema is designed to support dynamic forms and validation in a database environment.

## Schema Definition

### Create Tables

```sql
-- Create Table Machine
CREATE TABLE Machine (
    MachineID VARCHAR(10) PRIMARY KEY,
    MachineName VARCHAR(255),
    Description TEXT,
    DisplayOrder INT
);

-- Create Table QuestionType
CREATE TABLE QuestionType (
    TypeID VARCHAR(10) PRIMARY KEY,
    TypeName VARCHAR(50)
);

-- Create Table DataType
CREATE TABLE DataType (
    DataTypeID VARCHAR(10) PRIMARY KEY,
    DataTypeName VARCHAR(50)
);

-- Create Table Questions
CREATE TABLE Questions (
    QuestionID VARCHAR(10) PRIMARY KEY,
    QuestionName VARCHAR(255)
);

-- Create Table MatchQuestionMachine
CREATE TABLE MatchQuestionMachine (
    ID INT IDENTITY PRIMARY KEY,
    MOptionID VARCHAR(10),
    MachineID VARCHAR(10),
    QuestionID VARCHAR(10),
    TypeID VARCHAR(10),
    DataTypeID VARCHAR(10),
    IsActive BIT,
    DisplayOrder INT,
    FOREIGN KEY (MachineID) REFERENCES Machine(MachineID),
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (TypeID) REFERENCES QuestionType(TypeID),
    FOREIGN KEY (DataTypeID) REFERENCES DataType(DataTypeID)
);

-- Create Table QuestionOptions
CREATE TABLE QuestionOptions (
    OptionID VARCHAR(10) PRIMARY KEY,
    OptionName VARCHAR(255)
);

-- Create Table MatchQuestionOptions
CREATE TABLE MatchQuestionOptions (
    ID INT IDENTITY PRIMARY KEY,
    MOptionID VARCHAR(10),
    QuestionID VARCHAR(10),
    OptionID VARCHAR(10),
    OptionValue INT,
    Description TEXT,
    DisplayOrder INT,
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (OptionID) REFERENCES QuestionOptions(OptionID)
);

-- Create Table ValidationRules
CREATE TABLE ValidationRules (
    RuleID VARCHAR(10) PRIMARY KEY,
    RuleName VARCHAR(50),
    RuleValue VARCHAR(50)
);

-- Create Table MatchValidationRules
CREATE TABLE MatchValidationRules (
    ID INT IDENTITY PRIMARY KEY,
    MRuleID VARCHAR(10),
    QuestionID VARCHAR(10),
    RuleID VARCHAR(10),
    Description TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (RuleID) REFERENCES ValidationRules(RuleID)
);

-- Create Table ExpectedResult
CREATE TABLE ExpectedResult (
    ID INT IDENTITY PRIMARY KEY,
    ExpectedResultID VARCHAR(50),
    MachineID VARCHAR(10),
    QuestionID VARCHAR(10),
    ExpectedResult TEXT,
    CreateDate DATE,
    FOREIGN KEY (MachineID) REFERENCES Machine(MachineID),
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
);
```

### Insert data
```sql
-- Insert data into Machine
INSERT INTO Machine (MachineID, MachineName, Description, DisplayOrder)
VALUES
('M0001', 'SEPARATOR', 'Separator machine for material processing', 1),
('M0002', 'MILL A', 'Milling machine A', 2);

-- Insert data into QuestionType
INSERT INTO QuestionType (TypeID, TypeName)
VALUES
('T0001', 'DROPDOWN'),
('T0002', 'TEXT_INPUT');

-- Insert data into DataType
INSERT INTO DataType (DataTypeID, DataTypeName)
VALUES
('DT0001', 'String'),
('DT0002', 'Integer'),
('DT0003', 'Date');

-- Insert data into Questions
INSERT INTO Questions (QuestionID, QuestionName)
VALUES
('Q0001', 'Problem Found'),
('Q0002', 'Is channel A contaminated with good grain?');

-- Insert data into MatchQuestionMachine
INSERT INTO MatchQuestionMachine (MOptionID, MachineID, QuestionID, TypeID, DataTypeID, IsActive, DisplayOrder)
VALUES
('MQM0001', 'M0001', 'Q0001', 'T0002', 'DT0001', 0, 1),
('MQM0002', 'M0001', 'Q0002', 'T0001', 'DT0002', 0, 2);

-- Insert data into QuestionOptions
INSERT INTO QuestionOptions (OptionID, OptionName)
VALUES
('O0001', 'Contaminated'),
('O0002', 'Not Contaminated');

-- Insert data into MatchQuestionOptions
INSERT INTO MatchQuestionOptions (MOptionID, QuestionID, OptionID, OptionValue, Description, DisplayOrder)
VALUES
('MQM0001', 'Q0002', 'O0001', 1, 'Grain is contaminated', 1),
('MQM0001', 'Q0002', 'O0002', 2, 'Grain is not contaminated', 2);

-- Insert data into ValidationRules
INSERT INTO ValidationRules (RuleID, RuleName, RuleValue)
VALUES
('R0001', 'Required', 'Yes'),
('R0002', 'MaxLength', '255');

-- Insert data into MatchValidationRules
INSERT INTO MatchValidationRules (MRuleID, QuestionID, RuleID, Description)
VALUES
('MVR0001', 'Q0001', 'R0001', 'This question is required'),
('MVR0002', 'Q0002', 'R0002', 'Maximum length of the response is 255 characters');

-- Insert data into ExpectedResult
INSERT INTO ExpectedResult (ExpectedResultID, MachineID, QuestionID, ExpectedResult, CreateDate)
VALUES
('ER0001', 'M0001', 'Q0001', 'Found contaminated grain', '2024-08-01'),
('ER0002', 'M0001', 'Q0002', 'Found 1 grain', '2024-08-01');
```
