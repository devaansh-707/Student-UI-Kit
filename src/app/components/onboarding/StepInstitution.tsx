import { useState } from 'react';
import { KL_DEPARTMENTS } from '../../../data/departments';
import { Search, ChevronDown, Check } from 'lucide-react';

interface StepInstitutionProps {
    onContinue: (data: { institution: string; department: string }) => void;
}

export function StepInstitution({ onContinue }: StepInstitutionProps) {
    const [institution, setInstitution] = useState('Koneru Lakshmaiah Education Foundation');
    const [department, setDepartment] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [deptSearch, setDeptSearch] = useState('');

    const filteredDepts = KL_DEPARTMENTS.filter(dept =>
        dept.toLowerCase().includes(deptSearch.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-lg mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Show where you conduct research</h2>
                <p className="text-slate-500 text-sm">Enter your institution details to quickly find your colleagues.</p>
            </div>

            <div className="space-y-6">
                {/* Institution Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Institution</label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all font-medium text-slate-900"
                        />
                        {/* Tooltip-style info */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full px-4 hidden xl:block">
                            <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-lg w-48">
                                The university or organization you are affiliated with.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department Dropdown */}
                <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-slate-700">Department</label>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-3 border border-slate-300 rounded-lg flex items-center justify-between hover:border-teal-500 bg-white text-left focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        >
                            <span className={department ? "text-slate-900 font-medium" : "text-slate-400"}>
                                {department || "Select your department"}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-hidden flex flex-col">
                                <div className="p-3 border-b border-slate-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search departments..."
                                            value={deptSearch}
                                            onChange={(e) => setDeptSearch(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="overflow-y-auto flex-1 p-1">
                                    {filteredDepts.length === 0 ? (
                                        <div className="p-4 text-center text-sm text-slate-500">No departments found</div>
                                    ) : (
                                        filteredDepts.map((dept) => (
                                            <button
                                                key={dept}
                                                onClick={() => {
                                                    setDepartment(dept);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center justify-between group"
                                            >
                                                {dept}
                                                {department === dept && <Check className="w-4 h-4 text-teal-600" />}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => onContinue({ institution, department })}
                    disabled={!department || !institution}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>

                <div className="text-center">
                    <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Skip this step</button>
                </div>
            </div>
        </div>
    );
}
