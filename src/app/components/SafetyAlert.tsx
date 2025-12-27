import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

interface SafetyAlertProps {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  onDismiss?: () => void;
}

export function SafetyAlert({ type, title, message, time, onDismiss }: SafetyAlertProps) {
  const typeConfig = {
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900'
    }
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 rounded-lg shadow-sm`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={config.titleColor}>{title}</h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-700 mb-1">{message}</p>
          <p className="text-xs text-gray-600">{time}</p>
        </div>
      </div>
    </div>
  );
}
