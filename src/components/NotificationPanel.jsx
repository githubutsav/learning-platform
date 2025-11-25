import { useState } from 'react';
import { X, Bell, Trophy, Zap, Star, Target, CheckCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationPanel = ({ notifications, onClose, onMarkAsRead, onClearAll }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'achievements'

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'achievements') return notif.type === 'achievement';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="text-yellow-400" size={20} />;
      case 'xp':
        return <Zap className="text-purple-400" size={20} />;
      case 'level':
        return <Star className="text-cyan-400" size={20} />;
      case 'mission':
        return <Target className="text-green-400" size={20} />;
      default:
        return <Bell className="text-slate-400" size={20} />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-16 right-0 w-96 bg-slate-900 border-2 border-purple-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={24} className="text-white" />
          <h3 className="font-bold text-white text-lg">Notifications</h3>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 p-3 flex gap-2 border-b border-slate-700">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('achievements')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'achievements'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Achievements
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-[400px] overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Bell size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm mt-1">You're all caught up! 🎉</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredNotifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-purple-900/20' : ''
                }`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-1">
                      {notif.title}
                    </h4>
                    <p className="text-slate-400 text-xs mb-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {getTimeAgo(notif.timestamp)}
                      </span>
                      {!notif.read && (
                        <span className="text-xs text-purple-400 font-medium">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  {notif.read && (
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="bg-slate-800 p-3 border-t border-slate-700 flex justify-between">
          <button
            onClick={() => notifications.forEach(n => onMarkAsRead(n.id))}
            className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
          >
            <CheckCircle size={16} />
            Mark all as read
          </button>
          <button
            onClick={onClearAll}
            className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors flex items-center gap-1"
          >
            <Trash2 size={16} />
            Clear all
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationPanel;
