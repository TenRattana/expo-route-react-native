README: Database Schema
This document describes the schema for the database used to manage machine questions, forms, and expected results.

Tables and Columns
Machine
MachineID: (Primary Key) Unique identifier for the machine.
MachineName: Name of the machine.
Example Data:

MachineID	MachineName
1	CNC Lathe
2	3D Printer
QuestionMachines
QuestionID: (Primary Key) Unique identifier for the question.
QuestionName: Name of the question.
QuestionType: Type of the question (e.g., Text, Dropdown).
QuestionDataType: Data type of the question (e.g., String, Integer, Date).
DisplayOrder: Order in which the question is displayed.
Example Data:

QuestionID	QuestionName	QuestionType	QuestionDataType	DisplayOrder
1	What is the machine type?	Text	String	1
2	Select machine options	Dropdown	Integer	2
QuestionOptions
OptionID: (Primary Key) Unique identifier for the option.
QuestionID: (Foreign Key) Identifier for the question the option is related to.
OptionName: Name of the option.
OptionValue: Value of the option (often used for Dropdown selections).
DisplayOrder: Order in which the option is displayed.
Example Data:

OptionID	QuestionID	OptionName	OptionValue	DisplayOrder
1	2	Option A	1	1
2	2	Option B	2	2
QuestionType
TypeID: (Primary Key) Unique identifier for the question type.
TypeName: Name of the question type (e.g., Dropdown, Text).
Description: Description of the question type.
Example Data:

TypeID	TypeName	Description
1	Dropdown	Single selection
2	Text	Free text input
ValidationRules
RuleID: (Primary Key) Unique identifier for the rule.
QuestionID: (Foreign Key) Identifier for the question the rule applies to.
RuleName: Name of the rule (e.g., Required, Max Length).
RuleValue: Value of the rule (e.g., 255 for maximum length).
Example Data:

RuleID	QuestionID	RuleName	RuleValue
1	1	Required	Yes
2	2	MaxLength	100
MatchQuestion
MQuestionID: (Primary Key) Unique identifier for the question-machine mapping.
MachineID: (Foreign Key) Identifier for the machine.
QuestionID: (Foreign Key) Identifier for the question.
FormID: (Foreign Key) Identifier for the form.
Example Data:

MQuestionID	MachineID	QuestionID	FormID
1	1	1	1
2	1	2	1
Form
FormID: (Primary Key) Unique identifier for the form.
FormName: Name of the form.
Example Data:

FormID	FormName
1	Machine Setup
2	Maintenance
ExpectedResult
ExpectedResultID: (Primary Key) Unique identifier for the expected result.
MachineID: (Foreign Key) Identifier for the machine.
QuestionID: (Foreign Key) Identifier for the question.
ExpectedResult: The expected result or answer for the question.
CreateDate: Date when the expected result was created.
Example Data:

ExpectedResultID	MachineID	QuestionID	ExpectedResult	CreateDate
1	1	1	CNC Lathe	2024-08-01
2	1	2	Option A	2024-08-01
This README provides an overview of the database schema, including descriptions and examples of the data stored in each table. It serves as a guide for understanding the structure and relationships within the database.
