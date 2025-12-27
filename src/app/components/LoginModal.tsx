import { useState } from 'react';
import { X, Eye, EyeOff, Check, ArrowUpRight } from 'lucide-react';

interface LoginModalProps {
    onLogin: () => void;
    onClose: () => void;
    onSwitchToJoin: () => void;
}

export function LoginModal({ onLogin, onClose, onSwitchToJoin }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] p-8 md:p-10 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Login</h2>
                    <p className="text-slate-500 font-medium">Hi, Welcome back 👋</p>
                </div>

                {/* Google Login */}
                <button className="w-full h-12 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 mb-8 group">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">Login with Google</span>
                </button>

                {/* Divider */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-slate-300">or Login with Email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all placeholder:text-slate-300"
                            placeholder="E.g. johndoe@email.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all placeholder:text-slate-300"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
                                {rememberMe && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="text-sm text-slate-700 font-medium">Remember Me</span>
                        </label>
                        <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-600/20 transition-all text-base"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-600 flex items-center justify-center gap-1">
                        Not registered yet?{' '}
                        <button
                            onClick={onSwitchToJoin}
                            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-0.5"
                        >
                            Create an account <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
