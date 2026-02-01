import { describe, it, expect } from "vitest";
import { registerSchema } from "../../validators/auth.schema";

describe("registerSchema", () => {

    it("ผ่านเมื่อข้อมูลถูกต้อง", () => {
        const result = registerSchema.safeParse({
            name: "admin001",
            username: "admin001",
            password: "123456789",
        });

        expect(result.success).toBe(true);
    });

    it("ไม่ผ่านเมื่อ password สั้นเกินไป", () => {
        const result = registerSchema.safeParse({
            name: "admin001",
            username: "admin001",
            password: "1234",
        });

        expect(result.success).toBe(false);
    });

});
