import React from 'react';
import { Target, Lock, Crown, Zap, Play, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestMap({ quests, onStartNode, chapterNumber, completedLessons = new Set(), isChapterUnlocked = true }) {
  const quest = quests[0];
  if (!quest) return null;
  
  // Calculate dynamic node statuses based on completion
  const nodesWithStatus = quest.nodes.map((node, index) => {
    // Check if this node is completed
    const isCompleted = completedLessons.has(node.id);
    
    // First node is always unlocked (if chapter is unlocked), or if previous node is completed
    const isPreviousCompleted = index === 0 || completedLessons.has(quest.nodes[index - 1].id);
    
    // Lock all nodes if chapter is locked
    const nodeStatus = !isChapterUnlocked ? 'locked' : 
                       isCompleted ? 'completed' : 
                       isPreviousCompleted ? 'unlocked' : 'locked';
    
    return {
      ...node,
      status: nodeStatus
    };
  });
  
  return (
    <div className="relative">
      <div className={`bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border-2 ${isChapterUnlocked ? 'border-purple-500/30' : 'border-slate-600/30'} mb-8 ${!isChapterUnlocked ? 'opacity-60' : ''}`} 
           style={{ boxShadow: isChapterUnlocked ? '0 0 30px rgba(147, 51, 234, 0.2)' : 'none' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-2 ${isChapterUnlocked ? 'text-white' : 'text-slate-500'}`}>
            <Target className={isChapterUnlocked ? 'text-purple-400' : 'text-slate-600'} /> 
            {isChapterUnlocked ? 'Current Quest:' : 'Locked Quest:'} {quest.title}
          </h2>
          <span className={`text-xs font-bold px-4 py-2 rounded-full border ${isChapterUnlocked ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : 'bg-slate-700/20 text-slate-500 border-slate-600/50'}`}>
            Chapter {chapterNumber}
          </span>
        </div>

        <div className="relative py-8 overflow-x-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-700/50 -translate-y-1/2 z-0 rounded-full"></div>
          
          <div className="flex justify-between relative z-10 min-w-[600px]">
            {nodesWithStatus.map((node, i) => (
              <motion.div 
                key={node.id} 
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.button 
                  onClick={() => node.status !== 'locked' && isChapterUnlocked && onStartNode(node)}
                  disabled={node.status === 'locked' || !isChapterUnlocked}
                  whileHover={node.status !== 'locked' && isChapterUnlocked ? { scale: 1.1, rotate: 5 } : {}}
                  whileTap={node.status !== 'locked' && isChapterUnlocked ? { scale: 0.95 } : {}}
                  animate={node.status === 'unlocked' && isChapterUnlocked ? { y: [-5, 5, -5] } : {}}
                  transition={node.status === 'unlocked' && isChapterUnlocked ? { duration: 2, repeat: Infinity } : {}}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl border-4 transition-all shadow-xl relative overflow-hidden
                    ${node.status === 'completed' 
                      ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400/50 text-white' 
                      : node.status === 'unlocked' && isChapterUnlocked
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700 border-purple-400/50 text-white' 
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-500 cursor-not-allowed'}
                  `}
                  style={{
                    boxShadow: node.status === 'completed' 
                      ? '0 0 30px rgba(34, 197, 94, 0.5)' 
                      : node.status === 'unlocked' && isChapterUnlocked
                        ? '0 0 30px rgba(147, 51, 234, 0.6)' 
                        : 'none'
                  }}
                >
                  {node.status === 'unlocked' && isChapterUnlocked && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <span className="relative z-10">
                    {node.status === 'locked' || !isChapterUnlocked ? <Lock size={24} /> : 
                     node.status === 'completed' ? <CheckCircle size={28} className="text-white" /> :
                     node.type === 'boss' ? <Crown size={28} /> : 
                     node.type === 'challenge' ? <Zap size={28} /> : <Play size={28} fill="currentColor" />}
                  </span>
                </motion.button>
                <div className={`text-sm font-bold text-center ${node.status === 'locked' || !isChapterUnlocked ? 'text-slate-500' : 'text-slate-300'}`}>
                  {node.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Locked Chapter Overlay */}
      {!isChapterUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm rounded-3xl z-20">
          <div className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Lock size={64} className="mx-auto text-slate-500 mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Chapter {chapterNumber} Locked</h3>
            <p className="text-slate-400 mb-4">Complete all lessons in Chapter {chapterNumber - 1} to unlock this chapter</p>
            <div className="inline-block px-6 py-3 bg-slate-700/50 rounded-xl border border-slate-600">
              <span className="text-sm text-slate-300">🔒 Complete previous chapter first</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}