import { CheckCircle, Circle } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  title: string;
  milestones: Milestone[];
}

export function ProgressTracker({ title, milestones }: ProgressTrackerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg mb-6">{title}</h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              {milestone.completed ? (
                <CheckCircle className="w-6 h-6 text-green-600 fill-green-100" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
              {index < milestones.length - 1 && (
                <div
                  className={`absolute left-3 top-6 w-0.5 h-8 ${
                    milestone.completed ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </div>
            <div className="flex-1 pb-4">
              <h4 className={milestone.completed ? 'text-gray-900' : 'text-gray-600'}>
                {milestone.title}
              </h4>
              <p className="text-sm text-gray-500">{milestone.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
