import { useState } from 'react';
import { EmergencyButton } from '../components/EmergencyButton';
import { SafetyContact } from '../components/SafetyContact';
import { SafetyAlert } from '../components/SafetyAlert';
import { MapPin, Shield, Users, Phone, Navigation } from 'lucide-react';

export function CampusSafety() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning' as const,
      title: 'Weather Alert',
      message: 'Severe thunderstorm warning in effect until 8 PM. Seek indoor shelter.',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Safety Reminder',
      message: 'Use the buddy system when walking campus at night. SafeWalk service available.',
      time: '5 hours ago'
    }
  ]);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sharing, setSharing] = useState(false);

  const handleEmergency = () => {
    // Simulate emergency alert
    alert('🚨 EMERGENCY ALERT SENT\n\nCampus Security has been notified and is en route to your location.\n\nHelp is on the way!\n\nStay on the line: (555) 123-4567');
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      setSharing(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setSharing(false);
          alert('Location shared with Campus Security!\nLat: ' + position.coords.latitude.toFixed(4) + '\nLng: ' + position.coords.longitude.toFixed(4));
        },
        () => {
          setSharing(false);
          alert('Unable to access location. Please ensure location services are enabled.');
        }
      );
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Campus Safety</h2>
        <p className="text-gray-600">Your safety is our top priority</p>
      </div>

      {/* Emergency Trigger Section */}
      <div className="mb-12 flex justify-center">
        <button
          onClick={handleEmergency}
          className="group relative flex flex-col items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-red-600 to-rose-700 shadow-[0_0_60px_-15px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95"
        >
          {/* Pulse Waves */}
          <div className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-red-500/50 animate-pulse delay-75"></div>

          <div className="relative z-10 flex flex-col items-center">
            <Shield className="w-16 h-16 text-white mb-3" />
            <span className="text-2xl font-black text-white tracking-widest uppercase">SOS</span>
            <span className="text-xs font-bold text-red-100 mt-1 uppercase tracking-widest">Emergency Trigger</span>
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={handleShareLocation}
          disabled={sharing}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left border-2 border-transparent hover:border-blue-200"
        >
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg mb-2">{sharing ? 'Sharing...' : 'Share Location'}</h3>
          <p className="text-sm text-gray-600">Share your current location with campus security</p>
        </button>

        <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left border-2 border-transparent hover:border-green-200">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg mb-2">SafeWalk</h3>
          <p className="text-sm text-gray-600">Request a safety escort across campus</p>
        </button>

        <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left border-2 border-transparent hover:border-purple-200">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg mb-2">Safety Tips</h3>
          <p className="text-sm text-gray-600">View campus safety guidelines and resources</p>
        </button>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl mb-4">Active Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <SafetyAlert
                key={alert.id}
                {...alert}
                onDismiss={() => dismissAlert(alert.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <div>
        <h3 className="text-xl mb-4">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SafetyContact
            name="Campus Police"
            number="(555) 123-4567"
            description="24/7 campus security and emergency response"
            availability="24/7 Available"
            location="Security Building, Main Campus"
            type="emergency"
          />
          <SafetyContact
            name="Emergency Services (911)"
            number="911"
            description="Fire, medical, and police emergencies"
            availability="24/7 Available"
            type="emergency"
          />
          <SafetyContact
            name="Student Health Center"
            number="(555) 246-8000"
            description="Medical care and health services"
            availability="Mon-Fri 8am-6pm"
            location="Health Center, East Campus"
            type="support"
          />
          <SafetyContact
            name="Title IX Office"
            number="(555) 246-9000"
            description="Report discrimination or harassment"
            availability="Mon-Fri 9am-5pm"
            location="Admin Building, Room 200"
            type="support"
          />
          <SafetyContact
            name="SafeWalk Service"
            number="(555) 123-WALK"
            description="Free walking escort service"
            availability="Daily 7pm-2am"
            location="Request via phone"
            type="info"
          />
          <SafetyContact
            name="Facilities Emergency"
            number="(555) 246-7000"
            description="Building emergencies and maintenance"
            availability="24/7 Available"
            type="info"
          />
        </div>
      </div>

      {/* Safety Features Info */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <h3 className="text-blue-900 mb-3">Campus Safety Features</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Emergency blue light phones located throughout campus</li>
          <li>• 24/7 campus security patrol</li>
          <li>• Well-lit pathways and parking areas</li>
          <li>• Security cameras in public areas</li>
          <li>• Regular safety training and workshops</li>
          <li>• Campus safety app with panic button feature</li>
        </ul>
      </div>
    </div>
  );
}
