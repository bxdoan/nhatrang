import 'server-only';
import type {ApprovedStop} from './bus-approved';
const url='https://api.github.com/repos/bxdoan/nhatrang/contents/app/data/busApproved.json';
export async function commitApproved(stop:ApprovedStop){
 const token=process.env.GITHUB_BUS_TOKEN;if(!token)throw new Error('MISSING_GITHUB_TOKEN');
 const headers={'Authorization':`Bearer ${token}`,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'};
 for(let attempt=0;attempt<3;attempt++){
  const response=await fetch(url+'?ref=master',{headers,cache:'no-store',signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error('GITHUB_READ_FAILED');
  const file=await response.json();const existing=JSON.parse(Buffer.from(file.content,'base64').toString('utf8').replace(/^\uFEFF/,'')) as ApprovedStop[];
  if(!Array.isArray(existing))throw new Error('INVALID_STATIC_DATA');
  if(existing.some(x=>x.sourceId===stop.sourceId))return;
  const next=[...existing.filter(x=>x.stopId!==stop.stopId),stop].sort((a,b)=>a.stopId.localeCompare(b.stopId));
  const result=await fetch(url,{method:'PUT',headers,body:JSON.stringify({message:`data(bus): approve surveyed stop ${stop.stopId}`,branch:'master',sha:file.sha,content:Buffer.from(JSON.stringify(next,null,2)+'\n').toString('base64')}),signal:AbortSignal.timeout(20000)});
  if(result.ok)return;if(result.status!==409)throw new Error('GITHUB_WRITE_FAILED');
 }throw new Error('GITHUB_CONCURRENT_UPDATE');
}
