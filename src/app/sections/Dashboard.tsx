import { useState, useEffect } from 'react';
import { PlusCircle, Users } from 'lucide-react';
import { FeedCard } from '../components/FeedCard';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { ButtonColorful } from '../components/ButtonColorful';
import { initialResources } from '../../data/initialResources';
import { Resource } from '../../types';
import { BeamsBackground } from '../components/ui/beams-background';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    // Load items from local storage + seed data
    // In a real app, this would be an API call fetching "feed" items
    const saved = localStorage.getItem('campus_resources_v4');
    const allResources = saved ? JSON.parse(saved) : initialResources;
    setResources(allResources);
  }, []);

  return (
    <BeamsBackground intensity="medium" className="min-h-full">
      <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Feed Header */}
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">Welcome back, Dev</h2>
              <p className="text-slate-300 text-sm leading-relaxed">Here is the latest research and resources from your network at <span className="text-teal-400 font-semibold">KL University</span>.</p>

              <div className="mt-6 flex gap-3">
                <ButtonColorful
                  label="Add new resource"
                  icon={PlusCircle}
                  onClick={() => onNavigate('resources')}
                />
                <ButtonColorful
                  label="Invite colleagues"
                  icon={Users}
                />
              </div>
            </div>

            {/* Feed Items */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Your Feed</h3>
              {resources.map((resource) => (
                <FeedCard key={resource.id} resource={resource} />
              ))}

              <div className="text-center py-8">
                <p className="text-slate-400 text-sm mb-4">You're all caught up!</p>
                <button className="text-teal-400 font-bold text-sm hover:underline">
                  Discover more in Engineering
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <DashboardSidebar />
            </div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
}
