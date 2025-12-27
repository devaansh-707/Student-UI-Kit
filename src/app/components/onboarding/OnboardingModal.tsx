import { useState } from 'react';
import { StepRole } from './StepRole';
import { StepInstitution } from './StepInstitution';
import { StepProfile } from './StepProfile';
import { X } from 'lucide-react';

interface OnboardingModalProps {
    onComplete: () => void;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export function OnboardingModal({ onComplete, onClose, onSwitchToLogin }: OnboardingModalProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        role: '',
        institution: '',
        department: '',
        profile: {}
    });

    const handleRoleSelect = (role: string) => {
        setData({ ...data, role });
        setStep(2);
    };

    const handleInstitutionContinue = (instData: { institution: string; department: string }) => {
        setData({ ...data, ...instData });
        setStep(3);
    };

    const handleProfileComplete = (profileData: any) => {
        const finalData = { ...data, profile: profileData };
        console.log('Onboarding Complete:', finalData);
        localStorage.setItem('user_profile', JSON.stringify(finalData));
        onComplete();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="h-16 bg-teal-500 flex items-center justify-between px-6 shrink-0">
                    <span className="text-white font-bold text-lg">CampusShare</span>
                    <div className="flex items-center gap-4">
                        <span className="text-white/80 text-sm font-medium">Join for free</span>
                        <button onClick={onSwitchToLogin} className="text-white/80 hover:text-white transition-colors">
                            <span className="text-sm font-bold">Log in</span>
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-slate-100 flex">
                    <div className={`h-full bg-teal-500 transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    {step === 1 && <StepRole onSelect={handleRoleSelect} />}
                    {step === 2 && <StepInstitution onContinue={handleInstitutionContinue} />}
                    {step === 3 && <StepProfile onComplete={handleProfileComplete} />}
                </div>

                {/* Footer info (only on step 1) */}
                {step === 1 && (
                    <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                        <p className="text-xs text-slate-400">© 2025 CampusShare. All rights reserved.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
