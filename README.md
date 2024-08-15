# Database Schema and Sample Data

## ตารางและคอลัมน์

### `Machine`
- **MachineID**: (Primary Key) รหัสเครื่องจักรที่ใช้ในการระบุเครื่องจักรแต่ละตัว
- **MachineName**: ชื่อของเครื่องจักร
- **Description**: คำอธิบายเครื่องจักรแต่ละตัว
- **DisplayOrder**: ลำดับการแสดงผลของเครื่องจักร

**ข้อมูลตัวอย่าง:**

| MachineID | MachineName | Description | DisplayOrder |
|-----------|-------------|-------------|--------------|
| M0001     | SEPARATOR    | NULL        | 1            |
| M0002     | MILL A       | NULL        | 2            |

### `QuestionMachines`
- **QuestionID**: (Primary Key) รหัสคำถามที่ใช้ในการระบุคำถามแต่ละข้อ
- **QuestionName**: ชื่อของคำถาม
- **QuestionTypeID**: (Foreign Key) รหัสประเภทคำถามที่ใช้ในการระบุประเภทคำถาม
- **QuestionDataType**: ประเภทข้อมูลของคำถาม (เช่น ข้อความ, ตัวเลข, วันที่)
- **DisplayOrder**: ลำดับการแสดงผลของคำถาม

**ข้อมูลตัวอย่าง:**

| QuestionID | QuestionName                   | QuestionTypeID | QuestionDataType | DisplayOrder |
|------------|--------------------------------|----------------|------------------|--------------|
| Q0001      | ปัญหาที่พบ                     | T0002          | String           | 1            |
| Q0002      | ช่องระบาย A ข้าวดีปนหรือไม่    | T0001          | Integer          | 2            |

### `QuestionOptions`
- **OptionID**: (Primary Key) รหัสตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **OptionName**: ชื่อตัวเลือก

**ข้อมูลตัวอย่าง:**

| OptionID | OptionName |
|----------|------------|
| O0001    | ปน        | 
| O0002    | ไม่ปน      |

### `MatchQuestionOptions`
- **MOptionID**: (Primary Key) รหัสตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **QuestionID**: (Foreign Key) รหัสคำถามที่ตัวเลือกนี้เกี่ยวข้อง
- **OptionID**: (Foreign Key) รหัสคำถามตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **OptionValue**: ค่าของตัวเลือก
- **Description**: คำอธิบายแต่ละตัวเลือก
- **DisplayOrder**: ลำดับการแสดงผลของตัวเลือก

**ข้อมูลตัวอย่าง:**

| MOptionID | QuestionID | OptionID | OptionValue | Description | DisplayOrder |
|-----------|------------|----------|-------------|-------------|--------------|
| O0001     | Q0002      | O0001    | 1           | NULL        | 1            |
| O0002     | Q0002      | O0002    | 2           | NULL        | 2            |

### `QuestionType`
- **TypeID**: (Primary Key) รหัสประเภทคำถามที่ใช้ในการระบุประเภทคำถาม
- **TypeName**: ชื่อประเภทคำถาม (เช่น Dropdown, Text)
- **Description**: คำอธิบายประเภทคำถาม

**ข้อมูลตัวอย่าง:**

| TypeID | TypeName    | Description        |
|--------|-------------|--------------------|
| T0001  | DROPDOWN    | Single selection   |
| T0002  | TEXT_INPUT  | Free text input    |

### `ValidationRules`
- **RuleID**: (Primary Key) รหัสกฎที่ใช้ในการระบุแต่ละกฎ
- **QuestionID**: (Foreign Key) รหัสคำถามที่กฎนี้ใช้
- **RuleName**: ชื่อของกฎ (เช่น Required, Max Length)
- **RuleValue**: ค่าของกฎ (เช่น 255 สำหรับความยาวสูงสุด)

**ข้อมูลตัวอย่าง:**

