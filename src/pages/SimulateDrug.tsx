import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const medications = [
  'Methylphenidate',
  'Modafinil',
  'Sertraline',
  'Escitalopram',
  'Venlafaxine',
];

const simulationData = [
  { name: 'Day 1', activity: 65 },
  { name: 'Day 3', activity: 75 },
  { name: 'Day 7', activity: 85 },
  { name: 'Day 14', activity: 90 },
  { name: 'Day 21', activity: 95 },
  { name: 'Day 30', activity: 98 },
];

export function SimulateDrug() {
  const [selectedMedication, setSelectedMedication] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    if (!selectedMedication) return;
    setIsSimulating(true);
    // Simulation logic would go here
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Drug Response Simulation</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-6">Simulation Controls</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Medication
              </label>
              <select
                value={selectedMedication}
                onChange={(e) => setSelectedMedication(e.target.value)}
                className="w-full glass-panel p-3 bg-transparent border-none outline-none"
              >
                <option value="">Choose a medication...</option>
                {medications.map((med) => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSimulate}
              disabled={!selectedMedication || isSimulating}
              className="neon-button w-full flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-6">Predicted Response</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="name"
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
                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="rgb(var(--color-primary))"
                  strokeWidth={2}
                  dot={{
                    fill: 'rgb(var(--color-primary))',
                    stroke: 'rgb(var(--color-primary))',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}