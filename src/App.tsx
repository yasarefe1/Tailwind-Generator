import { useState } from 'react';
import { Layers, Droplet, Palette, Copy, Check, Github } from 'lucide-react';
import Glassmorphism from './components/generators/Glassmorphism';
import BoxShadow from './components/generators/BoxShadow';
import Gradient from './components/generators/Gradient';

export type GeneratorType = 'glassmorphism' | 'box-shadow' | 'gradient';

export default function App() {
  const [activeTab, setActiveTab] = useState<GeneratorType>('glassmorphism');

  const tabs = [
    { id: 'glassmorphism', label: 'Glassmorphism', icon: Droplet },
    { id: 'box-shadow', label: 'Box Shadow', icon: Layers },
    { id: 'gradient', label: 'Gradient', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-indigo-500/30">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">Tailwind Generator</h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800/50 bg-zinc-950/30 p-4 flex flex-col gap-2 overflow-y-auto">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">
            Generators
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as GeneratorType)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Active Generator View */}
        <section className="flex-1 overflow-y-auto bg-zinc-950">
          {activeTab === 'glassmorphism' && <Glassmorphism />}
          {activeTab === 'box-shadow' && <BoxShadow />}
          {activeTab === 'gradient' && <Gradient />}
        </section>
      </main>
    </div>
  );
}
