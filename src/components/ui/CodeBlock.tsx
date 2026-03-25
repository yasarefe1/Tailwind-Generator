import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/50 shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/30 border-b border-zinc-800/50">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
}
