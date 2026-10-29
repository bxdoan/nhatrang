import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { redis } from '../../lib/redis-config';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  const secret = process.env.BUS_COLLECT_TOKEN;
  if (!secret || !process.env.REDIS_URL) return NextResponse.json({error:'Chưa cấu hình nơi nhận. Bản ghi vẫn được giữ trên thiết bị; hãy xuất file.'},{status:503});
  const supplied = request.headers.get('x-collect-token') || '';
  const a=Buffer.from(secret), b=Buffer.from(supplied);
  if(a.length!==b.length || !timingSafeEqual(a,b)) return NextResponse.json({error:'Mã truy cập không đúng.'},{status:401});
  try {
    const text=await request.text(); if(text.length>10000) return NextResponse.json({error:'Bản ghi quá lớn.'},{status:413});
    const v=JSON.parse(text);
    if(!v || typeof v.id!=='string' || !/^[a-zA-Z0-9-]{10,80}$/.test(v.id) || typeof v.route!=='string' || !v.route.trim() || v.route.length>120 || typeof v.direction!=='string' || !v.direction.trim() || v.direction.length>160 || typeof v.name!=='string' || !v.name.trim() || v.name.length>200 || typeof v.notes!=='string' || v.notes.length>1500 || !Number.isInteger(v.sequence) || v.sequence<1 || v.sequence>1000 || !Number.isFinite(v.lat) || v.lat < -90 || v.lat>90 || !Number.isFinite(v.lng) || v.lng < -180 || v.lng>180 || !Number.isFinite(v.accuracy) || v.accuracy<0 || typeof v.capturedAt!=='string' || !Number.isFinite(Date.parse(v.capturedAt))) return NextResponse.json({error:'Thông tin bản ghi không hợp lệ.'},{status:400});
    const record={id:v.id,route:v.route.trim(),direction:v.direction.trim(),sequence:v.sequence,name:v.name.trim(),notes:v.notes.trim(),lat:v.lat,lng:v.lng,accuracy:v.accuracy,capturedAt:v.capturedAt,receivedAt:new Date().toISOString(),status:'pending_review'};
    await redis.set(`bus-collect:${v.id}`,JSON.stringify(record),'NX');
    return NextResponse.json({ok:true,id:v.id});
  } catch {return NextResponse.json({error:'Chưa gửi được. Bản ghi vẫn được giữ trên thiết bị.'},{status:503});}
}
