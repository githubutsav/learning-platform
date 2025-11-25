import { useState } from 'react';
import { X, User, Mail, Calendar, Award, Settings, LogOut, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileModal = ({ user, avatars, onClose, onSelectAvatar, onUpdateProfile, onLogout }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(user.name);

  const handleSaveAvatar = () => {
    onSelectAvatar(selectedAvatar);
  };

  const handleSaveName = () => {
    onUpdateProfile({ name });
    setEditingName(false);
  };

  const ownedAvatars = avatars.filter(avatar => user.inventory.includes(avatar.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-slate-900 rounded-3xl border-2 border-purple-500/30 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-white shadow-xl overflow-hidden">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Profile Settings</h2>
                <p className="text-purple-100 text-sm">Customize your account</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* User Info Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <User size={20} className="text-purple-400" />
              Personal Information
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 space-y-3">
              {/* Full Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-slate-400" />
                  {editingName ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-700 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                    />
                  ) : (
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-slate-500 text-xs">Full Name</p>
                    </div>
                  )}
                </div>
                {editingName ? (
                  <button
                    onClick={handleSaveName}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingName(true)}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-400" />
                <div>
                  <p className="text-white font-medium">{user.email || 'No email provided'}</p>
                  <p className="text-slate-500 text-xs">Email Address</p>
                </div>
              </div>
              
              {/* Level & XP */}
              <div className="flex items-center gap-3">
                <Award size={18} className="text-slate-400" />
                <div>
                  <p className="text-white font-medium">Level {user.level} - {user.xp} XP</p>
                  <p className="text-slate-500 text-xs">Current Progress</p>
                </div>
              </div>
              
              {/* Streak */}
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-slate-400" />
                <div>
                  <p className="text-white font-medium">{user.streak} day streak 🔥</p>
                  <p className="text-slate-500 text-xs">Learning Streak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award size={20} className="text-purple-400" />
              Your Avatars ({ownedAvatars.length})
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {ownedAvatars.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative bg-slate-800 rounded-xl p-4 cursor-pointer border-2 transition-all ${
                    selectedAvatar === avatar.src
                      ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setSelectedAvatar(avatar.src)}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-slate-700">
                    <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center text-white text-sm font-medium truncate">
                    {avatar.name}
                  </p>
                  {selectedAvatar === avatar.src && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-purple-600 rounded-full p-1"
                    >
                      <Check size={16} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            {ownedAvatars.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p>No avatars owned yet</p>
                <p className="text-sm mt-1">Visit the shop to unlock more!</p>
              </div>
            )}
          </div>

          {/* Save Button */}
          {selectedAvatar !== user.avatar && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSaveAvatar}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Save Avatar Changes
            </motion.button>
          )}

          {/* Logout Button */}
          <div className="mt-6">
            <button 
              onClick={onLogout}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;
