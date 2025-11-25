import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star } from 'lucide-react';

const getRankInfo = (rank) => {
  if (rank === 1) return { ring: 'ring-4 ring-yellow-400', podiumHeight: 'h-44 md:h-52', scale: 'md:scale-105' };
  if (rank === 2) return { ring: 'ring-3 ring-slate-400', podiumHeight: 'h-36 md:h-44', scale: 'md:scale-100' };
  if (rank === 3) return { ring: 'ring-2 ring-pink-400', podiumHeight: 'h-32 md:h-40', scale: 'md:scale-95' };
  return { ring: 'ring-1 ring-slate-600', podiumHeight: 'h-28', scale: '' };
};

export default function LeaderboardMiniFixed({ leaderboardData = [], onViewAll }) {
  const top = leaderboardData.slice(0, 3);

  while (top.length < 3) top.push({ id: `empty-${top.length}`, name: '—', avatar: null, score: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800/60 overflow-visible"
    >
      <div className="flex items-end justify-center gap-3 md:gap-6 w-full">
        <div className="flex flex-col items-center w-1/3 md:w-1/4">
          <div className={`relative flex items-center justify-center mb-2 ${getRankInfo(2).scale}`}>
            <div className={`rounded-full w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white ${getRankInfo(2).ring}`}> 
              {top[1].avatar ? <img src={top[1].avatar} alt={top[1].name} className="w-full h-full rounded-full object-cover" /> : <span className="font-semibold">{(top[1].name || '—').slice(0,2)}</span>}
            </div>
            <div className="absolute -bottom-6 text-sm text-slate-300 font-medium">{top[1].name}</div>
          </div>

          <div className={`w-full flex items-center justify-center ${getRankInfo(2).podiumHeight}`}>
            <div className="w-10/12 bg-slate-800/60 border border-slate-700 rounded-t-lg rounded-b-md flex items-center justify-center text-slate-100 font-semibold text-lg md:text-xl">2</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3 md:w-1/3">
          <div className={`relative flex items-center justify-center mb-2 ${getRankInfo(1).scale}`}>
            <div className={`absolute -left-3 -top-3 bg-yellow-400 text-black rounded-full p-1 md:p-2 shadow-md`}><Crown size={14} /></div>
            <div className={`rounded-full w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-slate-900 font-bold ${getRankInfo(1).ring}`}>
              {top[0].avatar ? <img src={top[0].avatar} alt={top[0].name} className="w-full h-full rounded-full object-cover" /> : <span className="font-semibold">{(top[0].name || '—').slice(0,2)}</span>}
            </div>
            <div className="absolute -bottom-7 md:-bottom-8 text-sm md:text-base text-white font-semibold">{top[0].name}</div>
          </div>

          <div className={`w-full flex items-center justify-center ${getRankInfo(1).podiumHeight}`}>
            <div className="w-11/12 bg-gradient-to-t from-yellow-700 to-yellow-600 border border-yellow-400 rounded-t-xl rounded-b-md flex flex-col items-center justify-center text-slate-900 font-extrabold text-2xl md:text-3xl">1</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3 md:w-1/4">
          <div className={`relative flex items-center justify-center mb-2 ${getRankInfo(3).scale}`}>
            <div className={`rounded-full w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-pink-700 to-pink-600 flex items-center justify-center text-white ${getRankInfo(3).ring}`}> 
              {top[2].avatar ? <img src={top[2].avatar} alt={top[2].name} className="w-full h-full rounded-full object-cover" /> : <span className="font-semibold">{(top[2].name || '—').slice(0,2)}</span>}
            </div>
            <div className="absolute -bottom-6 text-sm text-slate-300 font-medium">{top[2].name}</div>
          </div>

          <div className={`w-full flex items-center justify-center ${getRankInfo(3).podiumHeight}`}>
            <div className="w-10/12 bg-slate-800/60 border border-slate-700 rounded-t-lg rounded-b-md flex items-center justify-center text-pink-300 font-semibold text-lg md:text-xl">3</div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-300">Top learners</div>
        {onViewAll ? (
          <button onClick={onViewAll} className="text-xs text-blue-400 hover:underline">View all</button>
        ) : (
          <div className="text-xs text-slate-500">&nbsp;</div>
        )}
      </div>
    </motion.div>
  );
}
