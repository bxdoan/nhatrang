# Analytics Implementation Guide

## Tổng quan
Dự án sử dụng Vercel Analytics và Speed Insights để theo dõi hiệu suất và hành vi người dùng.

## Cài đặt
```bash
npm install @vercel/analytics @vercel/speed-insights
```

## Cấu hình

### 1. Package Installation & Code Integration
Analytics và Speed Insights được enable tự động khi:
- Cài đặt packages `@vercel/analytics` và `@vercel/speed-insights`
- Thêm components vào layout.tsx
- Deploy lên Vercel platform

### 2. Layout.tsx
- Tích hợp `<Analytics />` và `<SpeedInsights />`
- Wrapper `<AnalyticsProvider>` cho page view tracking

```tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 3. Custom Analytics (lib/analytics.ts)
Hệ thống tracking events tùy chỉnh cho:

#### Events được theo dổi:
- `phone_call_click` - Click vào số điện thoại
- `zalo_click` - Click vào nút Zalo
- `telegram_click` - Click vào nút Telegram
- `motorbike_rental_inquiry` - Quan tâm thuê xe máy
- `car_rental_inquiry` - Quan tâm thuê xe ô tô
- `bus_route_view` - Xem thông tin tuyến xe buýt
- `taxi_company_click` - Click vào hãng taxi
- `flight_info_view` - Xem thông tin chuyến bay
- `gallery_image_view` - Xem ảnh trong gallery
- `contact_form_submit` - Gửi form liên hệ

#### Helper Functions:
```typescript
// Track phone calls
trackPhoneCall(phoneNumber: string, page: string)

// Track social media clicks
trackZaloClick(page: string)
trackTelegramClick(page: string)

// Track vehicle inquiries
trackVehicleInquiry(vehicleType: 'motorbike' | 'car', page: string)

// Track gallery interactions
trackGalleryImageView(imageName: string, vehicleType: string, page: string)
```

## Sử dụng trong Components

### Ví dụ: Tracking Phone Calls
```tsx
import { trackPhoneCall } from '../lib/analytics';

const handlePhoneClick = (phone: string) => {
  trackPhoneCall(phone, 'oto');
};

<a 
  href={`tel:${phoneNumber}`}
  onClick={() => handlePhoneClick(phoneNumber)}
>
  Gọi ngay
</a>
```

### Ví dụ: Tracking Gallery Images
```tsx
import { trackGalleryImageView } from '../lib/analytics';

const openImagePopup = (car: Car) => {
  // ... popup logic ...
  trackGalleryImageView(car.name, 'car', 'oto');
};
```

## Dashboard Analytics

### Vercel Analytics Dashboard
- Truy cập: Vercel Dashboard > Project > Analytics tab
- Xem metrics: Page views, visitors, bounce rate
- Custom events và conversions

### Speed Insights
- Truy cập: Vercel Dashboard > Project > Speed Insights tab
- Core Web Vitals
- Performance metrics
- Real User Monitoring (RUM)

## Metrics chính được theo dõi

### 1. User Engagement
- Phone call clicks từ từng trang
- Social media interactions (Zalo, Telegram)
- Gallery image views

### 2. Business Conversions
- Vehicle rental inquiries
- Contact form submissions
- Service page visits

### 3. Navigation Patterns
- Page views và user flow
- Most visited pages
- Bounce rates theo trang

### 4. Performance
- Loading times
- Core Web Vitals
- User experience metrics

## Lợi ích

### 1. Business Intelligence
- Hiểu hành vi khách hàng
- Tối ưu conversion funnel
- Đo lường ROI của marketing

### 2. UX Optimization
- Identify pain points
- Optimize user journeys
- Improve page performance

### 3. Content Strategy
- Popular content identification
- User engagement patterns
- Content performance metrics

## Best Practices

### 1. Privacy Compliance
- Analytics tuân thủ GDPR
- Không track thông tin cá nhân nhạy cảm
- Transparent data collection

### 2. Performance Impact
- Lightweight tracking code
- Non-blocking implementations
- Minimal bundle size increase

### 3. Data Quality
- Consistent event naming
- Meaningful event properties
- Regular data validation

## Monitoring & Maintenance

### 1. Regular Reviews
- Weekly analytics reviews
- Monthly performance reports
- Quarterly strategy adjustments

### 2. Error Handling
- Graceful degradation
- Error logging
- Fallback mechanisms

### 3. Updates
- Keep packages updated
- Monitor Vercel changelog
- Test after updates

## Troubleshooting

### Common Issues

#### 1. Schema Validation Errors
- Không thêm `analytics` hoặc `speedInsights` vào vercel.json
- Analytics được enable tự động qua packages và code integration

#### 2. Analytics Not Working
- Đảm bảo packages đã được cài đặt đúng
- Kiểm tra components đã được thêm vào layout
- Analytics chỉ hoạt động trên production deployment

#### 3. Custom Events Not Appearing
- Custom events có thể mất vài phút để xuất hiện trong dashboard
- Kiểm tra console errors trong browser
- Đảm bảo event names và properties hợp lệ 