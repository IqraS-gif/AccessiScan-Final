import React from 'react';
import PageTransition from '../components/layout/PageTransition';

export default function Projects() {
  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-primary transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">E-commerce Site</h3>
            <p className="text-slate-400 text-sm mb-4">Last scanned: 2 days ago</p>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-right text-xs text-secondary mt-1">Score: 75/100</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
