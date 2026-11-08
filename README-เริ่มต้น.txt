GAME AI — ชุดเริ่มต้นสำหรับ iPhone

ไฟล์ในชุด:
- index.html: หน้าตาและระบบแชท
- manifest.webmanifest: ข้อมูลเว็บแอป
- sw.js: แคชสำหรับเปิดแบบ PWA
- icon.svg: ไอคอน
- worker.js: ตัวเชื่อม Cloudflare Workers AI

ข้อจำกัดสำคัญ:
1) หน้านี้ยังไม่ตอบด้วย AI จนกว่าจะเผยแพร่ worker.js และเชื่อม Workers AI binding ชื่อ AI
2) ใน index.html ต้องเปลี่ยน API_URL จาก "./api" เป็น URL ของ Cloudflare Worker ที่ได้หลัง Deploy เช่น https://ชื่อ-worker.ชื่อบัญชี.workers.dev
3) อย่าใส่ API token หรือรหัสผ่านลงใน index.html หรือส่งให้ผู้อื่น
4) Workers AI มีโควต้า/ข้อจำกัดตามบัญชีและรุ่นโมเดล อาจมีการเปลี่ยนแปลง
5) การใช้ GitHub Pages ต้องเปิด Pages จาก Settings > Pages > Deploy from a branch > main > /(root)

ขั้นตอนทำผ่าน iPhone:
A. แตกไฟล์ ZIP ด้วยแอป Files
B. เข้า GitHub ใน Safari แล้วสร้าง repository ชื่อ game-ai
C. ใช้ Add file > Upload files เพื่ออัปโหลดไฟล์หน้าเว็บ (index.html, manifest.webmanifest, sw.js, icon.svg) แล้ว Commit
D. เปิด GitHub Pages ตามด้านบน
E. เปิด Cloudflare Dashboard ใน Safari > Workers & Pages > Create > Worker แล้วสร้าง Worker
F. วางโค้ด worker.js ใน editor ของ Worker แล้ว Deploy
G. ใน Worker Settings > Bindings เพิ่ม Workers AI binding ชื่อ AI แล้วบันทึก/Deploy ใหม่
H. คัดลอก URL ของ Worker แล้วกลับไปแก้ index.html เปลี่ยน API_URL เป็น URL นั้น จากนั้น Commit การแก้ไข
I. เปิด URL GitHub Pages ใน Safari > Share > Add to Home Screen

หมายเหตุ:
- หาก Cloudflare Dashboard บนมือถือใช้งานยาก ให้เปิดเมนู aA ใน Safari แล้วเลือก Request Desktop Website
- ถ้ารุ่นโมเดลที่ระบุไม่พร้อมใช้งานในบัญชี ให้เลือกโมเดล text generation ที่ Workers AI รองรับในขณะนั้น และแก้ชื่อโมเดลใน worker.js
