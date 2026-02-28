import postgres from 'postgres';

// ดึง URL จากไฟล์ .env ที่หนูตั้งค่าไว้
const sql = postgres(process.env.DATABASE_URL, { 
  ssl: 'require' 
});

export default sql;