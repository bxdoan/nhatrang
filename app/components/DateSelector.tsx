import { format, addDays } from 'date-fns';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  // Generate dates for the selector (today and next 5 days)
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 5; i++) {
      const date = addDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const displayStr = format(date, 'dd/MM/yyyy');
      
      dates.push({
        value: dateStr,
        display: i === 0 ? `Hôm nay (${displayStr})` : displayStr
      });
    }
    
    return dates;
  };
  
  const dateOptions = generateDateOptions();
  
  return (
    <div className="mb-6">
      <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-2">
        Chọn ngày:
      </label>
      <select
        id="date-select"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
      >
        {dateOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
    </div>
  );
} 