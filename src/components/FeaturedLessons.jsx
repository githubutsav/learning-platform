import React from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedLessons({ lessons }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border-2 border-purple-500/30 shadow-xl"
      style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.2)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl text-white flex items-center gap-2">
          <span className="text-2xl">📚</span> Featured Lessons
        </h3>
        <button className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">View All</button>
      </div>
      <div className="grid gap-4">
        {lessons.map((lesson, index) => (
          <motion.div 
            key={lesson.id} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 p-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-colors"
          >
            <motion.div 
              className={`w-16 h-16 ${lesson.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {lesson.title.charAt(0)}
            </motion.div>
            <div className="flex-1">
              <div className="font-bold text-white">{lesson.title}</div>
              <div className="text-sm text-gray-400">{lesson.duration} • {lesson.difficulty} • {lesson.category}</div>
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronUp className="text-gray-400 rotate-90" size={20} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}