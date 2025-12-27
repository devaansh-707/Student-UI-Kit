import { ArrowRight, BookOpen, Search, Shield, Users, BarChart3, Globe } from 'lucide-react';
import { BeamsBackground } from '../components/ui/beams-background';

interface LandingPageProps {
    onGetStarted: () => void;
    onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
                            C
                        </div>
                        <span className="text-xl font-bold text-teal-600 tracking-tight">CampusShare</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onLogin} className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
                            Log in
                        </button>
                        <button
                            onClick={onGetStarted}
                            className="px-5 py-2.5 rounded-full bg-teal-500 text-white text-sm font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/30"
                        >
                            Join for free
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <BeamsBackground className="pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
                    <div className="space-y-8 text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                            Discover academic knowledge and stay connected to your <span className="text-teal-400">campus world</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                            Access textbooks, research papers, and tools shared by peers. join a community dedicated to smarter learning.
                        </p>
                        <button
                            onClick={onGetStarted}
                            className="px-8 py-4 rounded-full bg-teal-500 text-white font-bold text-lg hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 hover:scale-105 active:scale-95"
                        >
                            Join for free
                        </button>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-slate-700/50">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000"
                                alt="Students collaborating"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </BeamsBackground>

            {/* Discover Research Section */}
            <div className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="relative w-full max-w-md aspect-square bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 p-12">
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    <div className="bg-teal-50 p-6 rounded-2xl flex flex-col items-center gap-3">
                                        <BookOpen className="w-8 h-8 text-teal-600" />
                                        <span className="text-xs font-bold text-teal-800">40+ Books</span>
                                    </div>
                                    <div className="bg-blue-50 p-6 rounded-2xl flex flex-col items-center gap-3 mt-8">
                                        <Globe className="w-8 h-8 text-blue-600" />
                                        <span className="text-xs font-bold text-blue-800">Global Access</span>
                                    </div>
                                    <div className="bg-indigo-50 p-6 rounded-2xl flex flex-col items-center gap-3 -mt-8">
                                        <Search className="w-8 h-8 text-indigo-600" />
                                        <span className="text-xs font-bold text-indigo-800">Smart Search</span>
                                    </div>
                                    <div className="bg-rose-50 p-6 rounded-2xl flex flex-col items-center gap-3">
                                        <Shield className="w-8 h-8 text-rose-600" />
                                        <span className="text-xs font-bold text-rose-800">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <h2 className="text-4xl font-bold text-slate-900">Discover research</h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Access over 100+ publication pages, textbooks, and engineering tools. Stay up to date with what's happening in your field.
                            </p>
                            <div className="relative max-w-lg">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search publications, authors, items..."
                                    className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-sm transition-all text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connect Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-slate-900">Connect with your scientific community</h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Share your research, collaborate with your peers, and get the support you need to advance your career.
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">VISIT TOPIC PAGES</p>
                            <div className="flex flex-wrap gap-3">
                                {['Engineering', 'Mathematics', 'Biology', 'Computer Science', 'Climate Change', 'Medicine', 'Physics', 'Social Science', 'Astrophysics', 'Chemistry'].map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={onGetStarted}
                                        className="px-6 py-2 rounded-full border border-teal-200 text-teal-700 font-medium hover:bg-teal-50 hover:border-teal-300 transition-colors"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <BarChart3 className="w-10 h-10 text-teal-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Measure your impact</h2>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        Get in-depth stats on who's been reading your work, borrowing your items, and keep track of your citations and karma points.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="text-teal-600 font-bold hover:text-teal-700 text-lg flex items-center justify-center gap-2"
                    >
                        Join the conversation <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="py-20 bg-slate-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Advance your research and join a community of 5000+ students
                    </h2>
                    <button
                        onClick={onGetStarted}
                        className="px-10 py-4 rounded-full bg-teal-500 text-white font-bold text-lg hover:bg-teal-400 transition-all shadow-lg hover:scale-105"
                    >
                        Join for free
                    </button>
                </div>
            </div>

        </div>
    );
}
