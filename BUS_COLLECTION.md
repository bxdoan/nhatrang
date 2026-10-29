# Khảo sát trạm tại /bus-collect

Trang không có liên kết trong menu/sitemap và có noindex. URL ẩn không phải cơ chế bảo mật: chỉ API nhận dữ liệu yêu cầu mã. Người biết URL vẫn mở được form.

## Chuẩn bị
- Cấu hình REDIS_URL hoạt động trên Vercel.
- Tạo mã 4 ký tự hoặc dài hơn theo lựa chọn của chủ trang, đặt biến môi trường BUS_COLLECT_TOKEN (chỉ máy chủ, không dùng NEXT_PUBLIC).
- Redeploy để áp dụng cấu hình. Gửi mã riêng cho người khảo sát.
- Mở /bus-collect trên điện thoại khi có mạng. Bật quyền vị trí. Nhập mã tại phần Mã gửi dữ liệu.

## Mỗi trạm
1. Chọn tuyến và ghi chiều theo điểm đầu → điểm cuối.
2. Khi xe dừng đúng trạm, bấm lấy GPS. Tránh lấy giữa hai trạm; kiểm tra sai số thiết bị báo.
3. Nhập tên trạm hoặc địa điểm cạnh trạm. Ghi phía đường/số nhà nếu có.
4. Bấm lưu và gửi. Số trạm tự tăng, tuyến và chiều được giữ lại.
5. Khi đổi tuyến hoặc chiều, sửa lại và đặt số thứ tự về 1.

GPS quá 2 phút phải lấy lại. Sai số trên 50 m có thông báo thử lại; vẫn cho phép ghi khi điều kiện thực địa không tốt. Đây là sai số thiết bị báo, không bảo đảm tọa độ thực địa chính xác.

## Cuối buổi
Bấm Gửi lại nếu còn chờ, rồi Xuất file để giữ bản sao. Gửi file JSON cho người quản lý để kiểm tra/nhập dữ liệu. Chỉ đánh dấu Đã gửi sau khi API xác nhận. Cùng ID gửi lại không tạo bản ghi trùng.

Máy chủ lưu từng bản ghi Redis tại bus-collect:<UUID>, không có TTL. Đây là dữ liệu chờ duyệt, không tự thay trạm công khai. Cần sao lưu Redis; form lưu thiết bị không thay thế backup. Không thu tên, số điện thoại hay GPS theo dõi liên tục của người khảo sát.

Không thêm URL trang vào tài liệu công khai hoặc menu. Không gửi mã truy cập hoặc bản ghi GPS vào Git. Trang cần được mở trước khi mất mạng; chưa có hỗ trợ tải trang ngoại tuyến.

## Duyệt nhanh
Đặt BUS_REVIEW_TOKEN riêng cho chủ trang (khác BUS_COLLECT_TOKEN); mã thu thập hỗ trợ 4 ký tự. Sau khi redeploy, mở /bus-review, nhập mã chủ trang và tải hàng chờ. Kiểm tra GPS, chiều và trạm rồi bấm Duyệt và cập nhật /bus. Đối chiếu sẵn theo số tuyến và thứ tự, cần chọn lại nếu tên/chiều không khớp. Bản duyệt được ghi vào app/data/busApproved.json trên nhánh master qua GitHub Contents API. Mỗi lượt duyệt tạo một commit và kích hoạt Vercel. /bus chỉ dùng dữ liệu JSON tĩnh sau deploy thành công. Redis giữ hàng chờ và trạng thái duyệt. Hỗ trợ cập nhật trạm thuộc các chiều có sẵn; tuyến mới chưa có cấu trúc sẽ giữ chờ. Mỗi địa chỉ mạng có tối đa 30 lần nhập sai mã trong 15 phút để hạn chế dò mã ngắn. Tránh chia sẻ mã chủ trang với nhân viên.

## Lưu vĩnh viễn bằng Git
Tạo GitHub fine-grained personal access token chỉ cho repo bxdoan/nhatrang, quyền Contents: Read and write, lưu vào GITHUB_BUS_TOKEN trên Vercel (server only). Token phải có khả năng tạo commit trên master theo quy tắc repository hiện hành; không tắt bảo vệ nhánh để né lỗi. Không gửi token qua chat hoặc commit vào code. Khi thiếu quyền hoặc deploy lỗi, file trên GitHub vẫn là nguồn sự thật; kiểm tra commit và trạng thái Vercel. Sau khi duyệt trên web, agent phải git fetch/pull trước khi sửa dữ liệu. Không rollback file JSON khi cập nhật code.
