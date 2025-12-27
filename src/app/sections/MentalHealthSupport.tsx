import { ChatBot } from '../components/ChatBot';
import { Heart, Phone, Calendar, BookOpen, Users, AlertCircle } from 'lucide-react';

export function MentalHealthSupport() {
  const resources = [
    {
      title: 'Campus Counseling Center',
      description: 'Free individual and group therapy sessions',
      icon: Heart,
      color: 'bg-purple-100 text-purple-600',
      contact: '(555) 246-8888',
      hours: 'Mon-Fri 9am-5pm'
    },
    {
      title: 'Crisis Hotline',
      description: '24/7 confidential support',
      icon: Phone,
      color: 'bg-red-100 text-red-600',
      contact: '988',
      hours: '24/7 Available'
    },
    {
      title: 'Wellness Workshops',
      description: 'Stress management and mindfulness sessions',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      contact: 'wellness@campus.edu',
      hours: 'Various times'
    },
    {
      title: 'Self-Help Resources',
      description: 'Guided meditations and mental health articles',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
      contact: 'Online Portal',
      hours: 'Always Available'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Mental Health Support</h2>
        <p className="text-gray-600">Your wellbeing matters. We're here to help.</p>
      </div>

      {/* Crisis Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-900 mb-1">In Crisis?</h3>
            <p className="text-sm text-red-800 mb-2">
              If you're experiencing a mental health emergency, please reach out immediately:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-red-900">• Call 988 (National Crisis Hotline)</p>
              <p className="text-red-900">• Text "CAMPUS" to 741741</p>
              <p className="text-red-900">• Call Campus Emergency: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chatbot - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ChatBot />
        </div>

        {/* Resources - Takes 1 column */}
        <div className="space-y-4">
          <h3 className="text-xl mb-4">Additional Resources</h3>
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`${resource.color} p-3 rounded-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{resource.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-blue-600">{resource.contact}</p>
                      <p className="text-gray-500">{resource.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl mb-4">Mental Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="mb-2">Take Breaks</h4>
            <p className="text-sm text-gray-600">Step away from studies regularly to recharge your mind</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="mb-2">Stay Connected</h4>
            <p className="text-sm text-gray-600">Reach out to friends, family, or counselors when needed</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="mb-2">Practice Self-Care</h4>
            <p className="text-sm text-gray-600">Exercise, sleep well, and engage in activities you enjoy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
