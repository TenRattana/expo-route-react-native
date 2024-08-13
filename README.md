Machine
-MachineID: รหัสเครื่องจักร
-MachineName: ชื่อเครื่องจักร
-CreateDate: วันที่สร้าง

QuestionMachines
-QuestionID: รหัสคำถาม
-QuestionName: ชื่อคำถาม
-QuestionType: ประเภทคำถาม (เช่น แบบตัวเลือก, แบบข้อความ)
-IsRequired: ว่าคำถามเป็นข้อบังคับหรือไม่
-DisplayOrder: ลำดับการแสดงผล

QuestionOptions
-OptionID: รหัสตัวเลือก
-QuestionID: รหัสคำถามที่ตัวเลือกเกี่ยวข้อง
-OptionName: ชื่อตัวเลือก
-OptionValue: ค่าของตัวเลือก
-DisplayOrder: ลำดับการแสดงผลตัวเลือก

QuestionType
-TypeID: รหัสประเภทคำถาม
-TypeName: ชื่อประเภทคำถาม
-Description: คำอธิบายประเภทคำถาม

ValidationRules
-RuleID: รหัสกฎ
-QuestionID: รหัสคำถามที่กฎใช้
-RuleName: ชื่อกฎ
-RuleValue: ค่าของกฎ

MatchQuestion
-MQuestionID: รหัสการจับคู่คำถาม
-MachineID: รหัสเครื่องจักร
-QuestionID: รหัสคำถาม
-FormID: รหัสฟอร์ม

Form
-FormID: รหัสฟอร์ม
-FormName: ชื่อฟอร์ม

ExpectedResult
-ExpectedResultID: รหัสผลลัพธ์ที่คาดหวัง
-MachineID: รหัสเครื่องจักร
-QuestionID: รหัสคำถาม
-ExpectedResult: ผลลัพธ์ที่คาดหวัง
-CreateDate: วันที่สร้าง
