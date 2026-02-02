import { describe, it, expect } from "vitest";
import { registerSchema, InputSchema } from "../../validators/auth.schema.js";
describe("registerSchema", () => {
    const point_test = 'Register';
    it(`${point_test} - ผ่านเมื่อข้อมูลถูกต้อง`, () => {
        const result = registerSchema.safeParse({
            name: "admin001",
            username: "admin001",
            password: "123456789",
        });
        expect(result.success).toBe(true);
    });
    it(`${point_test} - ไม่ผ่านเมื่อชื่อ user สั้นเกินไป`, () => {
        const result = registerSchema.safeParse({
            name: "admin",
            username: "admin001",
            password: "123456789",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ username สั้นเกินไป`, () => {
        const result = registerSchema.safeParse({
            name: "admin001",
            username: "admin",
            password: "123456789",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ผ่านเมื่อ password ยาวพอดี 8 ตัว`, () => {
        const result = registerSchema.safeParse({
            name: "admin001",
            username: "admin001",
            password: "12345678",
        });
        expect(result.success).toBe(true);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ password สั้นเกินไป`, () => {
        const result = registerSchema.safeParse({
            name: "admin001",
            username: "admin001",
            password: "1234",
        });
        expect(result.success).toBe(false);
    });
});
describe("InputSchema", () => {
    const point_test = 'Login';
    it(`${point_test} - ผ่านเมื่อข้อมูลถูกต้อง`, () => {
        const result = InputSchema.safeParse({
            username: "shopma001",
            password: "123456789",
        });
        expect(result.success).toBe(true);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ username สั้นเกินไป`, () => {
        const result = InputSchema.safeParse({
            username: "shop",
            password: "123456789",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ password สั้นเกินไป`, () => {
        const result = InputSchema.safeParse({
            username: "shopma",
            password: "12",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ username เป็นค่าว่าง`, () => {
        const result = InputSchema.safeParse({
            username: "",
            password: "123456789",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ password เป็นค่าว่าง`, () => {
        const result = InputSchema.safeParse({
            username: "shopma",
            password: "",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ username เป็นตัวเลข`, () => {
        const result = InputSchema.safeParse({
            username: 123456789,
            password: "123456789",
        });
        expect(result.success).toBe(false);
    });
    it(`${point_test} - ไม่ผ่านเมื่อ password เป็นตัวเลข`, () => {
        const result = InputSchema.safeParse({
            username: "shopma",
            password: 123456789,
        });
        expect(result.success).toBe(false);
    });
});
