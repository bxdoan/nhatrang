# Nhatrang flight

Ứng dụng theo dõi chuyến bay đến sân bay Cam Ranh (CXR) sử dụng AviationStack API.

## Tính năng

- Hiển thị danh sách chuyến bay đến sân bay Cam Ranh
- Hiển thị chi tiết chuyến bay bao gồm: hãng hàng không, trạng thái, thời gian, cổng, nhà ga...
- Hệ thống cache giảm số lần gọi API (AviationStack giới hạn 3 lần gọi/ngày)
- Tự động cập nhật dữ liệu sau mỗi 10 giờ
- Hiển thị thông tin về tình trạng cache và số lần gọi API còn lại

## Công nghệ sử dụng

- Next.js
- TypeScript
- Tailwind CSS
- AviationStack API
- Redis cho lưu trữ cache

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Sao chép file môi trường mẫu
cp example.env.local .env.local

# Chỉnh sửa file .env.local với các thông tin của bạn

# Chạy môi trường development
npm run dev

# Build cho production
npm run build

# Chạy bản build
npm start
```

## Thiết lập biến môi trường

Dự án sử dụng các biến môi trường để cấu hình. Tạo file `.env.local` từ file `example.env.local` và cập nhật các giá trị sau:

```
# API keys
AVIATIONSTACK_API_KEY=your_api_key_here

# Redis configuration
REDIS_URL=redis://default:password@host:port

# Cache config
CACHE_TTL_HOURS=10
MAX_API_CALLS_PER_DAY=3
```

### Lấy API key AviationStack

1. Đăng ký tài khoản tại [AviationStack](https://aviationstack.com/)
2. Đi đến trang tài khoản và lấy API key
3. Thêm API key vào biến môi trường `AVIATIONSTACK_API_KEY`

### Thiết lập Redis

Dự án sử dụng Redis để lưu trữ cache. Bạn có thể sử dụng:

1. **Redis Cloud**: Đăng ký tài khoản Redis Cloud (có gói miễn phí) tại [Redis Cloud](https://redis.com/try-free/)
2. **Vercel Redis**: Đăng ký dịch vụ Redis từ Vercel (nếu có sẵn)
3. **Phiên bản Redis tự host**: Cài đặt Redis trên server của bạn

Sau khi có được Redis URL, thêm vào biến môi trường `REDIS_URL` của bạn.

## Triển khai (Deploy)

### Sử dụng Vercel Dashboard

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Tạo project mới và liên kết với GitHub repository của bạn
3. Trong phần "Environment Variables", thêm tất cả các biến từ file `.env.local` của bạn
4. Nhấp "Deploy" để triển khai ứng dụng

### Sử dụng Vercel CLI

1. Cài đặt Vercel CLI: `npm install -g vercel`
2. Chạy lệnh trong thư mục dự án: `vercel`
3. Làm theo hướng dẫn và nhập các biến môi trường khi được nhắc