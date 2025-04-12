import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
  {
    title: 'Epilepsy Warning',
    description: 'Abnormal activity detected in right hippocampus',
    severity: 'high',
  },
  {
    title: 'Stress Level',
    description: 'Elevated cortisol patterns in prefrontal cortex',
    severity: 'medium',
  },
];

export function InsightPanel() {
  return (
    <div className="fixed right-0 top-24 w-96 p-4 space-y-4">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.title}
          className={`glass-panel p-4 ${
            insight.severity === 'high' ? 'warning-panel' : ''
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-[rgb(var(--color-warning))]" />
            <h3 className="font-semibold">{insight.title}</h3>
          </div>
          <p className="text-sm text-white/70">{insight.description}</p>
        </motion.div>
      ))}
    </div>
  );
}