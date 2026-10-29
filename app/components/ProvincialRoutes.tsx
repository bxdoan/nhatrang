'use client';
import { useState } from 'react';
import routes from '../data/busResearch.json';

export default function ProvincialRoutes() {
  const [query, setQuery] = useState('');
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g,'d').toLowerCase();
  const filtered = routes.filter(r => normalize(`${r.number || ''} ${r.name || ''} ${r.operator || ''}`).includes(normalize(query.trim())));
  return <section className="bg-white rounded-xl shadow-sm p-5 mb-6" aria-labelledby="province-title">
    <h2 id="province-title" className="text-xl font-bold text-slate-900">Tra cứu tuyến toàn tỉnh</h2>
    <p className="mt-2 text-sm text-slate-600">Danh mục nghiên cứu từ nguồn công khai đến 29/10/2026. Việc tuyến được công bố hoặc báo chí nhắc đến không xác nhận xe đang chạy hôm nay. Hãy liên hệ nhà xe trước khi đi.</p>
    <label className="mt-4 block text-sm font-semibold text-slate-700">Tìm số tuyến, nơi đến hoặc nhà xe<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ví dụ: 11, Phan Rang, Vĩnh Hy" className="mt-1 block w-full rounded-lg border border-slate-300 p-3" /></label>
    <p className="mt-3 text-sm text-slate-600" aria-live="polite">{filtered.length} tuyến trong dữ liệu nghiên cứu</p>
    <ul className="mt-3 grid gap-3 md:grid-cols-2">{filtered.map(r=><li key={r.id} className="rounded-lg border border-slate-200 p-4"><h3 className="font-semibold text-slate-900">{r.number ? `Tuyến ${r.number}` : 'Chưa xác minh số tuyến'}{r.name ? ` · ${r.name}` : ' · Chưa xác minh tên tuyến'}</h3><p className="mt-2 text-sm text-slate-600">{r.directions.length ? 'Có thứ tự trạm theo chiều trong tài liệu' : 'Chưa có danh sách trạm theo chiều'} · Chưa xác nhận hoạt động hiện tại</p>{r.operator && <p className="mt-1 text-sm text-slate-700">{r.operator}{r.phone && <> · <a href={`tel:${r.phone.replace(/\s/g,'')}`} className="text-blue-700 underline">{r.phone}</a></>}</p>}{r.source && <a className="mt-2 inline-block text-sm text-blue-700 underline" href={r.source} target="_blank" rel="noopener noreferrer">Xem nguồn ↗</a>}</li>)}</ul>
  </section>;
}
