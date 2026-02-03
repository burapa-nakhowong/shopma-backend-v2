import { Request, Response, NextFunction } from 'express';

//ดึงข้อมูล สินค้า ทั้งหมด
export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('get all product')
}

//ดึงข้อมูล สินค้า 1 รายการ
export const getSomeProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('get all product')
}


//สร้าง สินค้า
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('create all product')
}


//อัพเดตสินค้า
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('update product')
}

//ลบสินค้า
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('create all product')
}