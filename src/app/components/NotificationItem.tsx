import { Bell, BookOpen, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface NotificationItemProps {
  type: 'assignment' | 'grade' | 'announcement' | 'reminder';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export function NotificationItem({
  type,
  title,
  message,
  time,
  isRead
}: NotificationItemProps) {
  const typeConfig = {
    assignment: {
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    grade: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    announcement: {
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    reminder: {
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${isRead ? 'bg-white' : 'bg-blue-50/50'} hover:shadow-md transition-shadow`}>
      <div className={`${config.bgColor} p-2 rounded-lg flex-shrink-0`}>
        <IconComponent className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="truncate">{title}</h4>
          {!isRead && (
            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-1">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
