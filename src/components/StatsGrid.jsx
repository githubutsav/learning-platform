import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Target, Trophy, Zap, Award, TrendingUp, Flame } from 'lucide-react';

export default function StatsGrid({ weeklyStats, user }) {
  const stats = [
    {
      icon: BookOpen,
      value: weeklyStats.lessonsCompleted,
      label: "Lessons This Week",
      gradient: "from-blue-500 to-cyan-500",
      glow: "rgba(59, 130, 246, 0.5)"
    },
    {
      icon: Clock,
      value: `${Math.floor(weeklyStats.timeSpent / 60)}h ${weeklyStats.timeSpent % 60}m`,
      label: "Study Time",
      gradient: "from-green-500 to-emerald-500",
      glow: "rgba(34, 197, 94, 0.5)"
    },
    {
      icon: Target,
      value: `${weeklyStats.accuracy}%`,
      label: "Accuracy Rate",
      gradient: "from-purple-500 to-pink-500",
      glow: "rgba(168, 85, 247, 0.5)"
    },
    {
      icon: Award,
      value: user.level,
      label: "Current Level",
      gradient: "from-yellow-500 to-orange-500",
      glow: "rgba(234, 179, 8, 0.5)"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${stat.glow}`
            }}
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border-2 border-slate-700/50 hover:border-purple-500/50 cursor-pointer overflow-hidden group transition-all"
            style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.2)' }}
          >
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
            
            {/* Animated background orb */}
            <motion.div
              className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative z-10 flex items-center gap-4">
              <motion.div 
                className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-xl`}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
                style={{ boxShadow: `0 8px 25px ${stat.glow}` }}
              >
                <IconComponent className="text-white" size={28} strokeWidth={2.5} />
              </motion.div>
              <div>
                <motion.div 
                  className="text-2xl font-black text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-slate-400 font-semibold">{stat.label}</div>
              </div>
            </div>
            
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
          </motion.div>
        );
      })}
    </div>
  );
}