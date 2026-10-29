import {createHash,timingSafeEqual} from 'crypto';
import {redis} from './redis-config';
export async function surveyAuth(request:Request, owner=false){
 const secret=process.env[owner?'BUS_REVIEW_TOKEN':'BUS_COLLECT_TOKEN'];
 if(!secret || !process.env.REDIS_URL)return 503;
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';
 const key=`survey-auth:${owner?'owner':'worker'}:${createHash('sha256').update(ip).digest('hex').slice(0,24)}:${Math.floor(Date.now()/900000)}`;
 const attempts=Number(await redis.get(key)||'0');
 if(attempts>=30)return 429;
 const a=Buffer.from(secret),b=Buffer.from(request.headers.get('x-collect-token')||'');
 if(a.length===b.length&&timingSafeEqual(a,b))return 200;
 await redis.eval("local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n",1,key);
 return 401;
}
