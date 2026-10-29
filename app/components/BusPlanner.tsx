'use client';
import { useState } from 'react';
import stops from '../data/busStops.json';
import routes from '../data/busRoutes.json';

export default function BusPlanner() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const direct = from && to && from !== to ? routes.filter(r => r.stops.includes(from) && r.stops.includes(to)).sort((a,b) => a.fare - b.fare) : [];
  const options = stops.map(s => <option key={s.id} value={s.id}>{s.name}</option>);
  return <section className="bg-white rounded-xl shadow-sm p-5 mb-6" aria-labelledby="planner-title">
    <h2 id="planner-title" className="text-xl font-bold text-slate-900">Tìm tuyến xe buýt</h2>
    <p className="text-sm text-slate-600 mt-1">Chọn hai trạm để tìm tuyến đi qua cả điểm đầu và điểm đến.</p>
    <form className="grid gap-3 md:grid-cols-[1fr_1fr_auto] mt-4 items-end" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
      <label className="text-sm font-medium text-slate-700">Điểm đi<select required value={from} onChange={e => {setFrom(e.target.value); setSubmitted(false)}} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3"><option value="">Chọn trạm đi</option>{options}</select></label>
      <label className="text-sm font-medium text-slate-700">Điểm đến<select required value={to} onChange={e => {setTo(e.target.value); setSubmitted(false)}} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3"><option value="">Chọn trạm đến</option>{options}</select></label>
      <button className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Tìm tuyến</button>
    </form>
    <div aria-live="polite" className="mt-4 text-sm text-slate-700">{submitted && (from === to ? <p>Vui lòng chọn hai trạm khác nhau.</p> : direct.length ? <><p className="font-semibold">Tuyến đi qua cả hai trạm, xếp theo giá vé tham khảo:</p><ul className="mt-2 space-y-2">{direct.map(r => <li key={r.id} className="rounded-lg bg-blue-50 p-3"><strong>{r.name}</strong> · {r.fare.toLocaleString('vi-VN')} ₫/lượt · {r.schedule.join(' · ')}</li>)}</ul></> : <p>Chưa tìm thấy tuyến trực tiếp trong dữ liệu hiện có. Hãy thử trạm khác hoặc cân nhắc taxi.</p>)}</div>
    <p className="mt-4 text-xs text-slate-600">Dữ liệu tham khảo từ năm 2025, chưa xác nhận chiều chạy, lịch và giá hiện tại. Vui lòng kiểm tra với nhà xe trước khi đi.</p>
  </section>;
}
