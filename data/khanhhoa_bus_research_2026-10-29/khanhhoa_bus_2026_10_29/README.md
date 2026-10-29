# KHÁNH HÒA BUS — RESEARCH DATASET V0.1

**Ngày truy cứu nguồn:** 2026-10-29 (Asia/Ho_Chi_Minh). **Không khảo sát trực tiếp/không liên hệ nhà xe.**

## Phạm vi
Toàn tỉnh Khánh Hòa hiện hành sau sáp nhập, bao gồm toàn bộ khu vực Ninh Thuận cũ/Phan Rang, các khu vực Nha Trang, Cam Ranh, Cam Lâm, Diên Khánh, Khánh Vĩnh, Ninh Hòa, Vạn Ninh, Khánh Sơn, khu vực Ninh Thuận cũ và các tuyến đi tỉnh liền kề có đầu/cuối trong địa bàn.

## Nguồn ưu tiên
- 11: https://sxd.khanhhoa.gov.vn/noi-dung/id/3206/Ww88vt ; phụ lục gốc: https://sxd.khanhhoa.gov.vn/Portals/0/QD%20du%20chnh%20Tuyn%20s%2011%20%20Nha%20Trang%20di%20Phan%20Rang-Thap%20Cham%20va%20nguc%20li_signed_signed_signed.pdf. Trang PDF số 1–11 đếm theo file, KHÔNG theo số trang in. PL1 trang 3; PL2 trang 4–10; PL3 trang 11. **Ngày 20/06/2025 là ngày trang Sở đăng**, vì bản PDF thiếu trường số/ngày quyết định ở đầu văn bản.
- 27–34: https://sxd.khanhhoa.gov.vn/noi-dung/id/3992/Quyet-dinh-ve-viec-cong-bo-dieu-chinh-hoat-dong-cua-tuyen-van-tai-hanh-khach-cong-cong-bang-xe-buyt-%28Tuyen-so-27%2C-28%2C-29%2C-30%2C-31%2C-32%2C-33%2C-34%29; 181/QĐ-SXD 03/03/2026 đăng 04/03; 8 PDF phụ lục có URL đầy đủ tại source_documents.csv nhưng đường dẫn timeout. Nội dung chưa đọc thì NULL.
- 8 tuyến trợ giá: https://sxd.khanhhoa.gov.vn/noi-dung/id/4260; 5592/TB-SXD 27/05/2026, lịch hè 01/06–04/09; áp dụng lịch thường từ 05/09/2026 nhưng bảng biểu chưa lấy được.
- 23/16-2: https://vinpearl.com/vi/huong-dan-nhan-ve-vinbus-vinpearl-nha-trang có thứ tự 2 chiều; https://vinbus.vn/thong-bao-tang-tan-suat-hoat-dong-02-tuyen-buyt-dien-16-2-va-23-tai-nha-trang có ngoại lệ mùa hè và mốc hết hiệu lực 31/08.
- 25 và 26: https://sxd.khanhhoa.gov.vn/noi-dung/id/4137/Quyet-dinh-ve-viec-cong-bo-mo-tuyen-xe-buyt-du-lich-noi-tinh-khong-tro-gia-Tuyen-so-25--Nha-Trang-City-Tour- ; https://sxd.khanhhoa.gov.vn/noi-dung/id/4136/Quyet-dinh-ve-viec-cong-bo-mo-tuyen-xe-buyt-du-lich-noi-tinh-khong-tro-gia-Tuyen-so-26--Nha-Trang-Sightseeing-Tour công bố ngày 15/04/2026, danh sách điểm dừng thể hiện bằng hình ảnh chưa trích xuất được; giữ stop_ids_ordered=NULL.
- 12: https://sxd.khanhhoa.gov.vn/trang-chu/categoryid/QLVT/pg/49; tìm thấy trong danh mục điều chỉnh ngày 28/04/2025, chưa đọc được quyết định gốc.
- Các tuyến Quyết Thắng có bằng chứng báo chí 26/09/2026: https://baokhanhhoa.vn/xa-hoi/202609/xe-buyt-quyet-thang-chuyen-doi-hoan-toan-sang-xe-dien-70f2a34/; **không có số tuyến nên route_number=NULL**.
- Quy hoạch 2026–2030: https://moc.gov.vn/tl/tin-tuc/96439/khanh-hoa-phe-duyet-danh-muc-mang-luoi-tuyen-xe-buyt.aspx; 44 tuyến thuộc danh mục quy hoạch, **không phải 44 tuyến hiện vận hành**. Tách riêng planned_network.csv.
- Mọi URL và tình trạng đọc: `source_documents.csv`.

