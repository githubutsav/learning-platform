import React from 'react';
import { Trophy, ChevronUp, ChevronDown, Crown, Medal, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LEADERBOARD_DATA } from '../data/mockData';

export default function ClassRank() {
  const top3 = LEADERBOARD_DATA.slice(0, 3);
  const rest = LEADERBOARD_DATA.slice(3);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header with Rays Background */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl overflow-hidden"
      >
        {/* Animated Rays */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent origin-top"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-50%)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-5xl font-black text-white mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Leaderboard
          </motion.h1>
          <p className="text-slate-400 text-lg">Top performers this week</p>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="relative">
        <div className="flex items-end justify-center gap-6 mb-12">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative mb-4"
            >
              <div className="w-24 h-24 rounded-full border-4 border-orange-400 overflow-hidden shadow-xl" style={{ boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)' }}>
                <img src={top3[1].avatar} alt={top3[1].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-orange-400 to-orange-600 text-white font-black text-lg w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-900" style={{ boxShadow: '0 0 20px rgba(251, 146, 60, 0.6)' }}>
                #2
              </div>
            </motion.div>
            <div className="text-center mb-4">
              <div className="text-white font-bold text-lg mb-2">{top3[1].name}</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border-2 border-orange-400/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fb923c" />
                </svg>
                <span className="text-orange-300 font-bold">{top3[1].score.toLocaleString()}</span>
              </div>
            </div>
            <motion.div
              className="w-48 rounded-t-3xl bg-gradient-to-br from-orange-500/40 to-orange-700/40 border-4 border-orange-400/50 flex items-center justify-center text-6xl font-black text-orange-200"
              style={{ height: '180px', boxShadow: '0 -10px 40px rgba(251, 146, 60, 0.3)' }}
              initial={{ height: 0 }}
              animate={{ height: '180px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              #2
            </motion.div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center -mt-8"
          >
            <motion.div
              animate={{ 
                y: [-5, 5, -5],
                rotate: [-2, 2, -2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative mb-4"
            >
              <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 z-20" size={32} />
              <div className="w-32 h-32 rounded-full border-4 border-green-400 overflow-hidden shadow-2xl" style={{ boxShadow: '0 0 50px rgba(74, 222, 128, 0.7)' }}>
                <img src={top3[0].avatar} alt={top3[0].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-green-400 to-green-600 text-white font-black text-2xl w-14 h-14 rounded-full flex items-center justify-center border-4 border-slate-900" style={{ boxShadow: '0 0 30px rgba(74, 222, 128, 0.8)' }}>
                #1
              </div>
            </motion.div>
            <div className="text-center mb-4">
              <div className="text-white font-bold text-xl mb-2">{top3[0].name}</div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border-2 border-green-400/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#4ade80" />
                </svg>
                <span className="text-green-300 font-bold text-lg">{top3[0].score.toLocaleString()}</span>
              </div>
            </div>
            <motion.div
              className="w-48 rounded-t-3xl bg-gradient-to-br from-green-500/40 to-green-700/40 border-4 border-green-400/50 flex items-center justify-center text-7xl font-black text-green-200"
              style={{ height: '240px', boxShadow: '0 -10px 50px rgba(74, 222, 128, 0.4)' }}
              initial={{ height: 0 }}
              animate={{ height: '240px' }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              #1
            </motion.div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="relative mb-4"
            >
              <div className="w-24 h-24 rounded-full border-4 border-pink-400 overflow-hidden shadow-xl" style={{ boxShadow: '0 0 30px rgba(244, 114, 182, 0.5)' }}>
                <img src={top3[2].avatar} alt={top3[2].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-pink-400 to-pink-600 text-white font-black text-lg w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-900" style={{ boxShadow: '0 0 20px rgba(244, 114, 182, 0.6)' }}>
                #3
              </div>
            </motion.div>
            <div className="text-center mb-4">
              <div className="text-white font-bold text-lg mb-2">{top3[2].name}</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border-2 border-pink-400/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#f472b6" />
                </svg>
                <span className="text-pink-300 font-bold">{top3[2].score.toLocaleString()}</span>
              </div>
            </div>
            <motion.div
              className="w-48 rounded-t-3xl bg-gradient-to-br from-pink-500/40 to-pink-700/40 border-4 border-pink-400/50 flex items-center justify-center text-6xl font-black text-pink-200"
              style={{ height: '150px', boxShadow: '0 -10px 40px rgba(244, 114, 182, 0.3)' }}
              initial={{ height: 0 }}
              animate={{ height: '150px' }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              #3
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Remaining Rankings */}
      <div className="space-y-3">
        {rest.map((user, index) => {
          
          return (
            <motion.div 
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="relative bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl flex items-center border border-slate-700/50 hover:border-purple-500/50 transition-all group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
              />
              
              {/* Rank */}
              <div className="relative z-10 w-12 text-2xl font-black text-slate-400 group-hover:text-purple-400 transition-colors">
                #{user.rank}
              </div>
              
              {/* Avatar */}
              <motion.div 
                className="w-16 h-16 rounded-full overflow-hidden mr-4 border-3 border-slate-600/50 group-hover:border-purple-500/50 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </motion.div>
              
              {/* User Info */}
              <div className="flex-1 relative z-10">
                <div className="font-bold text-white text-lg mb-1">{user.name}</div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-700/50 border border-slate-600/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#22d3ee" />
                  </svg>
                  <span className="text-cyan-300 font-semibold text-sm">{user.score.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Trend */}
              <motion.div 
                className="relative z-10 px-3"
                whileHover={{ scale: 1.2 }}
              >
                {user.trend === 'up' ? (
                  <ChevronUp className="text-green-400" size={28} strokeWidth={3} />
                ) : (
                  <ChevronDown className="text-red-400" size={28} strokeWidth={3} />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
