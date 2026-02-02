import app from './app.js';

const PORT = process.env.PORT || 4000;

// เช็คว่าไม่ได้รันบน Vercel (โหมด Development) ค่อยสั่ง listen
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// ต้อง export default app ออกไปด้วย
export default app;