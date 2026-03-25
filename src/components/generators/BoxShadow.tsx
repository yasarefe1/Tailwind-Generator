import { useState } from 'react';
import CodeBlock from '../ui/CodeBlock';

export default function BoxShadow() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(20);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [opacity, setOpacity] = useState(10);
  const [inset, setInset] = useState(false);
  const [color, setColor] = useState('#000000');

  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0';
  };

  const rgbColor = hexToRgb(color);
  const shadowValue = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px rgba(${rgbColor}, ${opacity / 100})`;
  
  // Tailwind Code
  const tailwindCode = `shadow-[${shadowValue.replace(/ /g, '_')}]`;

  // Raw CSS Code
  const rawCss = `box-shadow: ${shadowValue};
-webkit-box-shadow: ${shadowValue};
-moz-box-shadow: ${shadowValue};`;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Controls Panel */}
      <div className="w-full lg:w-80 border-r border-zinc-800/50 bg-zinc-950/50 p-6 flex flex-col gap-8 overflow-y-auto">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Box Shadow</h2>
          <p className="text-sm text-zinc-400">Custom shadow generator</p>
        </div>

        <div className="space-y-6">
          {/* Inset Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">Inset Shadow</label>
            <button
              onClick={() => setInset(!inset)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                inset ? 'bg-indigo-500' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  inset ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* X Offset */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Horizontal Offset (X)</span>
              <span className="text-zinc-500">{x}px</span>
            </label>
            <input
              type="range"
              min="-100"
              max="100"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Y Offset */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Vertical Offset (Y)</span>
              <span className="text-zinc-500">{y}px</span>
            </label>
            <input
              type="range"
              min="-100"
              max="100"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Blur Radius */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Blur Radius</span>
              <span className="text-zinc-500">{blur}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="150"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Spread Radius */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex justify-between">
              <span>Spread Radius</span>
              <span className="text-zinc-500">{spread}px</span>
            </label>
            <input
              type="range"
              min="-100"
              max="100"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Color & Opacity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <span className="text-xs text-zinc-500 uppercase font-mono">{color}</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300 flex justify-between">
                <span>Opacity</span>
                <span className="text-zinc-500">{opacity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview & Output Panel */}
      <div className="flex-1 flex flex-col bg-zinc-950 overflow-y-auto">
        {/* Live Preview Area */}
        <div className="p-8 flex-1 flex items-center justify-center min-h-[400px] bg-zinc-100">
          {/* The Shadow Element */}
          <div
            className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center transition-shadow duration-200"
            style={{ boxShadow: shadowValue }}
          >
            <div className="text-zinc-400 font-medium tracking-wide">Preview</div>
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