| RuleID | QuestionID | RuleName  | RuleValue |
|--------|------------|-----------|-----------|
| R0001  | Q0001      | Required  | Yes       |
| R0002  | Q0002      | MaxLength | 100       |

### `MatchQuestion`
- **MQuestionID**: (Primary Key) รหัสการจับคู่คำถามกับเครื่องจักร
- **MachineID**: (Foreign Key) รหัสเครื่องจักร
- **QuestionID**: (Foreign Key) รหัสคำถาม
- **FormID**: (Foreign Key) รหัสฟอร์ม

**ข้อมูลตัวอย่าง:**

| MQuestionID | MachineID | QuestionID |
|-------------|-----------|------------|
| MQ0001      | M0001     | Q0001      |
| MQ0002      | M0001     | Q0002      | 

### `Form`
- **FormID**: (Primary Key) รหัสฟอร์มที่ใช้ในการระบุฟอร์มแต่ละชุด
- **FormName**: ชื่อของฟอร์ม

**ข้อมูลตัวอย่าง:**

| FormID | FormName      |
|--------|---------------|
| F0001  | Check Machine |
| F0002  | Maintenance   |

### `ExpectedResult`
- **ExpectedResultID**: (Primary Key) รหัสผลลัพธ์ที่คาดหวัง
- **MachineID**: (Foreign Key) รหัสเครื่องจักร
- **QuestionID**: (Foreign Key) รหัสคำถาม
- **PrivotID**: (Foreign Key) รหัสสำหรับการ Privot
- **ExpectedResult**: ผลลัพธ์ที่คาดหวังจากคำถามนั้น
- **CreateDate**: วันที่สร้างผลลัพธ์ที่คาดหวัง

**ข้อมูลตัวอย่าง:**

| ExpectedResultID | MachineID | QuestionID | PrivotID   | ExpectedResult   | CreateDate |
|------------------|-----------|------------|------------|------------------|------------|
| 1                | M0001     | Q0001      | P20240801001| เจอจระเข้ในเครื่อง | 2024-08-01 |
| 2                | M0001     | Q0002      | P20240801001| 1                | 2024-08-01 |

## SQL Queries for Creating Tables

```sql
-- Create Machine table
CREATE TABLE Machine (
    MachineID VARCHAR(10) PRIMARY KEY,
    MachineName VARCHAR(255) NOT NULL,
    Description TEXT,
    DisplayOrder INT NOT NULL
);

-- Create QuestionMachines table
CREATE TABLE QuestionMachines (
    QuestionID VARCHAR(10) PRIMARY KEY,
    QuestionName VARCHAR(255) NOT NULL,
    QuestionTypeID VARCHAR(10),
    QuestionDataType VARCHAR(50) NOT NULL,
    DisplayOrder INT NOT NULL,
    FOREIGN KEY (QuestionTypeID) REFERENCES QuestionType(TypeID)
);

-- Create QuestionOptions table
CREATE TABLE QuestionOptions (
    OptionID VARCHAR(10) PRIMARY KEY,
    OptionName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Create MatchQuestionOptions table
CREATE TABLE MatchQuestionOptions (
    MOptionID VARCHAR(10) PRIMARY KEY,
    QuestionID VARCHAR(10),
    OptionID VARCHAR(10),
    OptionValue INT NOT NULL,
    DisplayOrder INT NOT NULL,
    FOREIGN KEY (QuestionID) REFERENCES QuestionMachines(QuestionID),
    FOREIGN KEY (OptionID) REFERENCES QuestionOptions(OptionID)
);

-- Create QuestionType table
CREATE TABLE QuestionType (
    TypeID VARCHAR(10) PRIMARY KEY,
    TypeName VARCHAR(50) NOT NULL,
    Description TEXT
);

-- Create ValidationRules table
CREATE TABLE ValidationRules (
    RuleID VARCHAR(10) PRIMARY KEY,
    QuestionID VARCHAR(10),
    RuleName VARCHAR(50) NOT NULL,
    RuleValue VARCHAR(50) NOT NULL,
    FOREIGN KEY (QuestionID) REFERENCES QuestionMachines(QuestionID)
);

-- Create MatchQuestion table
CREATE TABLE MatchQuestion (
    MQuestionID VARCHAR(10) PRIMARY KEY,
    MachineID VARCHAR(10),
    QuestionID VARCHAR(10),
    FormID VARCHAR(10),
    FOREIGN KEY (MachineID) REFERENCES Machine(MachineID),
    FOREIGN KEY (QuestionID) REFERENCES QuestionMachines(QuestionID),
    FOREIGN KEY (FormID) REFERENCES Form(FormID)
);

-- Create Form table
CREATE TABLE Form (
    FormID VARCHAR(10) PRIMARY KEY,
    FormName VARCHAR(255) NOT NULL
);

-- Create ExpectedResult table
CREATE TABLE ExpectedResult (
    ExpectedResultID VARCHAR(10) PRIMARY KEY,
    MachineID VARCHAR(10),
    QuestionID VARCHAR(10),
    ExpectedResult TEXT NOT NULL,
    CreateDate DATE NOT NULL,
    FOREIGN KEY (MachineID) REFERENCES Machine(MachineID),
    FOREIGN KEY (QuestionID) REFERENCES QuestionMachines(QuestionID)
);
```

