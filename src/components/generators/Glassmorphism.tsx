import { useState } from 'react';
import CodeBlock from '../ui/CodeBlock';

export default function Glassmorphism() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(10);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [radius, setRadius] = useState(16);
  const [color, setColor] = useState<'white' | 'black'>('white');

  // Generate Tailwind Classes
  const blurClass = `backdrop-blur-[${blur}px]`;
  const bgClass = color === 'white' ? `bg-white/[0.${opacity.toString().padStart(2, '0')}]` : `bg-black/[0.${opacity.toString().padStart(2, '0')}]`;
  const borderClass = color === 'white' ? `border border-white/[0.${borderOpacity.toString().padStart(2, '0')}]` : `border border-black/[0.${borderOpacity.toString().padStart(2, '0')}]`;
  const radiusClass = `rounded-[${radius}px]`;
  
  const tailwindCode = `${bgClass} ${blurClass} ${borderClass} ${radiusClass} shadow-xl`;

  // Generate Raw CSS
  const rawCss = `background: rgba(${color === 'white' ? '255, 255, 255' : '0, 0, 0'}, ${opacity / 100});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(${color === 'white' ? '255, 255, 255' : '0, 0, 0'}, ${borderOpacity / 100});
border-radius: ${radius}px;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);`;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Controls Panel */}
      <div className="w-full lg:w-80 border-r border-zinc-800/50 bg-zinc-950/50 p-6 flex flex-col gap-8 overflow-y-auto">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Glassmorphism</h2>
          <p className="text-sm text-zinc-400">Frosted glass effect generator</p>
        </div>

        <div className="space-y-6">
          {/* Color Theme */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Theme</span>
            </label>
            <div className="flex gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
              <button
                onClick={() => setColor('white')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  color === 'white' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setColor('black')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  color === 'black' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Blur Control */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Blur</span>
              <span className="text-zinc-500">{blur}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Opacity Control */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Background Opacity</span>
              <span className="text-zinc-500">{opacity}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Border Opacity Control */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Border Opacity</span>
              <span className="text-zinc-500">{borderOpacity}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Border Radius Control */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Border Radius</span>
              <span className="text-zinc-500">{radius}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Preview & Output Panel */}
      <div className="flex-1 flex flex-col bg-zinc-950 overflow-y-auto">
        {/* Live Preview Area */}
        <div className="p-8 flex-1 flex items-center justify-center min-h-[400px] relative overflow-hidden">
          {/* Abstract Background for Preview */}
          <div className="absolute inset-0 bg-zinc-900">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>

          {/* The Glass Element */}
          <div
            className="relative z-10 w-full max-w-md p-8 shadow-2xl flex flex-col gap-4"
            style={{
              background: `rgba(${color === 'white' ? '255, 255, 255' : '0, 0, 0'}, ${opacity / 100})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(${color === 'white' ? '255, 255, 255' : '0, 0, 0'}, ${borderOpacity / 100})`,
              borderRadius: `${radius}px`,
            }}
          >
            <div className={`w-12 h-12 rounded-full mb-2 ${color === 'white' ? 'bg-white/20' : 'bg-black/20'}`}></div>
            <div className={`h-4 w-3/4 rounded ${color === 'white' ? 'bg-white/40' : 'bg-black/40'}`}></div>
            <div className={`h-4 w-1/2 rounded ${color === 'white' ? 'bg-white/20' : 'bg-black/20'}`}></div>
            <div className={`h-4 w-5/6 rounded mt-4 ${color === 'white' ? 'bg-white/10' : 'bg-black/10'}`}></div>
          </div>
        </div>

        {/* Code Output Area */}
        <div className="border-t border-zinc-800/50 bg-zinc-950/80 p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-400">Tailwind CSS</h3>
              <CodeBlock code={tailwindCode} language="html" />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-400">Raw CSS</h3>
              <CodeBlock code={rawCss} language="css" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
