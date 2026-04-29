const e=require("express"),f=require("node-fetch"),a=e();

a.get("/panchang",async(r,s)=>{
try{
let d=new Date(),y=d.getFullYear(),m=d.getMonth()+1,dt=d.getDate();
let u=`https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=28.0229,73.3119&datetime=${y}-${m}-${dt}`;
let x=await f(u,{headers:{"Authorization":"Bearer YOUR_API_KEY"}});
s.json(await x.json());
}catch(e){s.json({error:1})}
});

a.listen(3000);
