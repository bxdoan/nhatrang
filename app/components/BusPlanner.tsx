'use client';
import { useState } from 'react';
import stops from '../data/busStops.json';
import routes from '../data/busRoutes.json';

type Point = { lat: number; lng: number };
const distance = (a: Point, b: Point) => {
  const rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return Math.round(12742000 * Math.asin(Math.sqrt(h)));
};
const byId = new Map(stops.map(s => [s.id, s]));
const meters = (n: number) => `${n.toLocaleString('vi-VN')} m`;

export default function BusPlanner() {
  const [location, setLocation] = useState<Point | null>(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const locate = () => {
    if (!navigator.geolocation) { setMessage('Trình duyệt không hỗ trợ định vị. Bạn có thể chọn trạm đi.'); return; }
    setLoading(true); setMessage('');
    navigator.geolocation.getCurrentPosition(p => { setLocation({lat: p.coords.latitude, lng: p.coords.longitude}); setOrigin(''); setSubmitted(false); setLoading(false); }, () => { setMessage('Không lấy được vị trí. Hãy cho phép định vị hoặc chọn trạm đi.'); setLoading(false); }, {timeout: 10000, maximumAge: 60000});
  };
  const starts = location ? stops.map(s => ({stop: s, walk: distance(location, s)})).filter(x => x.walk <= 500).sort((a,b) => a.walk-b.walk) : stops.filter(s => s.id === origin).map(stop => ({stop, walk: 0}));
  const end = byId.get(destination);
  type Option = { start: typeof stops[number]; walk: number; first: typeof routes[number]; transferFrom?: typeof stops[number]; transferTo?: typeof stops[number]; transferWalk: number; second?: typeof routes[number] };
  const results: Option[] = [];
  if (submitted && end) for (const start of starts) {
    for (const first of routes.filter(r => r.stops.includes(start.stop.id))) {
      if (first.stops.includes(end.id) && start.stop.id !== end.id) results.push({start: start.stop, walk: start.walk, first, transferWalk: 0});
      for (const second of routes.filter(r => r.id !== first.id && r.stops.includes(end.id))) {
        let best: {a: typeof stops[number]; b: typeof stops[number]; d: number} | undefined;
        for (const aId of first.stops) for (const bId of second.stops) {
          const a = byId.get(aId), b = byId.get(bId); if (!a || !b || a.id === start.stop.id || b.id === end.id) continue;
          const d = distance(a,b); if (d <= 500 && (!best || d < best.d)) best = {a,b,d};
        }
        if (best) results.push({start: start.stop, walk: start.walk, first, transferFrom: best.a, transferTo: best.b, transferWalk: best.d, second});
      }
    }
  }
  results.sort((a,b) => Number(!!a.second)-Number(!!b.second) || a.walk+a.transferWalk-b.walk-b.transferWalk);
  const options = stops.map(s => <option key={s.id} value={s.id}>{s.name}</option>);
  return <section className="bg-white rounded-xl shadow-sm p-5 mb-6" aria-labelledby="planner-title">
    <h2 id="planner-title" className="text-xl font-bold text-slate-900">Bạn muốn đi đâu?</h2>
    <p className="text-sm text-slate-600 mt-1">Tìm trạm gần bạn và gợi ý tuyến xe buýt, kể cả một lần đổi tuyến.</p>
    <form className="grid gap-4 mt-4" onSubmit={e => {e.preventDefault(); setSubmitted(true)}}>
      <div className="flex flex-wrap items-center gap-3"><button type="button" onClick={locate} disabled={loading} className="rounded-lg border border-blue-700 px-4 py-3 font-semibold text-blue-700 disabled:opacity-50">{loading ? 'Đang tìm vị trí…' : 'Dùng vị trí hiện tại'}</button>{location && <span className="text-sm text-green-800">Đã lấy vị trí · {starts.length} trạm trong 500 m</span>}</div>
      {message && <p role="status" className="text-sm text-red-700">{message}</p>}
      <div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">Hoặc chọn trạm đi<select value={origin} onChange={e => {setOrigin(e.target.value); setLocation(null); setSubmitted(false)}} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3"><option value="">Chọn trạm đi</option>{options}</select></label>
      <label className="text-sm font-medium text-slate-700">Trạm gần nơi bạn muốn đến<select required value={destination} onChange={e => {setDestination(e.target.value); setSubmitted(false)}} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3"><option value="">Chọn trạm đến</option>{options}</select></label></div>
      <button disabled={!location && !origin} className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50 md:justify-self-start">Tìm đường</button>
    </form>
    <div aria-live="polite" className="mt-4 text-sm text-slate-700">{submitted && (!starts.length ? <p>Không tìm thấy trạm trong 500 m. Hãy chọn trạm đi thủ công hoặc thử vị trí khác.</p> : !results.length ? <p>Chưa tìm thấy tuyến phù hợp trong dữ liệu hiện có. Hãy thử trạm khác hoặc phương tiện khác.</p> : <><h3 className="font-semibold">Các phương án tham khảo</h3><ol className="mt-2 space-y-3">{results.slice(0, 5).map((r,i) => <li key={i} className="rounded-lg bg-blue-50 p-4"><p className="font-semibold">{r.second ? '1 lần đổi tuyến' : 'Đi thẳng'} · đi bộ tối thiểu {meters(r.walk+r.transferWalk)}</p><ol className="list-decimal pl-5 mt-2 space-y-1"><li>{location ? `Đi bộ khoảng ${meters(r.walk)} đến` : 'Đến'} {r.start.name}.</li><li>Bắt {r.first.name}, xuống tại {r.transferFrom?.name || end?.name}.</li>{r.second && <><li>{r.transferWalk ? `Đi bộ khoảng ${meters(r.transferWalk)} đến ${r.transferTo?.name}.` : `Đổi xe tại ${r.transferTo?.name}.`}</li><li>Bắt {r.second.name}, xuống tại {end?.name}.</li></>}<li>Bạn đã đến trạm đã chọn; hãy kiểm tra đường đi từ trạm đến địa điểm thực tế.</li></ol></li>)}</ol></>)}</div>
    <p className="mt-4 text-xs text-slate-600">Khoảng cách là đường chim bay, không phải đường đi bộ thực tế. Dữ liệu trạm, chiều chạy, lịch và giá chưa được xác minh hiện tại; hãy kiểm tra với nhà xe trước khi đi. Các phương án chưa xét thời gian chờ hoặc giao thông.</p>
  </section>;
}
