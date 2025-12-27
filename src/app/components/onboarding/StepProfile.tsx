import { useState } from 'react';

interface StepProfileProps {
    onComplete: (data: any) => void;
}

export function StepProfile({ onComplete }: StepProfileProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'India',
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete(formData);
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Join your academic community</h2>
                <p className="text-slate-500 text-sm">Read the latest publications in your field • Discuss your work</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">First name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Last name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Country/Region</label>
                    <select
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                    >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Your institution email</label>
                    <input
                        type="email"
                        required
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <button type="button" className="text-xs text-blue-600 hover:underline">Show password</button>
                    </div>
                    <input
                        type="password"
                        required
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                    <p className="text-xs text-slate-500">
                        I agree to the <span className="text-blue-600">Terms of Service</span> and acknowledge the <span className="text-blue-600">Privacy Policy</span>.
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg mt-4"
                >
                    Continue
                </button>
            </form>
        </div>
    );
}
