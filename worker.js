// Cloudflare Worker: bind Workers AI as a binding named AI.
const cors = {
 "Access-Control-Allow-Origin": "*",
 "Access-Control-Allow-Methods": "POST, OPTIONS",
 "Access-Control-Allow-Headers": "Content-Type"
};
export default {
 async fetch(request, env) {
  if (request.method === "OPTIONS") return new Response(null, {headers:cors});
  if (request.method !== "POST") return Response.json({error:"Method not allowed"},{status:405,headers:cors});
  try {
   const body = await request.json();
   const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
   const safeMessages = messages.filter(m => ["user","assistant"].includes(m.role) && typeof m.content === "string").map(m=>({role:m.role,content:m.content.slice(0,6000)}));
   const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
     {role:"system",content:"คุณคือ GAME AI ผู้ช่วยส่วนตัว ตอบเป็นภาษาไทยอย่างชัดเจน สุภาพ เป็นประโยชน์ และยอมช่วยในหัวข้อที่หลากหลาย หากไม่ทราบให้บอกตรงๆ ห้ามอ้างว่าทำสิ่งที่ยังไม่ได้ทำ"},
     ...safeMessages
    ]
   });
   return Response.json({response:result.response || "ขออภัย ยังสร้างคำตอบไม่ได้"},{headers:cors});
  } catch (err) {
   return Response.json({error:"AI request failed",detail:String(err)},{status:500,headers:cors});
  }
 }
};