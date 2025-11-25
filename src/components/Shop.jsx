import React from 'react';
import { CheckCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Shop({ user, items, onBuy }) {
  return (
    <div className="h-full">
      {/* Shop Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 rounded-3xl mb-8 border-2 border-purple-500/30 overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(147, 51, 234, 0.3)' }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="text-purple-400" size={32} />
              Item Shop
            </h2>
            <p className="text-purple-300 font-semibold text-lg">Spend your hard-earned coins!</p>
          </div>
          <motion.div 
            className="bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-3 rounded-full border-2 border-yellow-500/50 relative overflow-hidden"
            style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <div className="relative z-10 font-black text-2xl text-yellow-300 flex items-center gap-2">
              <span className="text-3xl">🪙</span>
              {user.coins.toLocaleString()}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Shop Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => {
          const owned = user.inventory.includes(item.id);
          const canAfford = user.coins >= item.cost;
          
          return (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border-2 border-slate-700/50 flex flex-col items-center overflow-hidden group"
              style={{
                boxShadow: owned ? '0 0 30px rgba(34, 197, 94, 0.3)' : '0 0 20px rgba(147, 51, 234, 0.2)'
              }}
            >
              {/* Owned Badge */}
              {owned && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-3 right-3 bg-green-500 rounded-full p-2 z-20"
                  style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)' }}
                >
                  <CheckCircle size={20} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              
              {/* Avatar */}
              <motion.div 
                className="relative w-28 h-28 rounded-full mb-4 overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-500/60 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800">
                  <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                </div>
                {owned && (
                  <motion.div
                    className="absolute inset-0 bg-green-500/20"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              {/* Item Name */}
              <h3 className="font-bold text-white mb-2 text-center relative z-10">{item.name}</h3>
              
              {/* Action Button */}
              {owned ? (
                <motion.button 
                  disabled 
                  className="mt-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full relative overflow-hidden"
                  style={{ boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    Owned
                  </span>
                </motion.button>
              ) : (
                <motion.button 
                  onClick={() => canAfford && onBuy(item)}
                  disabled={!canAfford}
                  whileHover={canAfford ? { scale: 1.05 } : {}}
                  whileTap={canAfford ? { scale: 0.95 } : {}}
                  className={`mt-auto px-6 py-3 rounded-xl font-bold text-sm w-full transition-all flex items-center justify-center gap-2 relative overflow-hidden
                    ${canAfford 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-yellow-500/50' 
                      : 'bg-slate-700/50 text-gray-500 cursor-not-allowed border-2 border-slate-600/50'
                    }
                  `}
                  style={canAfford ? { boxShadow: '0 0 20px rgba(234, 179, 8, 0.4)' } : {}}
                >
                  {canAfford && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">🪙</span>
                    {item.cost}
                  </span>
                </motion.button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}