import { useState } from 'react';
import { AlertCircle, Phone, X } from 'lucide-react';

interface EmergencyButtonProps {
  onEmergency: () => void;
}

export function EmergencyButton({ onEmergency }: EmergencyButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleEmergencyPress = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    let count = 3;
    setCountdown(count);
    
    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        onEmergency();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setCountdown(null);
  };

  return (
    <>
      <button
        onClick={handleEmergencyPress}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
      >
        <AlertCircle className="w-6 h-6" />
        <span className="text-lg">EMERGENCY SOS</span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-red-600">Confirm Emergency</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              This will alert campus security and share your location. Are you sure you want to proceed?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Emergency
              </button>
            </div>
          </div>
        </div>
      )}

      {countdown !== null && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-95 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-white text-8xl mb-4 animate-pulse">{countdown}</div>
            <p className="text-white text-2xl mb-8">Alerting Campus Security...</p>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100"
            >
              Cancel Alert
            </button>
          </div>
        </div>
      )}
    </>
  );
}
