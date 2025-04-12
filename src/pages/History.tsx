import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { date: 'Feb 1', sleep: 85, stress: 30, abnormal: 5 },
  { date: 'Feb 2', sleep: 75, stress: 45, abnormal: 8 },
  { date: 'Feb 3', sleep: 90, stress: 25, abnormal: 3 },
  { date: 'Feb 4', sleep: 80, stress: 35, abnormal: 6 },
  { date: 'Feb 5', sleep: 85, stress: 30, abnormal: 4 },
  { date: 'Feb 6', sleep: 70, stress: 50, abnormal: 9 },
  { date: 'Feb 7', sleep: 95, stress: 20, abnormal: 2 },
  { date: 'Feb 8', sleep: 88, stress: 28, abnormal: 4 },
  { date: 'Feb 9', sleep: 92, stress: 22, abnormal: 3 },
  { date: 'Feb 10', sleep: 87, stress: 33, abnormal: 5 },
  { date: 'Feb 11', sleep: 83, stress: 38, abnormal: 6 },
  { date: 'Feb 12', sleep: 89, stress: 27, abnormal: 4 },
  { date: 'Feb 13', sleep: 91, stress: 24, abnormal: 3 },
  { date: 'Feb 14', sleep: 86, stress: 31, abnormal: 5 },
];

const metrics = [
  { key: 'sleep', color: '#4B9FFF', label: 'Sleep Quality' },
  { key: 'stress', color: '#FFD700', label: 'Stress Level' },
  { key: 'abnormal', color: '#FF3B30', label: 'Abnormal Activity' },
];

export function History() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Health History</h1>

      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">30-Day Overview</h2>
          <div className="flex gap-4">
            {metrics.map((metric) => (
              <div key={metric.key} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
                <span className="text-sm">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {metrics.map((metric) => (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={{
                    fill: metric.color,
                    stroke: metric.color,
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}