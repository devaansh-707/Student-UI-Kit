import { Clock, BookOpen, Target, TrendingUp } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: typeof Clock;
  color: string;
  bgColor: string;
  trend?: string;
}

export function StudyStatsCard() {
  const stats: StatItem[] = [
    {
      label: 'Study Hours',
      value: '24.5h',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+12%'
    },
    {
      label: 'Assignments',
      value: '8/12',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '67%'
    },
    {
      label: 'Courses',
      value: '5',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Avg Grade',
      value: '88%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+3%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
              {stat.trend && (
                <span className={`text-sm ${stat.color}`}>{stat.trend}</span>
              )}
            </div>
            <p className="text-2xl mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
