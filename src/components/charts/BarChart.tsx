/**
 * Bar Chart Component
 * Componente de gráfico de barras
 */

"use client";

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  title: string;
  maxValue?: number;
}

export function BarChart({ data, title, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {item.value}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.color || 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
