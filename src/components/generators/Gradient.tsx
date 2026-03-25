import { useState } from 'react';
import CodeBlock from '../ui/CodeBlock';

const directions = [
  { label: 'Top', value: 'to-t', css: 'to top' },
  { label: 'Top Right', value: 'to-tr', css: 'to top right' },
  { label: 'Right', value: 'to-r', css: 'to right' },
  { label: 'Bottom Right', value: 'to-br', css: 'to bottom right' },
  { label: 'Bottom', value: 'to-b', css: 'to bottom' },
  { label: 'Bottom Left', value: 'to-bl', css: 'to bottom left' },
  { label: 'Left', value: 'to-l', css: 'to left' },
  { label: 'Top Left', value: 'to-tl', css: 'to top left' },
];

export default function Gradient() {
  const [direction, setDirection] = useState(directions[2]);
  const [color1, setColor1] = useState('#4f46e5'); // Indigo 600
  const [color2, setColor2] = useState('#ec4899'); // Pink 500
  const [useVia, setUseVia] = useState(false);
  const [colorVia, setColorVia] = useState('#a855f7'); // Purple 500

  // Generate Tailwind Code
  // Note: Tailwind uses specific color names (e.g., from-blue-500). 
  // Since we use a color picker (hex), we generate arbitrary values for Tailwind.
  const tailwindCode = `bg-gradient-${direction.value} from-[${color1}] ${
    useVia ? `via-[${colorVia}] ` : ''
  }to-[${color2}]`;

  // Generate Raw CSS
  const cssGradient = `linear-gradient(${direction.css}, ${color1}, ${
    useVia ? `${colorVia}, ` : ''
  }${color2})`;
  
  const rawCss = `background: ${color1}; /* fallback for old browsers */
background: -webkit-${cssGradient};
background: ${cssGradient};`;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Controls Panel */}
      <div className="w-full lg:w-80 border-r border-zinc-800/50 bg-zinc-950/50 p-6 flex flex-col gap-8 overflow-y-auto">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Gradient</h2>
          <p className="text-sm text-zinc-400">Linear gradient generator</p>
        </div>

        <div className="space-y-6">
          {/* Direction */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300">Direction</label>
            <div className="grid grid-cols-4 gap-2">
              {directions.map((dir) => (
                <button
                  key={dir.value}
                  onClick={() => setDirection(dir)}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                    direction.value === dir.value
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                  }`}
                  title={dir.label}
                >
                  {/* Simple arrow representation based on direction */}
                  <div
                    className="w-4 h-4 border-t-2 border-r-2 border-current transform"
                    style={{
                      transform: `rotate(${
                        dir.value === 'to-t' ? '-45deg' :
                        dir.value === 'to-tr' ? '0deg' :
                        dir.value === 'to-r' ? '45deg' :
                        dir.value === 'to-br' ? '90deg' :
                        dir.value === 'to-b' ? '135deg' :
                        dir.value === 'to-bl' ? '180deg' :
                        dir.value === 'to-l' ? '225deg' :
                        '-90deg' // to-tl
                      })`,
                      marginTop: dir.value.includes('b') ? '-4px' : dir.value.includes('t') ? '4px' : '0',
                      marginLeft: dir.value.includes('r') ? '-4px' : dir.value.includes('l') ? '4px' : '0',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-zinc-300">Colors</label>
            
            {/* Color 1 (From) */}
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-sm text-zinc-400">From</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-mono uppercase">{color1}</span>
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                />
              </div>
            </div>

            {/* Middle Color Toggle & Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-zinc-400">Via (Middle Color)</span>
                <button
                  onClick={() => setUseVia(!useVia)}
                  className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                    useVia ? 'bg-indigo-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                      useVia ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {useVia && (
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800 animate-in fade-in slide-in-from-top-2">
                  <span className="text-sm text-zinc-400">Via</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500 font-mono uppercase">{colorVia}</span>
                    <input
                      type="color"
                      value={colorVia}
                      onChange={(e) => setColorVia(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Color 2 (To) */}
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-sm text-zinc-400">To</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-mono uppercase">{color2}</span>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview & Output Panel */}
      <div className="flex-1 flex flex-col bg-zinc-950 overflow-y-auto">
        {/* Live Preview Area */}
        <div className="p-8 flex-1 flex items-center justify-center min-h-[400px]">
          {/* The Gradient Element */}
          <div
            className="w-full max-w-2xl h-64 rounded-2xl shadow-2xl transition-all duration-300"
            style={{ background: cssGradient }}
          ></div>
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
