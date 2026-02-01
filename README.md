หมายเหตุ: โปรเจกต์นี้อยู่ในระหว่างการพัฒนาและปรับปรุงโครงสร้าง (v2 Refactor) 

# Shopma Backend V2 

Shopma Backend v2 คือระบบ RESTful API สำหรับแพลตฟอร์ม Shopma 
โดยเวอร์ชันนี้ให้ความสำคัญกับ Clean Architecture และ Type Safety พร้อมระบบ Validation และ Testability 
ที่ครอบคลุมตามมาตรฐานการพัฒนา Backend 

---

## Features 
- ระบบยืนยันตัวตนและกำหนดสิทธิ์: รองรับการทำ Authentication และ Authorization ด้วยมาตรฐาน JWT
- การควบคุมการเข้าถึงตามบทบาท (RBAC): แยกสิทธิ์การใช้งานชัดเจนระหว่าง Admin และ User
- ระบบจัดการสินค้าและคำสั่งซื้อ: API สำหรับบริหารจัดการข้อมูลสินค้าและรายการสั่งซื้อแบบครบวงจร
- การจัดการหลักฐานการชำระเงิน: รองรับการอัปโหลดและตรวจสอบสลิปการโอนเงิน
- ระบบติดตามสถานะคำสั่งซื้อ: ติดตามความคืบหน้าของออเดอร์
- การจัดการข้อผิดพลาดแบบรวมศูนย์: ระบบ Centralized Error Handling เพื่อการแจ้งเตือน Error ที่สม่ำเสมอและง่ายต่อการ Debug
- การทดสอบระบบ: ทำ Unit และ Service Testing ผ่าน Vitest
- การตรวจสอบความถูกต้องของข้อมูล: ใช้ Zod ในการทำ Input Validation เพื่อความปลอดภัยและความถูกต้องของข้อมูล

---

## Tech Stack
- Runtime & Language: Node.js และ TypeScript เพื่อความปลอดภัยของข้อมูลและลดข้อผิดพลาดจากการเขียนโปรแกรม
- Framework: Express.js ในการสร้าง RESTful API ที่มีโครงสร้างยืดหยุ่น
- Database & ORM: PostgreSQL และใช้งาน Prisma ORM เพื่อการจัดการฐานข้อมูลอย่างมีประสิทธิภาพ
- Security: ระบบยืนยันตัวตนด้วย JWT (JSON Web Token)
- Validation: ใช้ Zod ในการตรวจสอบความถูกต้องของข้อมูล (Input Validation)
- Testing: ทดสอบระบบด้วย Vitest ซึ่งมีความรวดเร็วและแม่นยำสูง
---

## Installation & Setup

### Requirements
- Node.js
- npm
- Prisma 

### Setup
```bash
git clone https://github.com/burapa-nakhowong/shopma-backend-v2
cd shopma-backend-v2

npm install

# Prisma
npx prisma migrate dev
npx prisma generate

# Development
npm run dev

```
----

##  Learning Outcomes
โปรเจกต์นี้ถูกพัฒนาขึ้นเป็นเวอร์ชันปรับปรุง (v2) โดยมีวัตถุประสงค์เพื่อแก้ไขข้อจำกัดด้านโครงสร้างและการออกแบบที่พบใน Shopma Backend v1
ในเวอร์ชันแรก Business Logic ส่วนใหญ่ถูกเขียนไว้ใน Controller ซึ่งส่งผลให้โค้ดผูกติดกันเกินไป (Tightly Coupled) และนำกลับมาใช้ใหม่ได้ยาก

จากบทเรียนดังกล่าว ในเวอร์ชันนี้ตั้งใจเน้นๆไปที่:
- การแยกส่วนการทำงาน (Refactoring): ย้าย Business Logic ไปไว้ใน Service Layer โดยเฉพาะ
- โครงสร้างโค้ดที่ดีขึ้น: ปรับปรุงการแบ่งส่วนความรับผิดชอบของโค้ด (Separation of Concerns) ให้ชัดเจน
- ความง่ายในการดูแลและขยายระบบ: เพิ่ม Maintainability และ Scalability เพื่อรองรับการเติบโตในอนาคต
- มาตรฐานระดับสากล: ประยุกต์ใช้แนวทางปฏิบัติที่ดีที่สุด (Best Practices) ของการพัฒนา Backend
- ความน่าเชื่อถือของระบบ: นำ TypeScript มาใช้เพื่อกำหนด Type อย่างเข้มงวด ลดข้อผิดพลาดในการเขียนโปรแกรม
- การทดสอบระบบ: มั่นใจในความถูกต้องของโค้ดด้วยการทำ Unit และ Service Testing ผ่าน Vitest เพื่อป้องกันข้อผิดพลาดที่อาจเกิดขึ้นจากการแก้ไขโค้ด (Regressions)
- การพัฒนาในครั้งนี้สะท้อนถึงความตั้งใจในการออกแบบระบบใหม่ให้มีความเป็นมืออาชีพ พร้อมสำหรับการใช้งานจริง (Production-ready) โดยอาศัยประสบการณ์จากการเรียนรู้ในอดีต
