## ตารางและคอลัมน์

### `Machine`
- **MachineID**: (Primary Key) รหัสเครื่องจักรที่ใช้ในการระบุเครื่องจักรแต่ละตัว
- **MachineName**: ชื่อของเครื่องจักร
- **Description**: คำอธิบายเครื่องจักรแต่ละตัว
- **DisplayOrder**: ลำดับการแสดงผลของคำถาม

**ข้อมูลตัวอย่าง:**

| MachineID | MachineName | Description |DisplayOrder |
|-----------|-------------|-------------|-------------|
| M0001         | SEPARATOR ||1|
| M0002         | MILL A   ||2|

### `QuestionMachines`
- **QuestionID**: (Primary Key) รหัสคำถามที่ใช้ในการระบุคำถามแต่ละข้อ
- **QuestionName**: ชื่อของคำถาม
- **QuestionTypeID**: (Foreign Key) รหัสประเภทคำถามที่ใช้ในการระบุประเภทคำถาม
- **QuestionDataType**: ประเภทข้อมูลของคำถาม (เช่น ข้อความ, ตัวเลข, วันที่)
- **DisplayOrder**: ลำดับการแสดงผลของคำถาม

**ข้อมูลตัวอย่าง:**

| QuestionID | QuestionName               | QuestionTypeID | QuestionDataType | DisplayOrder |
|------------|----------------------------|--------------|------------------|--------------|
| Q0001          | ปัญหาที่พบ  | T0002         | String           | 1            |
| Q0002          | ช่องระบาย A ข้าวดีปนหรือไม่    | T0001     | Integer          | 2            |

### `QuestionOptions`
- **OptionID**: (Primary Key) รหัสตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **OptionName**: ชื่อตัวเลือก
- **Description**: คำอธิบายประเภทแต่ละตัวเลือก

**ข้อมูลตัวอย่าง:**

| OptionID | OptionName  | Description  |
|----------|------------|------------|
|O0001        | ปน     || 
| O0002        |ไม่ปน     || 

### `MatchQuestionOptions`
- **MOptionID**: (Primary Key) รหัสตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **QuestionID**: (Foreign Key) รหัสคำถามที่ตัวเลือกนี้เกี่ยวข้อง
- **OptionID**: (Foreign Key) รหัสคำถามตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **OptionValue**: ค่าของตัวเลือก 
- **DisplayOrder**: ลำดับการแสดงผลของตัวเลือก

**ข้อมูลตัวอย่าง:**

| MOptionID | QuestionID | OptionID   | OptionValue | DisplayOrder |
|----------|------------|--------------|-------------|--------------|
|O0001        | Q0002          | O0001     | 1           | 1            |
| O0002        | Q0002          | O0002     | 2           | 2            |

### `QuestionType`
- **TypeID**: (Primary Key) รหัสประเภทคำถามที่ใช้ในการระบุประเภทคำถาม
- **TypeName**: ชื่อประเภทคำถาม (เช่น Dropdown, Text)
- **Description**: คำอธิบายประเภทคำถาม

**ข้อมูลตัวอย่าง:**

| TypeID | TypeName  | Description        |
|--------|-----------|--------------------|
| T0001      | DROPDOWN  | Single selection   |
| T0002      | TEXT_INPUT      | Free text input    |

### `ValidationRules`
- **RuleID**: (Primary Key) รหัสกฎที่ใช้ในการระบุแต่ละกฎ
- **QuestionID**: (Foreign Key) รหัสคำถามที่กฎนี้ใช้
- **RuleName**: ชื่อของกฎ (เช่น Required, Max Length)
- **RuleValue**: ค่าของกฎ (เช่น 255 สำหรับความยาวสูงสุด)

**ข้อมูลตัวอย่าง:**

| RuleID | QuestionID | RuleName  | RuleValue |
|--------|------------|-----------|-----------|
| R0001      | Q0001          | Required  | Yes       |
| R0002      | Q0002          | MaxLength | 100       |

### `MatchQuestion`
- **MQuestionID**: (Primary Key) รหัสการจับคู่คำถามกับเครื่องจักร
- **MachineID**: (Foreign Key) รหัสเครื่องจักร
- **QuestionID**: (Foreign Key) รหัสคำถาม
- **FormID**: (Foreign Key) รหัสฟอร์ม

**ข้อมูลตัวอย่าง:**

| MQuestionID | MachineID | QuestionID | FormID |
|-------------|-----------|------------|--------|
| MQ0001           | M0001         | Q0001          | F0001      |
| MQ0002           | M0001         | Q0002          | F0001      |

### `Form`
- **FormID**: (Primary Key) รหัสฟอร์มที่ใช้ในการระบุฟอร์มแต่ละชุด
- **FormName**: ชื่อของฟอร์ม

**ข้อมูลตัวอย่าง:**

| FormID | FormName      |
|--------|---------------|
| F0001      | Check Machine |
| F0002      | Maintenance   |

### `ExpectedResult`
- **ExpectedResultID**: (Primary Key) รหัสผลลัพธ์ที่คาดหวัง
- **MachineID**: (Foreign Key) รหัสเครื่องจักร
- **QuestionID**: (Foreign Key) รหัสคำถาม
- **ExpectedResult**: ผลลัพธ์ที่คาดหวังจากคำถามนั้น
- **CreateDate**: วันที่สร้างผลลัพธ์ที่คาดหวัง

**ข้อมูลตัวอย่าง:**

| ExpectedResultID | MachineID | QuestionID | ExpectedResult | CreateDate |
|------------------|-----------|------------|----------------|------------|
| ER0001                | M0001         | Q0001          | เจอจระเข้ในเครื่อง      | 2024-08-01 |
| ER0002                | M0001         | Q0002          | ปน      | 2024-08-01 |

---

