import { Phone, MapPin, Clock } from 'lucide-react';

interface SafetyContactProps {
  name: string;
  number: string;
  description: string;
  availability: string;
  location?: string;
  type: 'emergency' | 'support' | 'info';
}

export function SafetyContact({
  name,
  number,
  description,
  availability,
  location,
  type
}: SafetyContactProps) {
  const typeColors = {
    emergency: 'border-l-red-500 bg-red-50',
    support: 'border-l-blue-500 bg-blue-50',
    info: 'border-l-green-500 bg-green-50'
  };

  return (
    <div className={`bg-white rounded-lg border-l-4 ${typeColors[type]} p-4 shadow-sm`}>
      <h4 className="mb-2">{name}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-2">
        <a
          href={`tel:${number}`}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Phone className="w-4 h-4" />
          <span>{number}</span>
        </a>
        
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{availability}</span>
        </div>
      </div>
    </div>
  );
}
