import React from 'react';
import { Users, TrendingUp, AlertCircle, MoreHorizontal, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
// Ensure this import path matches the file structure
import { STUDENTS_MOCK } from '../data/mockData';

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border-2 border-slate-700/50 relative overflow-hidden group"
          style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="relative z-10 flex justify-between items-start mb-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ boxShadow: '0 8px 25px rgba(59, 130, 246, 0.5)' }}
            >
              <Users className="text-white" size={24} />
            </motion.div>
            <span className="text-xs font-bold text-green-400 bg-green-500/20 border border-green-500/50 px-3 py-1 rounded-full">+2 new</span>
          </div>
          <div className="relative z-10 text-4xl font-black text-white mb-2">24</div>
          <div className="relative z-10 text-sm text-slate-400 font-semibold">Active Students</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border-2 border-slate-700/50 relative overflow-hidden group"
          style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="relative z-10 flex justify-between items-start mb-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)' }}
            >
              <TrendingUp className="text-white" size={24} />
            </motion.div>
          </div>
          <div className="relative z-10 text-4xl font-black text-white mb-2">85%</div>
          <div className="relative z-10 text-sm text-slate-400 font-semibold">Class Mastery</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border-2 border-red-500/50 relative overflow-hidden group"
          style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="relative z-10 flex justify-between items-start mb-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ boxShadow: '0 8px 25px rgba(239, 68, 68, 0.5)' }}
            >
              <AlertCircle className="text-white" size={24} />
            </motion.div>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">View</button>
          </div>
          <div className="relative z-10 text-4xl font-black text-white mb-2">3</div>
          <div className="relative z-10 text-sm text-slate-400 font-semibold">Needs Attention</div>
        </motion.div>
      </div>

      {/* Student Progress Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 border-purple-500/30 p-8"
        style={{ boxShadow: '0 0 40px rgba(147, 51, 234, 0.25)' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Student Progress</h2>
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            >
              Sort by Risk
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-xl"
              style={{ boxShadow: '0 8px 25px rgba(147, 51, 234, 0.5)' }}
            >
              <Plus size={18} />
              Create Assignment
            </motion.button>
          </div>
        </div>

        <div className="space-y-3">
          {STUDENTS_MOCK.map((student, index) => (
            <motion.div 
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="flex items-center justify-between p-5 bg-slate-800/50 hover:bg-slate-700/50 rounded-2xl transition-all group cursor-pointer border border-slate-700/50 hover:border-purple-500/50"
            >
              <div className="flex items-center gap-4 w-1/3">
                <motion.div 
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600/50 group-hover:border-purple-500/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt={student.name} />
                </motion.div>
                <div>
                  <div className="font-bold text-white">{student.name}</div>
                  <div className="text-xs text-slate-400">Active {student.lastActive}</div>
                </div>
              </div>
              
              <div className="w-1/3 px-4">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white">{student.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${student.progress < 50 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-emerald-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${student.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                    style={{ 
                      boxShadow: student.progress < 50 
                        ? '0 0 10px rgba(239, 68, 68, 0.5)' 
                        : '0 0 10px rgba(34, 197, 94, 0.5)' 
                    }}
                  />
                </div>
              </div>

              <div className="w-1/3 flex justify-end gap-3">
                {student.risk === 'high' && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full text-xs font-bold flex items-center gap-2"
                  >
                    <AlertCircle size={14} /> High Risk
                  </motion.span>
                )}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <MoreHorizontal size={20}/>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}