import { Mail, Phone } from 'lucide-react';

interface StudentListItemProps {
  name: string;
  studentId: string;
  major: string;
  email: string;
  phone: string;
  imageUrl?: string;
}

export function StudentListItem({
  name,
  studentId,
  major,
  email,
  phone,
  imageUrl
}: StudentListItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
            <span className="text-xl text-white">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="truncate mb-1">{name}</h4>
        <p className="text-sm text-gray-500 mb-1">ID: {studentId} • {major}</p>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
