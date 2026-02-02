import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "../mocks/prisma.js";
import { AppError } from "../../errors/AppError.js";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import bcrypt from 'bcrypt'
import * as authService from "../../services/auth/auth.service.js";
vi.mock("../../config/db.js", () => ({
    default: prisma,
}));
vi.mock("bcrypt", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        compare: vi.fn(),
    };
});
describe("Auth Service - register", () => {
    beforeEach(() => {
        prisma.user.create.mockReset();
        prisma.user.findUnique.mockReset();
        vi.clearAllMocks();
    });
    it("register กสำเร็จ", async () => {
        //ข้อมูลที่คาดว่าจะถูกส่งกลับมาเมื่อสร้าง user สำเร็จ
        prisma.user.create.mockResolvedValue({
            id: 1,
            name: "admin005",
            username: "admin005",
        });
        //ข้อมูลสำหรับสมัครสมาชิก
        const user = await authService.register({
            name: "admin005",
            username: "admin005",
            password: "123456789",
        });
        expect(user.username).toBe("admin005");
    });
    // ทดสอบกรณี username ซ้ำ
    it("username ซ้ำ → throw AppError 409", async () => {
        prisma.user.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("Unique constraint failed", {
            code: "P2002",
            clientVersion: "5.22.0",
        }));
        await expect(authService.register({
            name: "admin001",
            username: "admin001",
            password: "123456789"
        })).rejects.toBeInstanceOf(AppError);
    });
});
describe("Auth Service - Login", () => {
    beforeEach(() => {
        prisma.user.create.mockReset();
        prisma.user.findUnique.mockReset();
        vi.clearAllMocks();
    });
    it("Login สำเร็จ", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            username: "shopma001",
            password: "$2a$10$VbWqF1d5p6kJH6H0Fz8hUuJ8x9F6jF6jF6jF6jF6jF6jF6jF6jF6j",
            role: "CUSTOMER"
        });
        //จำลองการเปรียบเทียบรหัสผ่านที่ถูกต้อง
        vi.mocked(bcrypt.compare).mockImplementation(async () => true);
        //ข้อมูลสำหรับเข้าสู่ระบบ
        const user = await authService.login({
            username: "shopma001",
            password: "123456789",
        });
        //ผลลัพธ์ที่คาดหวัง
        // expect(user.username).toBe("shopma001");
        expect(user).toMatchObject({
            id: 1,
            username: "shopma001",
            role: "CUSTOMER",
        });
    });
    it("user ไม่พบ", async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        await expect(authService.login({
            username: "shopma000",
            password: "hashed_password",
        })).rejects.toMatchObject({
            message: "User not found",
            statusCode: 404,
        });
    });
    it("password ผิด", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            username: "shopma001",
            password: "hashed_password",
            role: "CUSTOMER",
        });
        vi.mocked(bcrypt.compare).mockImplementation(async () => false);
        await expect(authService.login({
            username: "shopma001",
            password: "wrongpassword",
        })).rejects.toMatchObject({
            message: "Invalid credentials",
            statusCode: 401,
        });
    });
});
