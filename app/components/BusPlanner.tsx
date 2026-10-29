'use client';
import { useState } from 'react';
import useBusRoutes from '../hooks/useBusRoutes';

export default function BusPlanner() {
  const routes=useBusRoutes();
  const available = routes.filter(r => r.directions.length);
  const [routeId, setRouteId] = useState(available[0].id);
  const route = available.find(r => r.id === routeId)!;
  const [directionId, setDirectionId] = useState(route.directions[0].id);
  const direction = route.directions.find(d => d.id === directionId) || route.directions[0];
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searched, setSearched] = useState(false);
  const fromIndex = direction.stops.findIndex(s => s.id === from);
  const toIndex = direction.stops.findIndex(s => s.id === to);
  const valid = fromIndex >= 0 && toIndex > fromIndex;
  const reset = () => {setFrom(''); setTo(''); setSearched(false)};
  return <section className="bg-white rounded-xl shadow-sm p-5 mb-6" aria-labelledby="planner-title">
    <h2 id="planner-title" className="text-xl font-bold text-slate-900">Tìm trạm theo chiều tuyến</h2>
    <p className="mt-2 text-sm text-slate-600">Chọn tuyến và chiều đi, sau đó chọn điểm lên và xuống. Danh sách dựa trên tài liệu công bố, chưa được khảo sát thực địa.</p>
    <div className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Vị trí trạm và điểm chuyển tuyến chưa được xác minh; gợi ý gần bạn phía trên chỉ mang tính tham khảo. Vui lòng kiểm tra vị trí, chiều xe và tình trạng hoạt động với nhà xe.</div>
    <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={e => {e.preventDefault(); setSearched(true)}}>
      <label className="text-sm font-semibold text-slate-700">Tuyến xe<select className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3" value={routeId} onChange={e => {const next=available.find(r=>r.id===e.target.value)!; setRouteId(next.id); setDirectionId(next.directions[0].id); reset()}}>{available.map(r=><option key={r.id} value={r.id}>{r.number} · {r.name}</option>)}</select></label>
      <label className="text-sm font-semibold text-slate-700">Chiều đi<select className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3" value={direction.id} onChange={e=>{setDirectionId(e.target.value); reset()}}>{route.directions.map(d=><option key={d.id} value={d.id}>{d.origin} → {d.destination}</option>)}</select></label>
      <label className="text-sm font-semibold text-slate-700">Điểm lên<select required className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3" value={from} onChange={e=>{setFrom(e.target.value);setSearched(false)}}><option value="">Chọn điểm lên</option>{direction.stops.map((s,i)=><option key={s.id} value={s.id}>{i+1}. {s.name}</option>)}</select></label>
      <label className="text-sm font-semibold text-slate-700">Điểm xuống<select required className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3" value={to} onChange={e=>{setTo(e.target.value);setSearched(false)}}><option value="">Chọn điểm xuống</option>{direction.stops.map((s,i)=><option key={s.id} value={s.id}>{i+1}. {s.name}</option>)}</select></label>
      <button className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 md:justify-self-start">Xem hành trình</button>
    </form>
    <div aria-live="polite" className="mt-4 text-sm text-slate-800">{searched && (valid ? <div className="rounded-lg bg-blue-50 p-4"><p className="font-semibold">Tuyến {route.number}: {direction.origin} → {direction.destination}</p><p className="mt-2">Lên tại <strong>{direction.stops[fromIndex].name}</strong> · xuống tại <strong>{direction.stops[toIndex].name}</strong> ({toIndex-fromIndex} đoạn trạm).</p><details className="mt-3"><summary className="cursor-pointer font-semibold">Xem các trạm trên đoạn này</summary><ol className="mt-2 list-decimal pl-5 space-y-1">{direction.stops.slice(fromIndex,toIndex+1).map(s=><li key={s.id}>{s.name}</li>)}</ol></details><p className="mt-3">{route.operator ? `Nhà xe: ${route.operator}` : 'Nhà xe chưa được xác minh'}{route.phone && <> · <a className="text-blue-700 underline" href={`tel:${route.phone.replace(/\s/g,'')}`}>{route.phone}</a></>}</p><a href={direction.source} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-700 underline">Xem nguồn thứ tự trạm ↗</a></div> : <p>Điểm xuống phải nằm sau điểm lên trong chiều đã chọn. Hãy đổi chiều hoặc chọn lại trạm.</p>)}</div>
    <p className="mt-4 text-xs text-slate-600">Nguồn nghiên cứu ngày 29/10/2026; lịch và tình trạng hoạt động có thể thay đổi. Chưa có giờ đến tại từng trạm.</p>
  </section>;
}
