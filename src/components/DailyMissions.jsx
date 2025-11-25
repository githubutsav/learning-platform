import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, BookOpen, Trophy, CheckCircle2, Sparkles, Sword, Shield } from 'lucide-react';

export default function DailyMissions({ missions }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border-2 border-purple-500/30 shadow-xl"
      style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.2)' }}
    >
      <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">⚔️</span> Daily Quests
      </h3>
      <div className="space-y-4">
        {missions.map((mission, index) => {
          const progressPercent = Math.min((mission.progress / mission.target) * 100, 100);
          const isComplete = progressPercent === 100;
          
          return (
            <motion.div 
              key={mission.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03, x: 5 }}
              className={`relative p-4 rounded-2xl cursor-pointer overflow-hidden ${
                isComplete 
                  ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500/50' 
                  : 'bg-slate-800/50 border-2 border-slate-700/50'
              }`}
              style={{
                boxShadow: isComplete ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              {/* Background glow */}
              {isComplete && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <motion.div 
                    className="text-3xl"
                    animate={isComplete ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isComplete ? Infinity : 0, repeatDelay: 3 }}
                  >
                    {mission.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">{mission.title}</div>
                    <div className="text-sm text-gray-400 font-semibold mb-2">
                      {mission.progress}/{mission.target} {isComplete && '✅'}
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className={`h-3 rounded-full relative ${
                          isComplete 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <motion.div 
                    className={`font-bold text-sm px-4 py-2 rounded-xl ${
                      isComplete
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
                    }`}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isComplete ? 'CLAIMED!' : `+${mission.reward} ${mission.type === 'coins' ? '🪙' : '💎'}`}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
