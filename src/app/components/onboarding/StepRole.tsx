import { GraduationCap, Building2, Stethoscope, User } from 'lucide-react';

interface StepRoleProps {
    onSelect: (role: string) => void;
}

export function StepRole({ onSelect }: StepRoleProps) {
    const roles = [
        {
            id: 'student',
            title: 'Academic or student',
            description: 'University students and faculty, institute members, and independent researchers',
            icon: GraduationCap,
            color: 'bg-teal-100 text-teal-600'
        },
        {
            id: 'corporate',
            title: 'Corporate, government, or NGO',
            description: 'Technology or product developers, R&D specialists, and government employees',
            icon: Building2,
            color: 'bg-slate-100 text-slate-600'
        },
        {
            id: 'medical',
            title: 'Medical',
            description: 'Health care professionals, including clinical researchers',
            icon: Stethoscope,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            id: 'other',
            title: 'Not a researcher',
            description: 'Journalists, citizen scientists, or anyone interested in reading and discovering research',
            icon: User,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">What type of student are you?</h2>
                <p className="text-slate-500 text-sm">Join thousands of students and researchers from top universities</p>
            </div>

            <div className="grid gap-4 max-h-[60vh] overflow-y-auto p-1">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        onClick={() => onSelect(role.id)}
                        className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all text-left group"
                    >
                        <div className={`p-3 rounded-lg ${role.color} group-hover:scale-110 transition-transform`}>
                            <role.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{role.title}</h3>
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{role.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
