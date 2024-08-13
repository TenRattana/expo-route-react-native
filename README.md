## ตารางและคอลัมน์

### `Machine`
- **MachineID**: (Primary Key) รหัสเครื่องจักรที่ใช้ในการระบุเครื่องจักรแต่ละตัว
- **MachineName**: ชื่อของเครื่องจักร

**ข้อมูลตัวอย่าง:**

| MachineID | MachineName |
|-----------|-------------|
| 1         | SEPARATOR |
| 2         | MILL A   |

### `QuestionMachines`
- **QuestionID**: (Primary Key) รหัสคำถามที่ใช้ในการระบุคำถามแต่ละข้อ
- **QuestionName**: ชื่อของคำถาม
- **QuestionType**: ประเภทของคำถาม (เช่น ข้อความ, ตัวเลือก)
- **QuestionDataType**: ประเภทข้อมูลของคำถาม (เช่น ข้อความ, ตัวเลข, วันที่)
- **DisplayOrder**: ลำดับการแสดงผลของคำถาม

**ข้อมูลตัวอย่าง:**

| QuestionID | QuestionName               | QuestionType | QuestionDataType | DisplayOrder |
|------------|----------------------------|--------------|------------------|--------------|
| 1          | ปัญหาที่พบ  | Text         | String           | 1            |
| 2          | ช่องระบาย A ข้าวดีปนหรือไม่    | Dropdown     | Integer          | 2            |

### `QuestionOptions`
- **OptionID**: (Primary Key) รหัสตัวเลือกที่ใช้ในการระบุแต่ละตัวเลือก
- **QuestionID**: (Foreign Key) รหัสคำถามที่ตัวเลือกนี้เกี่ยวข้อง
- **OptionName**: ชื่อตัวเลือก
- **OptionValue**: ค่าของตัวเลือก (มักใช้ในการเก็บค่าตัวเลือกสำหรับ Dropdown)
- **DisplayOrder**: ลำดับการแสดงผลของตัวเลือก

**ข้อมูลตัวอย่าง:**

| OptionID | QuestionID | OptionName   | OptionValue | DisplayOrder |
|----------|------------|--------------|-------------|--------------|
| 1        | 2          | ปน     | 1           | 1            |
| 2        | 2          | ไม่ปน     | 2           | 2            |

### `QuestionType`
- **TypeID**: (Primary Key) รหัสประเภทคำถามที่ใช้ในการระบุประเภทคำถาม
- **TypeName**: ชื่อประเภทคำถาม (เช่น Dropdown, Text)
- **Description**: คำอธิบายประเภทคำถาม

**ข้อมูลตัวอย่าง:**

| TypeID | TypeName  | Description        |
|--------|-----------|--------------------|
| 1      | DROPDOWN  | Single selection   |
| 2      | TEXT_INPUT      | Free text input    |

### `ValidationRules`
- **RuleID**: (Primary Key) รหัสกฎที่ใช้ในการระบุแต่ละกฎ
- **QuestionID**: (Foreign Key) รหัสคำถามที่กฎนี้ใช้
- **RuleName**: ชื่อของกฎ (เช่น Required, Max Length)
- **RuleValue**: ค่าของกฎ (เช่น 255 สำหรับความยาวสูงสุด)

**ข้อมูลตัวอย่าง:**

| RuleID | QuestionID | RuleName  | RuleValue |
|--------|------------|-----------|-----------|
| 1      | 1          | Required  | Yes       |
| 2      | 2          | MaxLength | 100       |

### `MatchQuestion`
- **MQuestionID**: (Primary Key) รหัสการจับคู่คำถามกับเครื่องจักร
- **MachineID**: (Foreign Key) รหัสเครื่องจักร
- **QuestionID**: (Foreign Key) รหัสคำถาม
- **FormID**: (Foreign Key) รหัสฟอร์ม

**ข้อมูลตัวอย่าง:**

| MQuestionID | MachineID | QuestionID | FormID |
|-------------|-----------|------------|--------|
| 1           | 1         | 1          | 1      |
| 2           | 1         | 2          | 1      |

### `Form`
- **FormID**: (Primary Key) รหัสฟอร์มที่ใช้ในการระบุฟอร์มแต่ละชุด
- **FormName**: ชื่อของฟอร์ม

**ข้อมูลตัวอย่าง:**

| FormID | FormName      |
|--------|---------------|
| 1      | Check Machine |
| 2      | Maintenance   |

### `ExpectedResult`
- **ExpectedResultID**: (Primary Key) รหัสผลลัพธ์ที่คาดหวัง
- **MachineID**: (Foreign Key) รหัสเครื่องจักร
- **QuestionID**: (Foreign Key) รหัสคำถาม
- **ExpectedResult**: ผลลัพธ์ที่คาดหวังจากคำถามนั้น
- **CreateDate**: วันที่สร้างผลลัพธ์ที่คาดหวัง

**ข้อมูลตัวอย่าง:**

| ExpectedResultID | MachineID | QuestionID | ExpectedResult | CreateDate |
|------------------|-----------|------------|----------------|------------|
| 1                | 1         | 1          | เจอจระเข้ในเครื่อง      | 2024-08-01 |
| 2                | 1         | 2          | ปน      | 2024-08-01 |

---

