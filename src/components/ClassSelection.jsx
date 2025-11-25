import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { CS_INTERESTS } from '../data/mockData';

export default function ClassSelection({ onSelect }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleInterest = (interest) => {
    if (selectedInterests.find(i => i.id === interest.id)) {
      setSelectedInterests(selectedInterests.filter(i => i.id !== interest.id));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const filteredInterests = CS_INTERESTS.filter(interest => 
    interest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interest.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedInterests = filteredInterests.reduce((acc, interest) => {
    if (!acc[interest.category]) {
      acc[interest.category] = [];
    }
    acc[interest.category].push(interest);
    return acc;
  }, {});

  const handleContinue = () => {
    if (selectedInterests.length > 0) {
      onSelect(selectedInterests);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-black text-white mb-4">What are you interested in?</h1>
          <p className="text-xl text-slate-400">Choose topics you'd like to learn about. You can always change these later.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800 border-2 border-slate-700 focus:border-purple-500 focus:outline-none text-lg text-white placeholder-slate-500 transition-all"
          />
        </motion.div>

        {/* Selected Count & Continue Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6 bg-slate-800 p-5 rounded-2xl border-2 border-purple-500/30"
          style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.2)' }}
        >
          <div className="text-white">
            <span className="font-black text-2xl text-purple-400">{selectedInterests.length}</span>
            <span className="text-lg ml-2">interests selected</span>
          </div>
          <motion.button
            onClick={handleContinue}
            disabled={selectedInterests.length === 0}
            whileHover={selectedInterests.length > 0 ? { scale: 1.05 } : {}}
            whileTap={selectedInterests.length > 0 ? { scale: 0.95 } : {}}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              selectedInterests.length > 0
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            style={selectedInterests.length > 0 ? { boxShadow: '0 8px 25px rgba(147, 51, 234, 0.5)' } : {}}
          >
            Continue
          </motion.button>
        </motion.div>

        {/* Selected Interests Pills */}
        {selectedInterests.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-slate-800 p-5 rounded-2xl border-2 border-slate-700"
          >
            <div className="flex flex-wrap gap-3">
              {selectedInterests.map((interest, index) => (
                <motion.button
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleInterest(interest)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${interest.color} text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg`}
                >
                  {interest.name}
                  <X size={18} strokeWidth={3} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interests Grid by Category */}
        <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(groupedInterests).map(([category, interests], catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => {
                  const isSelected = selectedInterests.find(i => i.id === interest.id);
                  return (
                    <motion.button
                      key={interest.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + catIndex * 0.1 + index * 0.02 }}
                      onClick={() => toggleInterest(interest)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                        isSelected
                          ? `${interest.color} text-white shadow-xl border-2 border-white/30`
                          : 'bg-slate-800 text-slate-300 border-2 border-slate-700 hover:border-purple-500/50 hover:text-white'
                      }`}
                      style={isSelected ? { boxShadow: '0 8px 25px rgba(0,0,0,0.3)' } : {}}
                    >
                      {interest.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}