## Các tệp và khóa
- `routes.csv` / `.json`: route_id định danh nội bộ, `route_number` thực chứng từ nguồn hoặc NULL; hãng (`operator_id`), tên, đầu/cuối, trạng thái *bằng chứng* chứ không giả định thực tế. `fare_vnd` chỉ khi có giá tuyến cố định; tuyến 11 có giá theo cự ly ở `fare_bands.csv`.
- `stops.csv` / `.json`: mỗi dòng đại diện **một mục trạm trong một chiều** (một `stop_id` riêng), không tự hợp nhất hai bên đường. Các giá trị `latitude`, `longitude`, `street_address`, `road_side` thiếu bằng chứng đều NULL. WGS84 là CRS mục tiêu, **không có tọa độ nào được xác minh**. `documentary_infrastructure_status` giữ nguyên phân loại trạm mới/chờ mới/trạm hiện hữu từ tài liệu, không coi đó là tình trạng khảo sát thực tế.
- `directions.csv` / `.json`: `stop_ids_ordered` là JSON array ngay trong ô CSV (dễ đọc bằng json.loads); `stops_order_verified` nói có thứ tự công bố hay không. 11, 23, 16-2 có thứ tự từ văn bản. 25,26 và 27–34 để NULL ở stop_ids_ordered.
- `trips.csv` / `.json`: **chỉ 48 giờ xuất bến tuyến 11** được liệt kê đúng từ PL3, không tạo giờ bằng nội suy khoảng cách hoặc giãn cách. `days_of_week` để NULL do không có lịch ngoại lệ đầy đủ.
- `stop_times.csv` / `.json`: đủ 4.704 bản ghi liên kết 48 chuyến với 98 trạm/chiều; chỉ chuyến tại **trạm đầu có departure_time**. Tất cả arrival_time và departure_time trạm giữa/cuối = NULL vì nguồn không cung cấp giờ đó. **Không được coi NULL là 00:00**.
- `fare_bands.csv`: giá 1 lượt tuyến 11 theo km; max_km_exclusive NULL = tới cuối tuyến. Mức vé không phải giá theo khoảng cách giữa 2 trạm vì thiếu lý trình.
- `operators.csv` / `.json`: tên hãng và liên hệ công khai, có phân biệt tên thương hiệu/tên công ty chưa khớp.
- `transfers.csv` / `.json`: tệp có header nhưng **0 bản ghi**, vì không có chứng cứ trạm chuyển tuyến cùng vị trí và đường đi bộ thực tế. Không dùng đường chim bay, không ngầm xác nhận chuyển tuyến khi tên trạm trùng.
- `candidate_stops.csv`: địa điểm do báo chí nhắc đến cho tuyến 25/26, **không được coi điểm lên/xuống đã xác minh**, thứ tự NULL, tách khỏi stops.csv.
- `source_documents.csv`: nguồn gốc, ngày, phụ lục, trạng thái đọc / lỗi máy chủ, URL trực tiếp.
- `conflicts.csv`: xung đột nguồn, nguyên tắc xử lý.
- `planned_network.csv`: dữ liệu tổng hợp về quy hoạch tách khỏi tuyến hoạt động.
- `human_verification.csv`: danh sách người/cơ quan **chưa liên hệ**, kênh công khai và câu hỏi cần xác minh.
- `SUMMARY.json`: thống kê chất lượng dữ liệu.

