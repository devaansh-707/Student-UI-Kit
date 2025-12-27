import { Clock, MapPin } from 'lucide-react';

interface ScheduleItem {
  id: string;
  courseName: string;
  courseCode: string;
  time: string;
  location: string;
  color: string;
}

interface ScheduleCardProps {
  day: string;
  date: string;
  classes: ScheduleItem[];
}

export function ScheduleCard({ day, date, classes }: ScheduleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
        <h3 className="text-xl">{day}</h3>
        <p className="text-sm opacity-90">{date}</p>
      </div>
      
      <div className="p-4">
        {classes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No classes scheduled</p>
        ) : (
          <div className="space-y-3">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-start gap-3 p-3 rounded-lg border-l-4 bg-gray-50"
                style={{ borderLeftColor: classItem.color }}
              >
                <div className="flex-1">
                  <h4 className="mb-1">{classItem.courseName}</h4>
                  <p className="text-sm text-gray-500 mb-2">{classItem.courseCode}</p>
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{classItem.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
