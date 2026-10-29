# Đối chiếu BusMap cho Khánh Hòa

Ngày nghiên cứu: 29/10/2026. Đây là phân tích tài liệu công khai, chưa thử toàn bộ ứng dụng di động. Không sao chép mã, hình ảnh hay dữ liệu riêng của BusMap.

## Nguồn chính
- https://busmap.vn/tinh-nang/ — nhóm tính năng: tra cứu, tìm đường, nhắc xuống trạm, ngoại tuyến.
- https://busmap.vn/faq/ — phạm vi triển khai ngoài TP.HCM; dữ liệu vận tải và thời gian thực phụ thuộc kết nối cơ quan quản lý.
- https://busmap.vn/huong-dan-su-dung/tim-duong-voi-busmap/ — A/B, ghim bản đồ, lưu địa điểm, tùy chỉnh chuyển tuyến, chọn phương án.
- https://busmap.vn/huong-dan-su-dung/dan-duong-tung-buoc/ — dẫn đường theo vị trí người dùng.
- https://busmap.vn/huong-dan-su-dung/theo-doi-tram-va-thong-bao-xe-den-tram/ — nhắc gần trạm và thông báo xe đến.
- https://busmap.vn/huong-dan-su-dung/xem-thoi-gian-thuc-xe-den-tram/ — ETA và xe tới trạm dựa trên dữ liệu GPS.
- https://busmap.vn/huong-dan-su-dung/tim-duong-nang-cao/ — kết hợp xe buýt và phương tiện khác.

## Định hướng riêng cho du khách Khánh Hòa

Giữ luồng chính A → B → chọn phương án → xem bản đồ và các bước. Tối đa hai xe theo yêu cầu sản phẩm. Khách không phải hiểu mã tuyến trước khi tìm đường. Nội dung nghiên cứu và danh sách toàn tỉnh đặt trong phần mở rộng. Tập trung sân bay Cam Ranh, Nha Trang và các điểm du lịch có dữ liệu; không gắn nhãn toàn tỉnh đã được định tuyến đầy đủ.

## Ma trận khả năng và thiếu hụt

| Khả năng | Trạng thái ở dự án / hướng triển khai |
|---|---|
| 1. Chọn A/B độc lập | Có, dữ liệu gợi ý nội bộ và ghim bản đồ |
| 2. Dùng vị trí hiện tại | Có, cần quyền trình duyệt |
| 3. Đảo chiều A/B | Bổ sung trong đợt này |
| 4. Đi thẳng hoặc một lần đổi xe | Có, dùng thứ tự trạm công bố |
| 5. Ưu tiên ít đổi xe | Có, bổ sung lựa chọn rõ ràng |
| 6. Ưu tiên ít đi bộ | Bổ sung, chỉ dựa khoảng cách đường chim bay |
| 7. Chọn phương án để xem bản đồ | Bổ sung, bản đồ trước đây chỉ vẽ phương án đầu |
| 8. Lưu hành trình | Bổ sung tối đa 5 cặp A/B trên thiết bị; mở lại để tính lại |
| 9. Xóa hành trình lưu | Bổ sung, người dùng chủ động xóa |
| 10. Tra cứu tuyến/chiều/trạm | Có, mới 6 danh sách theo chiều |
| 11. Hiển thị nhà xe/liên hệ/nguồn | Có trong tra cứu dữ liệu nghiên cứu |
| 12. Phản hồi dữ liệu | Có, mở email phương án để khách chủ động gửi |
| 13. Tìm địa chỉ tùy ý | Chưa có nhà cung cấp geocoding phù hợp; không dùng Nominatim autocomplete |
| 14. Đường đi bộ theo đường phố | Cần walking routing và tọa độ trạm đủ phủ; hiện chỉ ước lượng |
| 15. Thời gian/giá hành trình | Thiếu lịch và cự ly vé; không thể suy ra chính xác |
| 16. Trạm gần người dùng | Có trong định tuyến; chưa có màn khám phá trạm độc lập |
| 17. Nhắc xuống xe | Cần theo dõi GPS và tọa độ trạm; web chỉ đáng tin khi mở trang, chưa triển khai |
| 18. GPS xe và ETA | Cần feed nhà xe/điều hành, không có feed công khai được xác minh |
| 19. Ngoại tuyến | Chưa có service worker; không được hứa bản đồ ngoại tuyến từ OSM tile công khai |
| 20. Kết hợp taxi/xe công nghệ | Chưa có giá/đặt xe tích hợp; có các trang thông tin phương tiện riêng |

## Thứ tự tiếp theo

1. Kiểm thử tìm đường và phủ tọa độ hai chiều; lưu provenance cho mọi tọa độ ước lượng.
2. Tích hợp dịch vụ tìm địa chỉ và đường đi bộ có quota/điều khoản phù hợp, cache dùng chung.
3. Màn hình hành trình có tiến độ trạm và nhắc xuống xe khi người dùng chủ động bật GPS.
4. Xin feed tuyến/lịch/GPS từ đơn vị vận tải trước khi hiển thị trạng thái đang chạy hoặc đếm ngược xe đến.
5. Ngoại tuyến cần thiết kế cache dữ liệu và nhà cung cấp bản đồ cho phép, tránh tải hàng loạt tile công khai.

## Tiêu chí chấp nhận

Không quá hai tuyến; mỗi chặng xe đúng thứ tự chiều; chọn phương án nào bản đồ vẽ phương án đó; sửa A/B làm mất kết quả cũ; lưu địa điểm chỉ trên thiết bị và không yêu cầu tài khoản; không giả ETA, vị trí xe hoặc giờ đến trạm.
