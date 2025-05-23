import { track } from '@vercel/analytics';

// Định nghĩa các loại events
export type AnalyticsEvent = 
  | 'phone_call_click'
  | 'zalo_click'
  | 'telegram_click'
  | 'motorbike_rental_inquiry'
  | 'car_rental_inquiry'
  | 'bus_route_view'
  | 'taxi_company_click'
  | 'flight_info_view'
  | 'gallery_image_view'
  | 'contact_form_submit';

// Interface cho event properties
interface EventProperties {
  category?: string;
  label?: string;
  value?: number;
  page?: string;
  phone_number?: string;
  service_type?: string;
  vehicle_type?: string;
  route_name?: string;
  taxi_company?: string;
  image_name?: string;
}

// Hàm tracking events chính
export const trackEvent = (event: AnalyticsEvent, properties?: EventProperties) => {
  try {
    track(event, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Các hàm helper cho từng loại event
export const trackPhoneCall = (phoneNumber: string, page: string) => {
  trackEvent('phone_call_click', {
    category: 'contact',
    label: 'phone_call',
    phone_number: phoneNumber,
    page
  });
};

export const trackZaloClick = (page: string) => {
  trackEvent('zalo_click', {
    category: 'contact',
    label: 'zalo_message',
    page
  });
};

export const trackTelegramClick = (page: string) => {
  trackEvent('telegram_click', {
    category: 'contact',
    label: 'telegram_message',
    page
  });
};

export const trackVehicleInquiry = (vehicleType: 'motorbike' | 'car', page: string) => {
  const event = vehicleType === 'motorbike' ? 'motorbike_rental_inquiry' : 'car_rental_inquiry';
  trackEvent(event, {
    category: 'rental_inquiry',
    label: vehicleType,
    vehicle_type: vehicleType,
    page
  });
};

export const trackBusRouteView = (routeName: string) => {
  trackEvent('bus_route_view', {
    category: 'transportation',
    label: 'bus_route',
    route_name: routeName,
    page: 'bus'
  });
};

export const trackTaxiCompanyClick = (companyName: string) => {
  trackEvent('taxi_company_click', {
    category: 'transportation',
    label: 'taxi_company',
    taxi_company: companyName,
    page: 'taxi'
  });
};

export const trackFlightInfoView = (flightCode?: string) => {
  trackEvent('flight_info_view', {
    category: 'flight',
    label: 'flight_check',
    value: flightCode ? 1 : 0,
    page: 'flights'
  });
};

export const trackGalleryImageView = (imageName: string, vehicleType: string, page: string) => {
  trackEvent('gallery_image_view', {
    category: 'gallery',
    label: 'image_popup',
    image_name: imageName,
    vehicle_type: vehicleType,
    page
  });
};

export const trackContactFormSubmit = (formType: string, page: string) => {
  trackEvent('contact_form_submit', {
    category: 'contact',
    label: formType,
    page
  });
}; 