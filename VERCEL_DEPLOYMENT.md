# Triển khai dự án lên Vercel

Đây là hướng dẫn chi tiết về cách triển khai ứng dụng Cam Ranh Flight Tracker lên nền tảng Vercel.

## Bước 1: Chuẩn bị mã nguồn

1. Đảm bảo dự án của bạn có các tệp sau:
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - `example.env.local` (file mẫu cho biến môi trường)
   - Tất cả các tệp mã nguồn

2. Tạo file `.env.local` từ file mẫu và cấu hình biến môi trường:
   ```bash
   cp example.env.local .env.local
   ```

3. Chỉnh sửa file `.env.local` với các thông tin cần thiết (API key, thông tin KV Storage...)

4. Commit tất cả thay đổi vào Git repository (đừng commit file `.env.local`):
   ```bash
   git add .
   git commit -m "Chuẩn bị triển khai lên Vercel"
   ```

5. Nếu bạn chưa đẩy mã nguồn lên GitHub, hãy tạo một repository mới trên GitHub và đẩy mã nguồn lên:
   ```bash
   git remote add origin https://github.com/bxdoan/nhatrang.git
   git push -u origin main
   ```

## Bước 2: Chuẩn bị biến môi trường

### API key AviationStack

1. Đăng ký tài khoản tại [AviationStack](https://aviationstack.com/) (nếu chưa có)
2. Tạo API key hoặc sử dụng API key sẵn có
3. Ghi nhớ API key để thiết lập trong Vercel

### Chuẩn bị Vercel KV Storage (Redis)

Ứng dụng sử dụng Vercel KV Storage để lưu trữ cache, giảm số lần gọi API.

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Truy cập mục Storage trong dashboard
3. Chọn "Create KV Database"
4. Làm theo hướng dẫn để tạo database mới
5. Sau khi tạo, Vercel sẽ cung cấp thông tin kết nối (lưu lại các thông tin này):
   - KV_URL
   - KV_REST_API_URL
   - KV_REST_API_TOKEN
   - KV_REST_API_READ_ONLY_TOKEN

## Bước 3: Triển khai lên Vercel

### Cách 1: Sử dụng giao diện Vercel Dashboard

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Đăng nhập bằng tài khoản GitHub, GitLab, hoặc Bitbucket
3. Nhấp vào "New Project"
4. Chọn repository của bạn từ danh sách
5. Cấu hình dự án:
   - Thêm các biến môi trường sau:
     - `AVIATIONSTACK_API_KEY`: API key của AviationStack
     - `KV_URL`: URL của KV database
     - `KV_REST_API_URL`: REST API URL 
     - `KV_REST_API_TOKEN`: Token cho REST API
     - `KV_REST_API_READ_ONLY_TOKEN`: Token chỉ đọc
     - `CACHE_TTL_HOURS`: Thời gian hết hạn của cache tính bằng giờ (mặc định: 10)
     - `MAX_API_CALLS_PER_DAY`: Số lần gọi API tối đa mỗi ngày (mặc định: 3)
6. Nhấp vào "Deploy"

### Cách 2: Sử dụng Vercel CLI

1. Cài đặt Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Đăng nhập vào Vercel từ terminal:
   ```bash
   vercel login
   ```

3. Triển khai dự án:
   ```bash
   vercel
   ```

4. Khi được hỏi về biến môi trường, nhập các biến như đã nêu ở phần trên

## Bước 4: Kiểm tra và quản lý

1. Truy cập trang web đã triển khai để kiểm tra các tính năng
2. Kiểm tra trang `/cache` để xem thông tin về cache và số lần gọi API

## Quản lý biến môi trường

### Thêm hoặc chỉnh sửa biến môi trường trong Vercel Dashboard

1. Truy cập dự án của bạn trong Vercel Dashboard
2. Đi đến tab "Settings" > "Environment Variables"
3. Thêm hoặc chỉnh sửa biến môi trường
4. Nhấn "Save" để lưu thay đổi

### Cập nhật biến môi trường qua Vercel CLI

```bash
# Thêm hoặc cập nhật biến môi trường
vercel env add VARIABLE_NAME

# Xóa biến môi trường
vercel env rm VARIABLE_NAME
```

## Lưu ý

- Dữ liệu sẽ được cache trong 10 giờ trước khi gọi lại API (có thể thay đổi qua biến môi trường `CACHE_TTL_HOURS`)
- Mỗi ngày chỉ có tối đa 3 lần gọi API (có thể thay đổi qua biến môi trường `MAX_API_CALLS_PER_DAY`)
- Nếu đạt giới hạn gọi API, ứng dụng sẽ tiếp tục sử dụng dữ liệu cache
- Không nên commit file `.env.local` lên GitHub vì nó chứa thông tin nhạy cảm 