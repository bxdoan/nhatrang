'use client';

const groups = [
  { area: 'Nha Trang – Cam Ranh – Phan Rang', routes: ['11 · Nha Trang – Phan Rang–Tháp Chàm'], source: 'https://sxd.khanhhoa.gov.vn/noi-dung/id/3206/Ww88vt', date: '20/06/2025' },
  { area: 'Phan Rang và vùng lân cận', routes: ['27 · Phan Rang – Sông Pha', '28 · Phan Rang – Thuận Bắc', '29 · Phan Rang – Vĩnh Hy', '30 · Phan Rang – Cà Ná', '31 · Nội thành Phan Rang', '32 · Phan Rang – Phước Dinh', '33 · Phan Rang – Phước Dân', '34 · Phan Rang – Phước Vinh'], source: 'https://sxd.khanhhoa.gov.vn/noi-dung/id/3992/Quyet-dinh-ve-viec-cong-bo-dieu-chinh-hoat-dong-cua-tuyen-van-tai-hanh-khach-cong-cong-bang-xe-buyt-%28Tuyen-so-27%2C-28%2C-29%2C-30%2C-31%2C-32%2C-33%2C-34%29', date: '04/03/2026' },
];

export default function ProvincialRoutes() {
  return <section className="bg-white rounded-xl shadow-sm p-5 mb-6" aria-labelledby="province-title">
    <h2 id="province-title" className="text-xl font-bold text-slate-900">Khám phá xe buýt toàn tỉnh</h2>
    <p className="mt-2 text-sm text-slate-600">Các tuyến dưới đây được công bố trong quyết định của Sở Xây dựng. Tình trạng hoạt động, điểm dừng và giờ chạy hiện tại cần kiểm tra lại trước chuyến đi; các tuyến này chưa có dữ liệu trạm để tìm đường trên bản đồ.</p>
    <div className="mt-4 grid gap-4 md:grid-cols-2">{groups.map(group => <article key={group.area} className="rounded-lg border border-slate-200 p-4"><h3 className="font-semibold text-slate-900">{group.area}</h3><ul className="mt-2 space-y-1 text-sm text-slate-700">{group.routes.map(route => <li key={route}>{route}</li>)}</ul><a className="inline-block mt-3 text-sm font-medium text-blue-700 underline" href={group.source} target="_blank" rel="noopener noreferrer">Quyết định của Sở · {group.date} ↗</a></article>)}</div>
  </section>;
}
