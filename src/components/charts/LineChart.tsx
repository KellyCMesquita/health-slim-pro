/**
 * Line Chart Component
 * Componente de gráfico de linha para visualização de dados
 */

"use client";

import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
  showTrend?: boolean;
}

export function LineChart({ 
  data, 
  title, 
  color = 'blue',
  showTrend = true 
}: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const trend = data.length > 1 
    ? data[data.length - 1].value - data[0].value 
    : 0;
  const trendPercentage = data[0].value !== 0 
    ? ((trend / data[0].value) * 100).toFixed(1) 
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {showTrend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(Number(trendPercentage))}%
          </div>
        )}
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="400"
              y2={i * 50}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Line path */}
          <polyline
            points={data.map((point, i) => {
              const x = (i / (data.length - 1)) * 400;
              const y = 200 - ((point.value - minValue) / range) * 180;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke={`rgb(var(--color-${color}-500))`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((point, i) => {
            const x = (i / (data.length - 1)) * 400;
            const y = 200 - ((point.value - minValue) / range) * 180;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill={`rgb(var(--color-${color}-500))`}
              />
            );
          })}
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-4">
          {data.map((point, i) => (
            <div key={i} className="text-xs text-gray-600 text-center">
              {point.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
