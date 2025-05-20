'use client';

interface CacheInfoProps {
  cacheInfo: {
    source: 'api' | 'cache' | 'error';
    lastUpdate: string;
    cacheAgeMinutes: number;
    cacheExpiryMinutes: number;
    apiCallCount: number;
    apiCallDate: string;
    maxApiCalls: number;
  } | null;
}

export default function CacheInfo({ cacheInfo }: CacheInfoProps) {
  if (!cacheInfo) return null;

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'api': return 'API trực tiếp';
      case 'cache': return 'Dữ liệu cache';
      case 'error': return 'Lỗi API';
      default: return source;
    }
  };

  return (
    <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-200">
      <h4 className="font-semibold mb-1">Thông tin cache:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
        <div>
          <span className="font-medium">Nguồn dữ liệu:</span>{' '}
          <span className={`${cacheInfo.source === 'api' ? 'text-green-600' : cacheInfo.source === 'cache' ? 'text-blue-600' : 'text-red-600'}`}>
            {getSourceLabel(cacheInfo.source)}
          </span>
        </div>
        <div>
          <span className="font-medium">Cập nhật cuối:</span>{' '}
          {cacheInfo.lastUpdate}
        </div>
        <div>
          <span className="font-medium">Tuổi cache:</span>{' '}
          {cacheInfo.cacheAgeMinutes} phút
        </div>
        <div>
          <span className="font-medium">Hết hạn sau:</span>{' '}
          {cacheInfo.cacheExpiryMinutes} phút
        </div>
        <div>
          <span className="font-medium">Số lần gọi API:</span>{' '}
          <span className={cacheInfo.apiCallCount >= cacheInfo.maxApiCalls ? 'text-red-600 font-semibold' : ''}>
            {cacheInfo.apiCallCount}/{cacheInfo.maxApiCalls}
          </span>
        </div>
        <div>
          <span className="font-medium">Ngày:</span>{' '}
          {cacheInfo.apiCallDate}
        </div>
      </div>
    </div>
  );
} 