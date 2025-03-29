
import React from 'react';
import { Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 flex justify-between items-center border-b border-tutorease-yellow/20 bg-[#121212]">
      <div className="flex items-center gap-2">
        <Terminal className="h-6 w-6 text-tutorease-yellow" />
        <h1 className="text-xl font-mono font-bold text-white">
          <span className="text-tutorease-yellow">TUTOR</span>EASE
        </h1>
      </div>
      <div className="text-sm font-mono text-cyan-400">
        AI-Powered Learning Paths
      </div>
    </header>
  );
};

export default Header;
