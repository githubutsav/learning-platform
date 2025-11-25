import React from 'react';
import { LEARNING_PATHS } from '../data/mockData';

export default function FrontendRoadmap({ pathId = 5 }) {
  const path = LEARNING_PATHS.find((p) => p.id === pathId);
  if (!path) return <div className="text-sm text-slate-300">Learning path not found.</div>;

  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{path.icon}</div>
          <div>
            <h4 className="text-white font-bold">{path.title}</h4>
            <div className="text-xs text-slate-400">{path.description}</div>
          </div>
        </div>
        <div className="text-xs text-slate-400">Est. {path.estimatedTime}</div>
      </div>

      <div className="space-y-3">
        {path.quests.map((chapter) => (
          <div key={chapter.id} className="p-3 bg-slate-800/50 rounded-md border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white font-semibold">{chapter.title}</div>
              <div className="text-xs text-slate-400">{chapter.nodes.length} items</div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-300">
              {chapter.nodes.map((n) => (
                <div key={n.id} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${n.status === 'completed' ? 'bg-green-400' : n.status === 'unlocked' ? 'bg-yellow-400' : 'bg-slate-600'}`} />
                  <div className="truncate">{n.title} <span className="text-slate-500">({n.type})</span></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
