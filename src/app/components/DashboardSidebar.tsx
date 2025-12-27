import { User, Briefcase, ChevronRight } from 'lucide-react';

export function DashboardSidebar() {
    return (
        <div className="space-y-6">
            {/* Profile Progress Widget */}
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-slate-300">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Devaansh Sai</h3>
                        <p className="text-xs text-slate-400">KL University • CSE</p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Profile Strength</span>
                        <span className="text-teal-400">Intermediate</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-teal-500 rounded-full"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                        <div>
                            <p className="text-sm font-bold text-red-100">Dev, you're not verified yet</p>
                            <p className="text-xs text-red-200/70 mt-1">Confirm your institutional email address to get your Verified Badge.</p>
                            <button className="mt-2 text-xs font-bold text-red-300 hover:text-red-200 hover:underline">Verify now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Internships/Jobs Widget */}
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-sm">Internships you may be interested in</h3>
                    <button className="text-xs text-blue-400 hover:underline">View more</button>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'Research Intern (ML)', company: 'Microsoft India', location: 'Hyderabad' },
                        { title: 'Frontend Developer', company: 'Swiggy', location: 'Remote' },
                        { title: 'Data Analyst Intern', company: 'Deloitte', location: 'Hyderabad' }
                    ].map((job, i) => (
                        <div key={i} className="flex gap-3 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-md transition-colors">
                            <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <Briefcase className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{job.title}</h4>
                                <p className="text-xs text-slate-400">{job.company}</p>
                                <p className="text-xs text-slate-500">{job.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-2 px-2">
                <span className="hover:text-slate-300 cursor-pointer transition-colors">About us</span>
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Help Center</span>
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms</span>
                <span>© 2025 StudentHub</span>
            </div>
        </div>
    );
}
