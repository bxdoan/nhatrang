import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useLanguage } from '../contexts/LanguageContext';

interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    iata: string;
    timezone: string;
    terminal?: string;
    gate?: string;
    delay?: number;
    scheduled: string;
    estimated?: string;
    actual?: string;
    estimated_runway?: string;
    actual_runway?: string;
  };
  arrival: {
    airport: string;
    iata: string;
    timezone: string;
    terminal?: string;
    gate?: string;
    baggage?: string;
    delay?: number;
    scheduled: string;
    estimated?: string;
    actual?: string;
    estimated_runway?: string;
    actual_runway?: string;
  };
  airline: {
    name: string | null;
    iata: string;
    icao?: string;
  };
  flight: {
    number: string;
    iata: string;
    icao?: string;
    codeshared?: {
      airline_name: string;
      airline_iata: string;
      airline_icao: string;
      flight_number: string;
      flight_iata: string;
      flight_icao: string;
    };
  };
  aircraft?: any;
  live?: any;
}

export default function FlightCard({ flight }: { flight: Flight }) {
  const { t } = useLanguage();
  
  // Function to format date and time with timezone conversion
  const formatTime = (dateString: string | undefined, timezone: string) => {
    if (!dateString) return 'N/A';
    try {
      // Parse ISO string to Date
      const date = parseISO(dateString);
      // Convert UTC time to target timezone
      const zonedDate = utcToZonedTime(date, timezone);
      // Format the date with target timezone
      return format(zonedDate, 'HH:mm');
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'N/A';
    }
  };

  // Function to format date with timezone conversion
  const formatDate = (dateString: string | undefined, timezone: string) => {
    if (!dateString) return 'N/A';
    try {
      // Parse ISO string to Date
      const date = parseISO(dateString);
      // Convert UTC time to target timezone
      const zonedDate = utcToZonedTime(date, timezone);
      // Format the date with target timezone
      return format(zonedDate, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  // Get status class based on flight status
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'flight-status-scheduled';
      case 'active':
        return 'flight-status-active';
      case 'landed':
        return 'flight-status-landed';
      case 'cancelled':
        return 'flight-status-cancelled';
      case 'diverted':
        return 'flight-status-diverted';
      default:
        return 'flight-status-scheduled';
    }
  };

  // Get airline name
  const getAirlineName = () => {
    if (flight.airline.name) return flight.airline.name;
    if (flight.flight.codeshared?.airline_name) 
      return flight.flight.codeshared.airline_name.toUpperCase();
    return flight.airline.iata.toUpperCase();
  };

  // Get flight number/code
  const getFlightCode = () => {
    if (flight.flight.codeshared) {
      return flight.flight.codeshared.flight_iata.toUpperCase();
    }
    return flight.flight.iata;
  };

  // Calculate delay info
  const getDelayInfo = (delay?: number) => {
    if (!delay) return null;
    return (
      <div className="text-xs mt-1">
        <span className={delay > 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
          {delay > 0 ? `${t.flights?.flightCard?.delayed || 'Trễ'} ${delay} ${t.flights?.flightCard?.minutes || 'phút'}` : `${t.flights?.flightCard?.early || 'Sớm'} ${Math.abs(delay)} ${t.flights?.flightCard?.minutes || 'phút'}`}
        </span>
      </div>
    );
  };

  return (
    <div className="flight-card">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">{getAirlineName()}</div>
        <span className={getStatusClass(flight.flight_status)}>
          {flight.flight_status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">{t.flights?.flightCard?.departureFrom || 'Khởi hành từ'}</p>
          <p className="font-medium">{flight.departure.airport} ({flight.departure.iata})</p>
          <div className="mt-1">
            <span className="text-sm text-gray-500">{t.flights?.flightCard?.scheduled || 'Lịch'}: </span>
            <span className="font-medium">{formatTime(flight.departure.scheduled, flight.departure.timezone)}</span>
          </div>
          {flight.departure.actual && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.actual || 'Thực tế'}: </span>
              <span className="font-medium">{formatTime(flight.departure.actual, flight.departure.timezone)}</span>
            </div>
          )}
          {getDelayInfo(flight.departure.delay)}
          {flight.departure.terminal && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.terminal || 'Nhà ga'}: </span>
              <span className="font-medium">{flight.departure.terminal}</span>
            </div>
          )}
          {flight.departure.gate && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.gate || 'Cổng'}: </span>
              <span className="font-medium">{flight.departure.gate}</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">{t.flights?.flightCard?.arrivalTo || 'Đến'}</p>
          <p className="font-medium">{flight.arrival.airport} ({flight.arrival.iata})</p>
          <div className="mt-1">
            <span className="text-sm text-gray-500">{t.flights?.flightCard?.scheduled || 'Lịch'}: </span>
            <span className="font-medium">{formatTime(flight.arrival.scheduled, flight.arrival.timezone)}</span>
          </div>
          {flight.arrival.actual && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.actual || 'Thực tế'}: </span>
              <span className="font-medium">{formatTime(flight.arrival.actual, flight.arrival.timezone)}</span>
            </div>
          )}
          {getDelayInfo(flight.arrival.delay)}
          {flight.arrival.terminal && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.terminal || 'Nhà ga'}: </span>
              <span className="font-medium">{flight.arrival.terminal}</span>
            </div>
          )}
          {flight.arrival.gate && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.gate || 'Cổng'}: </span>
              <span className="font-medium">{flight.arrival.gate}</span>
            </div>
          )}
          {flight.arrival.baggage && (
            <div className="mt-1">
              <span className="text-sm text-gray-500">{t.flights?.flightCard?.baggage || 'Băng chuyền hành lý'}: </span>
              <span className="font-medium">{flight.arrival.baggage}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between">
          <div>
            <span className="text-sm text-gray-500">{t.flights?.flightCard?.flightCode || 'Chuyến bay'}: </span>
            <span className="font-medium">{getFlightCode()}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">{t.flights?.flightCard?.date || 'Ngày'}: </span>
            <span className="font-medium">
              {formatDate(flight.arrival.scheduled, flight.arrival.timezone)}
            </span>
          </div>
        </div>
        {flight.flight.codeshared && (
          <div className="mt-1 text-xs text-gray-500">
            {t.flights?.flightCard?.operatedBy || 'Được điều hành bởi'} {flight.flight.codeshared.airline_name.toUpperCase()} ({flight.flight.codeshared.flight_iata.toUpperCase()})
          </div>
        )}
      </div>
    </div>
  );
} 