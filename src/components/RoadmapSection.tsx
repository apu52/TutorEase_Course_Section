
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface RoadmapItem {
  text: string;
  subItems?: RoadmapItem[];
  highlight?: boolean;
  italic?: boolean;
  color?: string;
  description?: string;
  timeframe?: string;
}

interface RoadmapSectionProps {
  title: string;
  titleColor?: string;
  items: RoadmapItem[];
  level?: number;
}

// Component to render a single item with potential sub-items
const RoadmapItem: React.FC<{ item: RoadmapItem; level: number }> = ({ item, level }) => {
  const indent = level * 20;
  
  return (
    <div className="relative">
      <div 
        className="flex items-start gap-2" 
        style={{ marginLeft: `${indent}px` }}
      >
        {level > 0 && (
          <div className="flex items-center h-6">
            <span className="text-tutorease-yellow">├── </span>
          </div>
        )}
        <div className="flex flex-col">
          <div 
            className={`${item.highlight ? 'text-tutorease-yellow' : ''} 
                      ${item.italic ? 'italic' : ''} 
                      ${item.color ? `text-${item.color}` : 'text-cyan-400'}`}
          >
            {item.text}
            {item.timeframe && <span className="text-green-400 ml-2">- {item.timeframe}</span>}
          </div>
          
          {item.description && (
            <div className="text-white/90 italic ml-4 text-sm mt-1">
              {item.description}
            </div>
          )}
        </div>
      </div>
      
      {item.subItems && item.subItems.map((subItem, index) => (
        <RoadmapItem 
          key={index} 
          item={subItem} 
          level={level + 1} 
        />
      ))}
    </div>
  );
};

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ 
  title, 
  titleColor = "cyan-400", 
  items,
  level = 0 
}) => {
  return (
    <div className="space-y-3 font-mono border border-tutorease-yellow/30 p-4 bg-[#0c1e35]/50 rounded">
      <div className={`text-${titleColor} text-xl font-bold pb-2 text-center border-b border-${titleColor}/30`}>
        {title}
      </div>
      
      <div className="space-y-2 pt-2">
        {items.map((item, index) => (
          <RoadmapItem key={index} item={item} level={level} />
        ))}
      </div>
    </div>
  );
};

export default RoadmapSection;
