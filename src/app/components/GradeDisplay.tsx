import { TrendingUp, Award } from 'lucide-react';

interface CourseGrade {
  courseName: string;
  grade: string;
  percentage: number;
  credits: number;
}

interface GradeDisplayProps {
  gpa: number;
  totalCredits: number;
  courseGrades: CourseGrade[];
}

export function GradeDisplay({ gpa, totalCredits, courseGrades }: GradeDisplayProps) {
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl">Academic Performance</h3>
          <Award className="w-8 h-8" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-90">Cumulative GPA</p>
            <p className="text-4xl">{gpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Total Credits</p>
            <p className="text-4xl">{totalCredits}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-lg mb-4">Current Semester Grades</h4>
        <div className="space-y-3">
          {courseGrades.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm mb-1">{course.courseName}</p>
                <p className="text-xs text-gray-500">{course.credits} Credits</p>
              </div>
              <div className="text-right">
                <p className={`text-xl ${getGradeColor(course.percentage)}`}>{course.grade}</p>
                <p className="text-xs text-gray-500">{course.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
