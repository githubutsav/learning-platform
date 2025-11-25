import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Trash2, Edit2, Calendar, Target, BookOpen, TrendingUp, X } from 'lucide-react';

export default function GoalsPlanner() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete Python Course', type: 'learning', completed: false, dueDate: '2025-12-01', notes: 'Focus on data structures' },
    { id: 2, title: 'Build Portfolio Project', type: 'project', completed: false, dueDate: '2025-11-30', notes: 'Create a web app using React' },
    { id: 3, title: 'Practice Daily Coding', type: 'habit', completed: true, dueDate: '2025-11-25', notes: 'Solve 2 problems per day' },
  ]);
  
  const [notes, setNotes] = useState('Today I learned about async/await in JavaScript. Need to practice more examples tomorrow.');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', type: 'learning', dueDate: '', notes: '' });
  const [activeTab, setActiveTab] = useState('goals'); // goals, diary, stats

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      setGoals([...goals, { ...newGoal, id: Date.now(), completed: false }]);
      setNewGoal({ title: '', type: 'learning', dueDate: '', notes: '' });
      setShowAddGoal(false);
    }
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const getGoalIcon = (type) => {
    switch(type) {
      case 'learning': return <BookOpen size={20} />;
      case 'project': return <Target size={20} />;
      case 'habit': return <TrendingUp size={20} />;
      default: return <Target size={20} />;
    }
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progressPercentage = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border-2 border-purple-500/30 relative overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(147, 51, 234, 0.25)' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
            <Target className="text-purple-400" size={40} />
            My Goals & Plans
          </h1>
          <p className="text-slate-400 text-lg">Track your progress, set goals, and plan your learning journey</p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-3">
        {[
          { id: 'goals', label: 'Goals', icon: Target },
          { id: 'diary', label: 'Learning Diary', icon: BookOpen },
          { id: 'stats', label: 'Statistics', icon: TrendingUp }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            style={activeTab === tab.id ? { boxShadow: '0 0 25px rgba(147, 51, 234, 0.5)' } : {}}
          >
            <tab.icon size={20} />
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Active Goals</h2>
              <motion.button
                onClick={() => setShowAddGoal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold shadow-xl"
                style={{ boxShadow: '0 0 25px rgba(147, 51, 234, 0.5)' }}
              >
                <Plus size={20} />
                Add Goal
              </motion.button>
            </div>

            {/* Add Goal Modal */}
            {showAddGoal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800 p-6 rounded-2xl border-2 border-purple-500/30 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">New Goal</h3>
                  <button onClick={() => setShowAddGoal(false)} className="text-slate-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Goal title..."
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="learning">Learning Goal</option>
                  <option value="project">Project Goal</option>
                  <option value="habit">Daily Habit</option>
                </select>
                <input
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                />
                <textarea
                  placeholder="Notes (optional)..."
                  value={newGoal.notes}
                  onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
                  rows="3"
                />
                <motion.button
                  onClick={handleAddGoal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold"
                >
                  Create Goal
                </motion.button>
              </motion.div>
            )}

            {/* Goals */}
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`bg-slate-800/50 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    goal.completed ? 'border-green-500/30 bg-green-900/10' : 'border-slate-700/50 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <motion.button
                      onClick={() => toggleGoal(goal.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="mt-1"
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="text-green-400" size={28} strokeWidth={2.5} />
                      ) : (
                        <Circle className="text-slate-500 hover:text-purple-400" size={28} strokeWidth={2.5} />
                      )}
                    </motion.button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          goal.type === 'learning' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                          goal.type === 'project' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                          'bg-green-500/20 text-green-400 border border-green-500/50'
                        }`}>
                          {getGoalIcon(goal.type)}
                        </span>
                        {goal.dueDate && (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={14} />
                            {new Date(goal.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${goal.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                        {goal.title}
                      </h3>
                      {goal.notes && (
                        <p className="text-slate-400 text-sm">{goal.notes}</p>
                      )}
                    </div>

                    <motion.button
                      onClick={() => deleteGoal(goal.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border-2 border-purple-500/30"
              style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.2)' }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Overall Progress</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-slate-400">
                  {completedCount} of {goals.length} goals completed
                </p>
              </div>
              <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 p-6 rounded-2xl border-2 border-slate-700/50"
            >
              <h3 className="text-lg font-bold text-white mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Goals</span>
                  <span className="font-bold text-white">{goals.filter(g => !g.completed).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completed</span>
                  <span className="font-bold text-green-400">{completedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">This Week</span>
                  <span className="font-bold text-purple-400">5 goals</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Diary Tab */}
      {activeTab === 'diary' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 p-8 rounded-2xl border-2 border-slate-700/50"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <BookOpen className="text-purple-400" />
            Learning Diary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write about what you learned today, challenges you faced, or ideas for tomorrow..."
              className="w-full h-64 px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold"
            >
              Save Entry
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Goals Completed', value: completedCount, icon: CheckCircle2, color: 'green' },
            { label: 'Active Goals', value: goals.filter(g => !g.completed).length, icon: Target, color: 'purple' },
            { label: 'Success Rate', value: `${Math.round(progressPercentage)}%`, icon: TrendingUp, color: 'blue' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-slate-800 p-6 rounded-2xl border-2 border-${stat.color}-500/30`}
              style={{ boxShadow: `0 0 30px rgba(${stat.color === 'green' ? '34, 197, 94' : stat.color === 'purple' ? '147, 51, 234' : '59, 130, 246'}, 0.2)` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${stat.color}-500/20 rounded-xl`}>
                  <stat.icon className={`text-${stat.color}-400`} size={28} />
                </div>
                <div>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
