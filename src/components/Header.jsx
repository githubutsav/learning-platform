import React, { useState } from 'react';
import { Bell, Flame, Zap, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';
import ProfileModal from './ProfileModal';

export default function Header({ 
  user, 
  role, 
  levelInfo, 
  notifications, 
  onMarkAsRead, 
  onClearAllNotifications,
  avatars,
  onSelectAvatar,
  onUpdateProfile,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const xpProgress = user ? ((user.xp - levelInfo.min) / (levelInfo.max - levelInfo.min)) * 100 : 0;
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="mb-8">
      {/* Single Row Header */}
      <div className="flex justify-between items-center pl-4">
        {/* Left - Level Info */}
        {role === 'user' && user && (
          <div className="text-lg font-semibold text-gray-300">
            Level {user.level}: <span className="text-purple-400">{levelInfo.title}</span>
          </div>
        )}
        {role !== 'user' && <div></div>}
        
        {/* Right - Stats and Profile */}
        <div className="flex items-center gap-6">
          {role === 'user' && user && (
            <>
              {/* XP Bar */}
              <div className="flex flex-col w-40">
                <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                  <span className="text-purple-400">XP</span>
                  <span className="text-cyan-400">{user.xp} / {levelInfo.max}</span>
                </div>
                <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden border-2 border-purple-500/30">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Diamonds */}
              <motion.div 
                className="relative flex items-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-2.5 rounded-full shadow-lg border-2 border-cyan-500/50 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 25px rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap className="text-cyan-400" size={20} fill="currentColor" />
                </motion.div>
                <span className="font-black text-cyan-300 text-lg relative z-10">{user.diamonds}</span>
              </motion.div>

              {/* Coins */}
              <motion.div 
                className="relative flex items-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-2.5 rounded-full shadow-lg border-2 border-yellow-500/50 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 25px rgba(234, 179, 8, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Coins className="text-yellow-400" size={20} />
                </motion.div>
                <span className="font-black text-yellow-300 text-lg relative z-10">{user.coins.toLocaleString()}</span>
              </motion.div>

              {/* Streak */}
              <motion.div 
                className="relative flex items-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-2.5 rounded-full shadow-lg border-2 border-orange-500/50 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 25px rgba(249, 115, 22, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame size={20} className="text-orange-400" fill="currentColor" />
                </motion.div>
                <span className="font-black text-orange-300 text-lg relative z-10">{user.streak}</span>
              </motion.div>
            </>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative bg-white p-3 rounded-full shadow-sm border border-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </motion.div>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <NotificationPanel
                  notifications={notifications || []}
                  onClose={() => setShowNotifications(false)}
                  onMarkAsRead={onMarkAsRead}
                  onClearAll={onClearAllNotifications}
                />
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <button 
            onClick={() => setShowProfile(true)}
            className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher"} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <ProfileModal
            user={user}
            avatars={avatars}
            onClose={() => setShowProfile(false)}
            onSelectAvatar={onSelectAvatar}
            onUpdateProfile={onUpdateProfile}
            onLogout={onLogout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}