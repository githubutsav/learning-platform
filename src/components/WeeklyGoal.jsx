import React from 'react';
import { motion } from 'framer-motion';

export default function WeeklyGoal({ weeklyStats }) {
  const progressPercentage = (weeklyStats.lessonsCompleted / weeklyStats.weeklyGoal) * 100;
  const circumference = 283;
  const strokeDasharray = `${(progressPercentage / 100) * circumference} ${circumference}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border-2 border-purple-500/30 shadow-xl"
      style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.2)' }}
    >
      <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
        <span className="text-2xl">🎯</span> Weekly Goal
      </h3>
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#1e293b" 
              strokeWidth="8"
            />
            <motion.circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="8" 
              strokeDasharray={strokeDasharray}
              initial={{ strokeDasharray: '0 283' }}
              animate={{ strokeDasharray }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-black text-white">{weeklyStats.lessonsCompleted}</div>
            <div className="text-sm text-gray-400">/ {weeklyStats.weeklyGoal}</div>
          </div>
        </div>
        <p className="text-sm text-gray-400">Lessons completed this week</p>
      </div>
    </motion.div>
  );
}