## Chính sách NULL / JSON và định danh
CSV UTF-8 không BOM, header tiếng Anh. Ô CSV để trống tương ứng JSON null; cột mảng được mã hóa JSON. `stop_id` dạng `KH-BUS-11-OUT-001` và `KH-BUS-23-RET-003` bền vững **trong phiên bản danh sách nguồn này**, nhưng không khẳng định ID chính thức toàn tỉnh. Nếu tên địa phương/đường đổi, giữ tên nguyên văn theo tài liệu và versioning sau khi kiểm chứng; không tự cập nhật tên trạm theo xã/phường mới. Giờ dạng HH:MM theo giờ địa phương UTC+07:00; ngày YYYY-MM-DD. Tuyến không có số chính thức dùng `KH-UNNUMBERED-*` **không suy diễn số hiệu tuyến**.

## Chất lượng và giới hạn
- 11: cao về lịch/98 mục trạm mỗi chiều theo PL2/PL3 **chỉ trong văn bản**; thấp về tọa độ, biển thực địa, thời gian đến trạm và tình trạng vận hành hôm nay.
- VinBus 23/16-2: có trạm theo thứ tự 2 chiều từ Vinpearl; thiếu tọa độ và giờ tới trạm; tần suất/giờ mùa cao điểm **01/05–31/08/2026** không tự kéo dài đến 29/10.
- 8 tuyến trợ giá và 27–34: đủ bằng chứng mã tuyến được cơ quan đề cập, thiếu mô tả trạm/lịch hiện hành.
- 25/26: đủ tên/đầu-cuối/tần suất theo quyết định nhưng chỉ có danh sách địa điểm ứng viên, không xác nhận trạm thật.
- 12 và các tuyến Quyết Thắng: chỉ thông tin một phần. Tuyến báo chí nêu có thể trùng nhau nhưng không tự gộp.
- **Không có bản GTFS chính thức và giấy phép tái sử dụng được xác minh** trong các nguồn tra cứu. `license` NULL. Không nói rằng thiếu kết quả = tuyến đã dừng.
- Không thể tạo định tuyến đáng tin cậy cho khách du lịch hiện tại vì thiếu tọa độ stop, đường bộ và giờ đến trạm. Phải rà soát trước khi công khai.

## Trạng thái vận hành
Dữ liệu phân biệt: (i) quyết định/website công bố; (ii) báo chí ghi nhận vận hành vào một ngày; (iii) mùa vụ đã hết hiệu lực; (iv) quy hoạch; (v) chưa xác minh. Tệp này **không có bằng chứng tuyến nào tạm ngừng dài hạn vào ngày 29/10/2026**, cũng không tuyên bố toàn bộ các tuyến có lịch đã kiểm chứng đang chạy trong ngày.

## Pháp lý, nguồn, và sử dụng
Tập hợp thông tin nghiên cứu từ nguồn công khai, chưa được cơ quan cấp quyền dữ liệu mở. Quyền tác giả và điều khoản dùng dữ liệu của từng website/tài liệu thuộc chủ thể gốc. Không cấp phép mở cho dữ liệu nguồn hoặc trình bày đây là feed GTFS do Sở ban hành. Để triển khai sản phẩm thương mại: hỏi Sở về quyền tái sử dụng, GTFS chính thức, API và yêu cầu ghi nguồn/cập nhật.

## Kiểm thử tối thiểu
Các khóa ổn định (route_id, direction_id, stop_id, trip_id) không bị lặp. Có 98 điểm mỗi chiều tuyến 11, 24 chuyến mỗi chiều, mỗi chuyến 98 stop_times, tất cả stop_time_sequence theo thứ tự. `arrival_time` trạm nào cũng null; `departure_time` chỉ tại trạm đầu. Các stop của VinBus phân biệt 'đối diện' là khác chiều. Không có tọa độ nội suy hay khoảng cách đi bộ nội suy.
