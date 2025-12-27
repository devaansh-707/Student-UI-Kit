import { Mail, Phone, MapPin, Award } from 'lucide-react';

interface StudentProfileCardProps {
  name: string;
  studentId: string;
  major: string;
  year: string;
  email: string;
  phone: string;
  location: string;
  gpa: number;
  imageUrl?: string;
}

export function StudentProfileCard({
  name,
  studentId,
  major,
  year,
  email,
  phone,
  location,
  gpa,
  imageUrl
}: StudentProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="px-6 pb-6">
        <div className="flex items-end -mt-12 mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                <span className="text-3xl text-white">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="ml-auto mb-2">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-700">GPA: {gpa.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-xl">{name}</h3>
            <p className="text-gray-500">ID: {studentId}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-700">{major}</p>
            <p className="text-sm text-gray-500">{year}</p>
          </div>
          
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
