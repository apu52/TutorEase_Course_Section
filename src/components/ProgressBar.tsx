
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  isLoading: boolean;
  onComplete: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      setProgress(0);
      const duration = 3000; // 3 seconds total
      const interval = 30; // Update every 30ms
      const increment = 100 / (duration / interval);
      
      timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + increment;
          
          // Complete at 100%
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 500); // Small delay after reaching 100%
            return 100;
          }
          
          return newProgress;
        });
      }, interval);
    } else {
      setProgress(0);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 card-gradient rounded-lg animate-fade-in">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Generating your personalized learning path</h3>
          <span className="text-tutorease-yellow font-mono">{Math.round(progress)}%</span>
        </div>
        
        <div className="h-4 w-full rounded-full progress-bar-bg overflow-hidden">
          <div 
            className="h-full progress-bar-fill transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-white/70 text-sm animate-pulse-opacity">
          Analyzing learning resources and creating a personalized roadmap...
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
