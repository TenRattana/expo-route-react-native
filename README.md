# Database Schema Documentation

This document describes the database schema for the project, including table definitions, example data, and a dbdiagram schema.

## Tables

### `Machine`

Stores information about machines.

```sql
CREATE TABLE Machine (
    MachineID VARCHAR(10) PRIMARY KEY,
    MachineName VARCHAR(255),
    Description TEXT,
    DisplayOrder INT
);

-- Sample Data
INSERT INTO Machine (MachineID, MachineName, Description, DisplayOrder) VALUES
('M0001', 'SEPARATOR', NULL, 1),
('M0002', 'MILL A', NULL, 2);
```
### `QuestionType`

Stores types of questions.
```sql
CREATE TABLE QuestionType (
    TypeID VARCHAR(10) PRIMARY KEY,
    TypeName VARCHAR(50)
);

-- Sample Data
INSERT INTO QuestionType (TypeID, TypeName) VALUES
('T0001', 'DROPDOWN'),
('T0002', 'TEXT_INPUT');
```

### `DataType`
Stores data types for questions.
```sql
CREATE TABLE DataType (
    DataTypeID VARCHAR(10) PRIMARY KEY,
    DataTypeName VARCHAR(50)
);

-- Sample Data
INSERT INTO DataType (DataTypeID, DataTypeName) VALUES
('DT0001', 'String'),
('DT0002', 'Integer');
```
### `Questions`
Stores questions.
```sql
CREATE TABLE Questions (
    QuestionID VARCHAR(10) PRIMARY KEY,
    QuestionName VARCHAR(255),
    TypeID VARCHAR(10),
    DataTypeID VARCHAR(10),
    FOREIGN KEY (TypeID) REFERENCES QuestionType(TypeID),
    FOREIGN KEY (DataTypeID) REFERENCES DataType(DataTypeID)
);

-- Sample Data
INSERT INTO Questions (QuestionID, QuestionName, TypeID, DataTypeID) VALUES
('Q0001', 'ปัญหาที่พบ', 'T0002', 'DT0001'),
('Q0002', 'ช่องระบาย A ข้าวดีปนหรือไม่', 'T0001', 'DT0002');
```
### `MatchQuestionMachine`
Maps questions to machines.
```sql
CREATE TABLE MatchQuestionMachine (
    MOptionID VARCHAR(10) PRIMARY KEY,
    MachineID VARCHAR(10),
    QuestionID VARCHAR(10),
    TypeID VARCHAR(10),
    DataTypeID VARCHAR(10),
    DisplayOrder INT,
    FOREIGN KEY (MachineID) REFERENCES Machine(MachineID),
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (TypeID) REFERENCES QuestionType(TypeID),
    FOREIGN KEY (DataTypeID) REFERENCES DataType(DataTypeID)
);

-- Sample Data
INSERT INTO MatchQuestionMachine (MOptionID, MachineID, QuestionID, TypeID, DataTypeID, DisplayOrder) VALUES
('MQ0001', 'M0001', 'Q0001', 'T0002', 'DT0001', 1),
('MQ0002', 'M0001', 'Q0002', 'T0001', 'DT0002', 2);
```
### `QuestionOptions`
Stores options for questions.
```sql
CREATE TABLE QuestionOptions (
    OptionID VARCHAR(10) PRIMARY KEY,
    OptionName VARCHAR(255)
);

-- Sample Data
INSERT INTO QuestionOptions (OptionID, OptionName) VALUES
('O0001', 'ปน'),
('O0002', 'ไม่ปน');
```
### `MatchQuestionOptions`
Maps options to questions.
```sql
CREATE TABLE MatchQuestionOptions (
    MOptionID VARCHAR(10) PRIMARY KEY,
    QuestionID VARCHAR(10),
    OptionID VARCHAR(10),
    OptionValue INT,
    Description TEXT,
    DisplayOrder INT,
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (OptionID) REFERENCES QuestionOptions(OptionID)
);

-- Sample Data
INSERT INTO MatchQuestionOptions (MOptionID, QuestionID, OptionID, OptionValue, Description, DisplayOrder) VALUES
('MOQ0001', 'Q0002', 'O0001', 1, NULL, 1),
('MOQ0002', 'Q0002', 'O0002', 2, NULL, 2);
```
### `ValidationRules`
Stores validation rules.
```sql
CREATE TABLE ValidationRules (
    RuleID VARCHAR(10) PRIMARY KEY,
    RuleName VARCHAR(50),
    RuleValue VARCHAR(50)
);

-- Sample Data
INSERT INTO ValidationRules (RuleID, RuleName, RuleValue) VALUES
('R0001', 'Required', 'Yes'),
('R0002', 'MaxLength', '100');
```
### `MatchValidationRules`
Maps validation rules to questions.
```sql
CREATE TABLE MatchValidationRules (
    MRuleID VARCHAR(10) PRIMARY KEY,
    QuestionID VARCHAR(10),
    RuleID VARCHAR(10),
    Description TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (RuleID) REFERENCES ValidationRules(RuleID)
);

-- Sample Data
INSERT INTO MatchValidationRules (MRuleID, QuestionID, RuleID, Description) VALUES
('MVR0001', 'Q0001', 'R0001', 'This field is required.'),
('MVR0002', 'Q0002', 'R0002', 'Maximum length of 100 characters.');
```
### `ExpectedResult`
Stores expected results for questions.
```sql
CREATE TABLE ExpectedResult (
    ExpectedResultID VARCHAR(10) PRIMARY KEY,
    MOptionID VARCHAR(10),
    PrivotID VARCHAR(50),
    ExpectedResult TEXT,
    CreateDate DATE,
    FOREIGN KEY (MOptionID) REFERENCES MatchQuestionMachine(MOptionID)
);

-- Sample Data
INSERT INTO ExpectedResult (ExpectedResultID, MOptionID, PrivotID, ExpectedResult, CreateDate) VALUES
('ER0001', 'MQ0001', 'P20240801001', 'เจอจระเข้ในเครื่อง', '2024-08-01'),
('ER0002', 'MQ0002', 'P20240801001', '1', '2024-08-01');
```
----
