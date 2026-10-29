# Yêu cầu nghiên cứu dữ liệu xe buýt Khánh Hòa

Hãy nghiên cứu mạng lưới xe buýt trên toàn tỉnh Khánh Hòa theo địa giới hiện hành (bao gồm khu vực Phan Rang), để xây dựng bộ dữ liệu chỉ đường cho khách du lịch. Tìm càng đầy đủ càng tốt nhưng không đoán dữ liệu. Ghi rõ ngày tra cứu và phạm vi địa lý.

## Nguồn và xác minh

Ưu tiên quyết định công bố tuyến, phụ lục điểm dừng và biểu đồ chạy xe của Sở Xây dựng/UBND, dữ liệu mở chính thức, sau đó đối chiếu trực tiếp nhà xe. Phân biệt tuyến đang khai thác, tuyến tạm dừng, tuyến dự kiến và trạng thái chưa xác minh. Quy hoạch 2026–2030 không chứng minh tuyến đang chạy. Cung cấp URL trực tiếp, ngày ban hành và trang/phụ lục cho từng thông tin; ghi lại nguồn mâu thuẫn. Nếu cần liên hệ cơ quan hoặc nhà xe, liệt kê tên, kênh liên hệ công khai và câu hỏi cần xác minh; không tự khẳng định đã liên hệ.

## Đầu ra mong muốn

Cung cấp CSV UTF-8 hoặc JSON riêng cho routes, stops, trips/directions và stop_times, cùng README mô tả trường, nguồn, giấy phép, mức độ tin cậy và phần còn thiếu. Nếu tìm được GTFS chính thức được phép sử dụng, cung cấp liên kết và ngày phiên bản. Mỗi trường không rõ để null; không suy diễn số tuyến, giá, tọa độ, lịch hay chiều chạy.

- Tuyến: ID ổn định, số và tên tuyến, nhà xe, tình trạng, điểm đầu/cuối, giá, nguồn và ngày xác minh.
- Trạm: ID ổn định, tên, địa chỉ, vĩ độ/kinh độ WGS84, phía đường/chiều, nguồn và độ chính xác. Phân biệt hai trạm đối diện; không coi tọa độ nội suy là trạm đã xác minh.
- Mỗi chiều: ID tuyến và chiều, danh sách ID trạm theo đúng thứ tự, điểm đầu/cuối, giờ hoạt động, tần suất, ngày áp dụng, nguồn. Nếu có thay đổi theo ngày hoặc giờ, mô tả riêng từng hành trình.
- Chuyển tuyến: chỉ ghi liên kết nếu nguồn xác minh; ghi khoảng cách đi bộ thực tế và nguồn, không thay thế bằng đường chim bay.
- Nhà xe: tên, số điện thoại và trang thông tin công khai, nguồn, ngày xác minh.

Bắt đầu từ quyết định tuyến 11 (https://sxd.khanhhoa.gov.vn/noi-dung/id/3206/Ww88vt) và tuyến 27–34 (https://sxd.khanhhoa.gov.vn/noi-dung/id/3992/Quyet-dinh-ve-viec-cong-bo-dieu-chinh-hoat-dong-cua-tuyen-van-tai-hanh-khach-cong-cong-bang-xe-buyt-%28Tuyen-so-27%2C-28%2C-29%2C-30%2C-31%2C-32%2C-33%2C-34%29). Tìm và đọc các phụ lục đính kèm, sau đó tìm các quyết định mới hơn và tài liệu các tuyến còn lại. Danh mục quy hoạch: https://moc.gov.vn/tl/tin-tuc/96439/khanh-hoa-phe-duyet-danh-muc-mang-luoi-tuyen-xe-buyt.aspx.

Kết thúc bằng bảng tuyến đã xác minh, tuyến chỉ có thông tin một phần, tuyến còn thiếu, các xung đột và danh sách việc cần con người xác nhận. Không coi thiếu kết quả tìm kiếm là bằng chứng tuyến ngừng hoạt động. Không gửi thông tin cá nhân hoặc khóa API.
