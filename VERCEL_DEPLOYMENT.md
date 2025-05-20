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

3. Chỉnh sửa file `.env.local` với các thông tin cần thiết (API key, thông tin Redis...)

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

### Chuẩn bị Redis

Ứng dụng sử dụng Redis để lưu trữ cache. Bạn có một số lựa chọn:

1. **Redis Cloud (Khuyến nghị)**
   - Đăng ký tài khoản Redis Cloud tại [Redis Cloud](https://redis.com/try-free/)
   - Tạo cơ sở dữ liệu mới (có gói miễn phí)
   - Lấy thông tin kết nối (Redis URL)
   - URL sẽ có dạng: `redis://default:password@host:port`

2. **Redis từ các nhà cung cấp khác**
   - AWS ElastiCache
   - DigitalOcean Managed Redis
   - Upstash Redis
   - v.v.

## Bước 3: Triển khai lên Vercel

### Cách 1: Sử dụng giao diện Vercel Dashboard

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Đăng nhập bằng tài khoản GitHub, GitLab, hoặc Bitbucket
3. Nhấp vào "New Project"
4. Chọn repository của bạn từ danh sách
5. Cấu hình dự án:
   - Thêm các biến môi trường sau:
     - `AVIATIONSTACK_API_KEY`: API key của AviationStack
     - `REDIS_URL`: URL kết nối Redis (ví dụ: redis://default:Fc4FoduRg4oW63ZEdPCA9s8s8OrJ5Eay@redis-11687.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com:11687)
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

## Kiểm tra kết nối Redis

Sau khi triển khai, để kiểm tra xem ứng dụng đã kết nối thành công đến Redis hay chưa:

1. Truy cập trang `/cache` để xem thông tin về cache
2. Kiểm tra logs trong Vercel Dashboard để xem có thông báo lỗi kết nối Redis không
3. Nếu có lỗi, kiểm tra lại biến môi trường `REDIS_URL` và quyền truy cập Redis

## Lưu ý

- Dữ liệu sẽ được cache trong 10 giờ trước khi gọi lại API (có thể thay đổi qua biến môi trường `CACHE_TTL_HOURS`)
- Mỗi ngày chỉ có tối đa 3 lần gọi API (có thể thay đổi qua biến môi trường `MAX_API_CALLS_PER_DAY`)
- Nếu đạt giới hạn gọi API, ứng dụng sẽ tiếp tục sử dụng dữ liệu cache
- Không nên commit file `.env.local` lên GitHub vì nó chứa thông tin nhạy cảm 