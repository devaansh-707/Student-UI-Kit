import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, School, Calendar, Settings, Bell, Shield } from 'lucide-react';
import { BeamsBackground } from '../components/ui/beams-background';

export function Profile() {
  const [profile, setProfile] = useState({
    name: 'Devaansh Sai',
    email: 'dev@university.edu',
    phone: '',
    studentId: '',
    major: 'Computer Science', // Default
    year: 'Senior',
    location: 'KL University'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    safetyAlerts: true,
    resourceUpdates: true,
    shareLocation: false
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const data = JSON.parse(savedProfile);
        // data structure: { role, institution, department, profile: { firstName, lastName, email, ... } }
        if (data.profile && data.profile.firstName) {
          setProfile(prev => ({
            ...prev,
            name: `${data.profile.firstName} ${data.profile.lastName}`,
            email: data.profile.email || prev.email,
            major: data.department || prev.major,
            location: data.institution || prev.location
          }));
        }
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  const stats = [
    { label: 'Resources Shared', value: '12' },
    { label: 'Items Borrowed', value: '8' },
    { label: 'Campus Connections', value: '45' },
    { label: 'Safety Checks', value: '8' }
  ];

  return (
    <BeamsBackground intensity="medium" className="min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl mb-2 font-bold text-white">My Profile</h2>
          <p className="text-slate-300">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-xl border border-white/10 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-black bg-slate-900 flex items-center justify-center">
                    <span className="text-4xl text-white font-bold">{profile.name.charAt(0)}</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{profile.name}</h3>
                  <p className="text-sm font-medium text-teal-400 mb-1">{profile.major}</p>
                  <p className="text-sm text-slate-400">{profile.year} • {profile.location}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-teal-500/20">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6 mt-6">
              <h3 className="mb-4 font-bold text-white">Activity Stats</h3>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-sm text-slate-300 font-medium">{stat.label}</span>
                    <span className="text-lg font-bold text-teal-400">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notification Settings */}
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <h4 className="mb-1 font-bold text-slate-200">Email Notifications</h4>
                    <p className="text-sm text-slate-400">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <h4 className="mb-1 font-bold text-slate-200">Push Notifications</h4>
                    <p className="text-sm text-slate-400">Receive mobile push notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Privacy & Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <h4 className="mb-1 font-bold text-slate-200">Share Location for Safety</h4>
                    <p className="text-sm text-slate-400">Allow campus security to access your location in emergencies</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.shareLocation}
                      onChange={(e) => setSettings({ ...settings, shareLocation: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
}