## SQL Data ตัวอย่าง
```sql
-- Insert data into Machine table
INSERT INTO Machine (MachineID, MachineName, Description, DisplayOrder) VALUES
('M0001', 'SEPARATOR', NULL, 1),
('M0002', 'MILL A', NULL, 2);

-- Insert data into QuestionType table
INSERT INTO QuestionType (TypeID, TypeName, Description) VALUES
('T0001', 'DROPDOWN', 'Single selection'),
('T0002', 'TEXT_INPUT', 'Free text input');

-- Insert data into QuestionMachines table
INSERT INTO QuestionMachines (QuestionID, QuestionName, QuestionTypeID, QuestionDataType, DisplayOrder) VALUES
('Q0001', 'ปัญหาที่พบ', 'T0002', 'String', 1),
('Q0002', 'ช่องระบาย A ข้าวดีปนหรือไม่', 'T0001', 'Integer', 2);

-- Insert data into QuestionOptions table
INSERT INTO QuestionOptions (OptionID, OptionName, Description) VALUES
('O0001', 'ปน', NULL),
('O0002', 'ไม่ปน', NULL);

-- Insert data into MatchQuestionOptions table
INSERT INTO MatchQuestionOptions (MOptionID, QuestionID, OptionID, OptionValue, Description, DisplayOrder) VALUES
('O0001', 'Q0002', 'O0001', 1, NULL, 1),
('O0002', 'Q0002', 'O0002', 2, NULL, 2);

-- Insert data into ValidationRules table
INSERT INTO ValidationRules (RuleID, QuestionID, RuleName, RuleValue) VALUES
('R0001', 'Q0001', 'Required', 'Yes'),
('R0002', 'Q0002', 'MaxLength', '100');

-- Insert data into MatchQuestion table
INSERT INTO MatchQuestion (MQuestionID, MachineID, QuestionID, FormID) VALUES
('MQ0001', 'M0001', 'Q0001', 'F0001'),
('MQ0002', 'M0001', 'Q0002', 'F0001');

-- Insert data into Form table
INSERT INTO Form (FormID, FormName) VALUES
('F0001', 'Check Machine'),
('F0002', 'Maintenance');

-- Insert data into ExpectedResult table
INSERT INTO ExpectedResult (ExpectedResultID, MachineID, QuestionID, ExpectedResult, CreateDate) VALUES
('1', 'M0001', 'Q0001', 'เจอจระเข้ในเครื่อง', '2024-08-01'),
('2', 'M0001', 'Q0002', '1', '2024-08-01');
```
