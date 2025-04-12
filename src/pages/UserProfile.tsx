import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar } from 'lucide-react';

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dateJoined: 'January 15, 2024',
  lastScan: 'February 20, 2024',
  totalScans: 12,
  subscription: 'Premium',
  nextAppointment: 'March 5, 2024',
};

export function UserProfile() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
        <motion.div
          className="glass-panel p-6 col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
              <div className="flex items-center gap-4 text-white/70">
                <Mail className="w-4 h-4" />
                <span>{userData.email}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Joined {userData.dateJoined}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Scan History</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Last Scan</span>
              <span className="text-primary">{userData.lastScan}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Scans</span>
              <span className="text-primary">{userData.totalScans}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Subscription</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Plan</span>
              <span className="text-primary">{userData.subscription}</span>
            </div>
            <div className="flex justify-between">
              <span>Next Appointment</span>
              <span className="text-primary">{userData.nextAppointment}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}