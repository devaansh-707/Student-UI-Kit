import { BookOpen, User, Clock, Calendar } from 'lucide-react';

interface CourseCardProps {
  courseName: string;
  courseCode: string;
  instructor: string;
  schedule: string;
  progress: number;
  credits: number;
  color?: string;
}

export function CourseCard({
  courseName,
  courseCode,
  instructor,
  schedule,
  progress,
  credits,
  color = 'blue'
}: CourseCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-500">{courseCode}</span>
            </div>
            <h3 className="text-lg mb-1">{courseName}</h3>
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-sm text-gray-700">{credits} Credits</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{schedule}</span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
