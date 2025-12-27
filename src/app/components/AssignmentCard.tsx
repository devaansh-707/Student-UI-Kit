import { Calendar, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface AssignmentCardProps {
  title: string;
  courseName: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming';
  grade?: string;
  points?: number;
  maxPoints?: number;
}

export function AssignmentCard({
  title,
  courseName,
  dueDate,
  status,
  grade,
  points,
  maxPoints
}: AssignmentCardProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      label: 'Completed'
    },
    'in-progress': {
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      label: 'In Progress'
    },
    overdue: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: 'Overdue'
    },
    upcoming: {
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      label: 'Upcoming'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`bg-white rounded-lg border ${config.borderColor} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`${config.bgColor} p-2 rounded-lg`}>
            <FileText className={`w-5 h-5 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h4 className="mb-1">{title}</h4>
            <p className="text-sm text-gray-500">{courseName}</p>
          </div>
        </div>
        {grade && (
          <div className="text-right">
            <div className="text-lg text-green-600">{grade}</div>
            {points !== undefined && maxPoints !== undefined && (
              <div className="text-xs text-gray-500">{points}/{maxPoints} pts</div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Due: {dueDate}</span>
        </div>
        <div className={`flex items-center gap-1 ${config.bgColor} px-2 py-1 rounded-full`}>
          <StatusIcon className={`w-3 h-3 ${config.color}`} />
          <span className={`text-xs ${config.color}`}>{config.label}</span>
        </div>
      </div>
    </div>
  );
}
