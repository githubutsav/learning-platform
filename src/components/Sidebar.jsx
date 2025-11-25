import React from 'react';
import { Home, Target, ShoppingBag, Trophy, LogOut, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ Icon, active, onClick, tooltip }) => (
  <div className="relative group">
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.1, x: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-4 rounded-2xl transition-all duration-300 overflow-hidden
        ${active 
          ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white' 
          : 'bg-slate-800/50 text-slate-400 hover:text-purple-400 hover:bg-slate-700/50'
        }`}
      style={active ? { boxShadow: '0 0 25px rgba(147, 51, 234, 0.5)' } : {}}
    >
      {active && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
      <Icon size={24} strokeWidth={active ? 2.5 : 2} className="relative z-10" />
    </motion.button>
    
    {/* Tooltip */}
    {tooltip && (
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap border border-purple-500/30 shadow-xl">
          {tooltip}
        </div>
      </div>
    )}
  </div>
);

export default function Sidebar({ view, setView, role }) {
  return (
    <div className="w-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 h-screen flex flex-col items-center py-8 fixed left-0 top-0 border-r border-purple-500/20 z-50">
      <motion.div 
        className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12 tracking-tighter"
        animate={{ 
          backgroundPosition: ['0%', '100%', '0%'],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      >
        U
      </motion.div>
      <div className="flex-1 flex flex-col items-center w-full px-4 gap-4">
        <SidebarItem 
          Icon={Home} 
          active={view === 'dashboard'} 
          onClick={() => setView('dashboard')}
          tooltip="Dashboard"
        />
        {role === 'user' && (
          <>
            <SidebarItem 
              Icon={Map} 
              active={view === 'learning-path'} 
              onClick={() => setView('learning-path')}
              tooltip="Learning Paths"
            />
            <SidebarItem 
              Icon={Target} 
              active={view === 'goals'} 
              onClick={() => setView('goals')}
              tooltip="Goals & Planner"
            />
            <SidebarItem 
              Icon={ShoppingBag} 
              active={view === 'shop'} 
              onClick={() => setView('shop')}
              tooltip="Shop"
            />
            <SidebarItem 
              Icon={Trophy} 
              active={view === 'achievements'} 
              onClick={() => setView('achievements')}
              tooltip="Leaderboard"
            />
          </>
        )}
      </div>
      <SidebarItem 
        Icon={LogOut} 
        onClick={() => window.location.reload()}
        tooltip="Logout"
      />
    </div>
  );
}