import React from 'react';
import { Bell, User } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { isNotificationsOpen, setIsNotificationsOpen } = useUIStore();

  return (
    <>
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
            onClick={() => setIsNotificationsOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="fixed top-0 right-0 m-4 flex items-center gap-4 z-20">
        <button
          className="p-2 glass-panel rounded-full relative"
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[rgb(var(--color-warning))] rounded-full" />
        </button>
        <button className="p-2 glass-panel rounded-full">
          <User className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}