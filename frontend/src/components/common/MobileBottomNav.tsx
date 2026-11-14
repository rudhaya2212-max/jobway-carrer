import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { Compass, Globe, Map, Code2, MessageSquare, Zap, LucideIcon } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const items: { id: ActiveTab; label: string; icon: LucideIcon }[] = [
    { id: 'dashboard', label: 'Home', icon: Compass },
    { id: 'careers', label: 'Careers', icon: Globe },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'workspace', label: 'Lab', icon: Code2 },
    { id: 'community', label: 'Community', icon: MessageSquare },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-2 py-1 flex items-center justify-around">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${isActive ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            <Icon className={`h-4 w-4 stroke-[1.8] ${isActive ? 'stroke-[2.2]' : ''}`} />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
