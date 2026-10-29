'use client';
import { useEffect, useState } from 'react';

type Forecast = { daily: { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[] } };
export default function WeatherForecast() {
  const [data, setData] = useState<Forecast | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.2388&longitude=109.1967&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=3&timezone=Asia%2FBangkok', { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('weather unavailable'); return r.json(); })
      .then(value => { if (!value.daily?.time?.length) throw new Error('missing forecast'); setData(value); })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  return <section className="bg-sky-50 py-12" aria-labelledby="weather-title"><div className="container mx-auto px-4"><div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm md:p-8"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-sky-700">Lên kế hoạch chuyến đi</p><h2 id="weather-title" className="mt-2 text-2xl font-bold text-slate-900">Thời tiết Nha Trang</h2><p className="mt-1 text-sm text-slate-600">Dự báo 3 ngày để bạn chọn thời điểm khám phá.</p></div><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-sky-700 underline">Nguồn: Open-Meteo</a></div>
    <div aria-live="polite" className="mt-5">{failed ? <p className="text-slate-600">Chưa tải được dự báo. Vui lòng thử lại sau.</p> : !data ? <p className="text-slate-600">Đang tải dự báo…</p> : <div className="grid gap-3 sm:grid-cols-3">{data.daily.time.map((day,i) => <div key={day} className="rounded-xl bg-sky-50 p-4"><p className="font-semibold text-slate-700">{new Date(day + 'T12:00:00+07:00').toLocaleDateString('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',timeZone:'Asia/Ho_Chi_Minh'})}</p><p className="mt-2 text-3xl font-bold text-slate-900">{Math.round(data.daily.temperature_2m_max[i])}° <span className="text-lg font-normal text-slate-500">/ {Math.round(data.daily.temperature_2m_min[i])}°</span></p><p className="mt-2 text-sm text-slate-600">Khả năng mưa: {data.daily.precipitation_probability_max[i] ?? '—'}%</p></div>)}</div>}</div><p className="mt-4 text-xs text-slate-500">Dự báo có thể thay đổi; kiểm tra điều kiện thực tế trước hoạt động trên biển.</p></div></div></section>;
}
