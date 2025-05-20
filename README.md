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
- Vercel KV Storage (Redis) cho lưu trữ cache

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

# Vercel KV configuration 
KV_URL=your_kv_url_here
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token_here

# Cache config
CACHE_TTL_HOURS=10
MAX_API_CALLS_PER_DAY=3
```

### Lấy API key AviationStack

1. Đăng ký tài khoản tại [AviationStack](https://aviationstack.com/)
2. Đi đến trang tài khoản và lấy API key
3. Thêm API key vào biến môi trường `AVIATIONSTACK_API_KEY`

## Thiết lập Vercel KV Storage

1. Tạo một tài khoản Vercel (nếu chưa có)
2. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
3. Tạo project mới và kết nối với repository GitHub
4. Truy cập mục Storage và tạo một KV Database mới
5. Lấy thông tin kết nối KV Database và thêm vào biến môi trường trong project:
   - KV_URL
   - KV_REST_API_URL 
   - KV_REST_API_TOKEN
   - KV_REST_API_READ_ONLY_TOKEN

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