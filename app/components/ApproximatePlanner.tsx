'use client';
import {useEffect, useRef, useMemo, useState} from 'react';
import raw from '../data/busResearch.json';
import {CONTACT_INFO} from '../lib/contact-config';
type Stop = {id:string; name:string; lat?:number; lng?:number};
type Direction = {id:string; origin:string|null; destination:string|null; stops:Stop[]};
type Route = {id:string; number:string|null; name:string|null; directions:Direction[]};
type Point = {lat:number;lng:number};
const routes:Route[] = raw;
const distance = (a:Point,b:Point) => {const rad=Math.PI/180; const d=(b.lat-a.lat)*rad, l=(b.lng-a.lng)*rad; const h=Math.sin(d/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(l/2)**2; return Math.round(12742000*Math.asin(Math.sqrt(Math.min(1,h))))};
const located = (s:Stop): s is Stop & Point => typeof s.lat==='number' && typeof s.lng==='number';
type Leg = {route:Route; direction:Direction; board:Stop & Point; alight:Stop & Point; start:number; end:number};
type Journey = {first:Leg; second?:Leg; access:number; transfer:number; last:number};
const label = (r:Route) => `tuyến ${r.number || 'chưa rõ số'}${r.name ? ` · ${r.name}` : ''}`;

export default function ApproximatePlanner() {
 const mapElement=useRef<HTMLDivElement>(null); const map=useRef<any>(null); const drawing=useRef<any>(null);
 const [origin,setOrigin]=useState<Point|null>(null); const [dest,setDest]=useState(''); const [pending,setPending]=useState(false); const [error,setError]=useState(''); const [submitted,setSubmitted]=useState(false);
 const points=useMemo(()=>routes.flatMap(r=>r.directions.flatMap(d=>d.stops.filter(located))),[]);
 const target=points.find(s=>s.id===dest);
 const results=useMemo(()=>{
  if (!submitted || !origin || !target) return [];
  const legs:Leg[]=[];
  for(const route of routes) for(const direction of route.directions) for(let i=0;i<direction.stops.length;i++) {const board=direction.stops[i];if(!located(board))continue; for(let j=i+1;j<direction.stops.length;j++){const alight=direction.stops[j];if(located(alight))legs.push({route,direction,board,alight,start:i,end:j});}}
  // Chọn hai vị trí trạm gần nhất ở mỗi đầu, kể cả khi trạm cách hơn 500 m.
  // Các bản ghi hai chiều có thể cùng tọa độ, nên nhóm theo vị trí trước.
  const nearest = (point: Point, candidates: (Stop & Point)[]) => {
   const locations = new Map<string, number>();
   for (const stop of candidates) {const key = `${stop.lat.toFixed(5)},${stop.lng.toFixed(5)}`; locations.set(key, distance(point, stop));}
   return new Set(Array.from(locations.entries()).sort((a,b) => a[1]-b[1]).slice(0,2).map(([key]) => key));
  };
  const key = (stop: Stop & Point) => `${stop.lat.toFixed(5)},${stop.lng.toFixed(5)}`;
  const startLocations = nearest(origin, legs.map(l=>l.board));
  const endLocations = nearest(target, legs.map(l=>l.alight));
  const first=legs.filter(l=>startLocations.has(key(l.board))), last=legs.filter(l=>endLocations.has(key(l.alight)));
  const journeys:Journey[]=[];
  for(const a of first) {const access=distance(origin,a.board), end=distance(a.alight,target); if(endLocations.has(key(a.alight))) journeys.push({first:a,access,transfer:0,last:end});
   for(const b of last){if(a.route.id===b.route.id)continue; const transfer=distance(a.alight,b.board); if(transfer<=500) journeys.push({first:a,second:b,access,transfer,last:distance(b.alight,target)});}}
  return journeys.sort((a,b)=>Number(!!a.second)-Number(!!b.second)||(a.access+a.transfer+a.last)-(b.access+b.transfer+b.last)).slice(0,5);
 },[submitted,origin,target]);
 const locate=()=>{if(!navigator.geolocation){setError('Trình duyệt không hỗ trợ định vị.');return}setPending(true);setError('');navigator.geolocation.getCurrentPosition(p=>{setOrigin({lat:p.coords.latitude,lng:p.coords.longitude});setPending(false);setSubmitted(false)},()=>{setPending(false);setError('Không lấy được vị trí. Hãy bật quyền vị trí và thử lại.')},{timeout:10000,maximumAge:60000})};
 useEffect(()=>{const timer=setInterval(()=>{if(!window.L || !mapElement.current || map.current)return;clearInterval(timer);const L=window.L;map.current=L.map(mapElement.current).setView([12.24,109.19],12);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map.current);drawing.current=L.layerGroup().addTo(map.current);map.current.on('click',(e:any)=>{setOrigin({lat:e.latlng.lat,lng:e.latlng.lng});setSubmitted(false)});},150);return()=>{clearInterval(timer);map.current?.remove();map.current=null}},[]);
 useEffect(()=>{if(!map.current || !drawing.current || !window.L)return;const L=window.L, layer=drawing.current;layer.clearLayers();const coords:number[][]=[];const mark=(p:Point,text:string)=>{coords.push([p.lat,p.lng]);L.marker([p.lat,p.lng]).addTo(layer).bindTooltip(text)};if(origin)mark(origin,'A · Điểm đi');if(target)mark(target,'B · Điểm đến');const j=results[0];if(j){for(const leg of [j.first,j.second].filter(Boolean) as Leg[]){const path=leg.direction.stops.slice(leg.start,leg.end+1).filter(located).map(p=>[p.lat,p.lng]);L.polyline(path,{color:'#1d4ed8',weight:5}).addTo(layer);coords.push(...path);mark(leg.board,'Lên tuyến '+leg.route.number+' · '+leg.board.name);mark(leg.alight,'Xuống · '+leg.alight.name)}const walks=[[origin,j.first.board],[j.first.alight,j.second?.board || target],...(j.second?[[j.second.alight,target]]:[])];for(const pair of walks)if(pair[0]&&pair[1])L.polyline(pair.map(p=>[p!.lat,p!.lng]),{color:'#64748b',dashArray:'6,8',weight:3}).addTo(layer)}if(coords.length)map.current.fitBounds(coords,{padding:[35,35],maxZoom:15})},[origin,target,results]);
 const report=(j:Journey)=>{const body=`Phương án: ${label(j.first.route)} (${j.first.board.name} → ${j.first.alight.name})${j.second ? `; ${label(j.second.route)} (${j.second.board.name} → ${j.second.alight.name})` : ''}\nThông tin cần chỉnh sửa: `; return `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent('Góp ý thông tin xe buýt')}&body=${encodeURIComponent(body)}`};
 return <section className="bg-white rounded-xl shadow-sm p-5 mb-6" aria-labelledby="approx-title"><h2 id="approx-title" className="text-xl font-bold text-slate-900">Gợi ý đường đi gần bạn</h2><p className="mt-2 text-sm text-slate-600">Chọn điểm đi trên bản đồ hoặc dùng vị trí hiện tại, rồi chọn điểm đến.</p><p className="mt-2 text-xs text-slate-500">Chọn hai trạm gần nhất ở mỗi đầu; khoảng cách là ước lượng đường chim bay. <span>Kiểm tra điểm đón trước khi lên xe.</span></p>
 <div ref={mapElement} className="mt-4 h-[420px] rounded-xl overflow-hidden relative z-0" aria-label="Bản đồ hành trình" /><p className="mt-2 text-xs text-slate-600">Bấm bản đồ để chọn điểm đi A. Nét xanh: tuyến xe ước lượng; nét đứt: đoạn đi bộ.</p>
 <form className="mt-4 flex flex-wrap gap-3 items-end" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><button type="button" onClick={locate} disabled={pending} className="rounded-lg border border-blue-700 px-4 py-3 text-blue-700 font-semibold">{pending?'Đang lấy vị trí…':origin?'Cập nhật vị trí':'Dùng vị trí hiện tại'}</button><label className="flex-1 min-w-[220px] text-sm font-semibold text-slate-700">Điểm đến gần trạm<select required value={dest} onChange={e=>{setDest(e.target.value);setSubmitted(false)}} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3"><option value="">Chọn địa điểm</option>{points.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label><button disabled={!origin} className="rounded-lg bg-blue-700 text-white font-semibold px-5 py-3 disabled:opacity-50">Tìm đường</button></form>{origin && <p className="mt-2 text-sm text-slate-700">Đã lấy vị trí trên thiết bị.</p>}{error && <p role="status" className="mt-2 text-red-700">{error}</p>}
 {submitted && <div aria-live="polite" className="mt-4">{!results.length?<p>Hai trạm gần nhất chưa có tuyến nối phù hợp trong dữ liệu hiện có. Hãy thử điểm khác hoặc xem danh sách trạm theo chiều bên dưới.</p>:<ol className="space-y-3">{results.map((j,i)=><li key={i} className="rounded-lg bg-blue-50 p-4 text-sm text-slate-800"><p className="font-semibold">{j.second?'Đổi xe một lần':'Đi thẳng'} · tổng khoảng {j.access+j.transfer+j.last} m đường chim bay</p><ol className="mt-2 list-decimal pl-5 space-y-1"><li>Đến trạm {j.first.board.name}, cách khoảng {j.access} m.</li><li>Bắt {label(j.first.route)}, chiều {j.first.direction.origin} → {j.first.direction.destination}; xuống tại {j.first.alight.name}.</li>{j.second && <><li>Đi khoảng {j.transfer} m đến {j.second.board.name}; kiểm tra phía đường và trạm thực tế.</li><li>Bắt {label(j.second.route)}, chiều {j.second.direction.origin} → {j.second.direction.destination}; xuống tại {j.second.alight.name}.</li></>}<li>Từ trạm cuối đến địa điểm chọn khoảng {j.last} m; kiểm tra đường đi bộ thực tế.</li></ol><a className="inline-block mt-3 underline text-blue-700" href={report(j)}>Báo thông tin chưa đúng qua email</a></li>)}</ol>}</div>}
 </section>;
}

