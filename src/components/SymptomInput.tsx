import React, { useState } from 'react';
import { Mic } from 'lucide-react';

export function SymptomInput() {
  const [input, setInput] = useState('');

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-8 w-[600px]">
      <div className="glass-panel p-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Describe your symptoms (e.g., stress, shivers, disrupted sleep...)"
          className="flex-1 bg-transparent border-none outline-none placeholder:text-white/50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Mic className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}