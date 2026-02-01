import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "../mocks/prisma";
import * as authService from "../../services/auth/auth.service";
import { AppError } from "../../errors/AppError";
import { Prisma } from "@prisma/client";

vi.mock("bcryptjs", () => ({
    hash: vi.fn(),
}));

vi.mock("../../config/db", () => ({
    default: prisma,
}));


describe("Auth Service - register", () => {

    beforeEach(() => {
        prisma.user.create.mockReset();

    });

    it("สมัครสมาชิกสำเร็จ", async () => {
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
        prisma.user.create.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError(
                "Unique constraint failed",
                {
                    code: "P2002",
                    clientVersion: "5.22.0",
                }
            )
        );

        await expect(
            authService.register({
                name: "admin001",
                username: "admin001",
                password: "123456789"
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});
