import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Zap } from 'lucide-react';

export default function WelcomeSection({ user, weeklyStats }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 text-white overflow-hidden"
      style={{
        boxShadow: '0 0 40px rgba(147, 51, 234, 0.3), inset 0 0 80px rgba(147, 51, 234, 0.1)'
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Welcome back, {user.name}! 🎮
          </motion.h1>
          <p className="text-blue-200 text-lg font-semibold">Ready to level up your skills?</p>
        </motion.div>
        
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-60"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-6 rounded-2xl border-2 border-orange-500/50">
            <div className="text-center">
              <motion.div 
                className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {weeklyStats.streak}
              </motion.div>
              <div className="text-sm text-orange-300 font-bold uppercase tracking-wider">Day Streak 🔥</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}