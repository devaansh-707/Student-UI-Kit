import { Download, Bookmark, Share2, MoreHorizontal, FileText, User } from 'lucide-react';
import { Resource } from '../../types';

interface FeedCardProps {
    resource: Resource;
}

export function FeedCard({ resource }: FeedCardProps) {
    const isResearch = resource.category === 'research';

    return (
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all mb-4">
            {/* Header: Suggestion Context */}
            <div className="mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Suggested based on your interest in <span className="text-slate-200">Computer Science</span>
                </span>
            </div>

            {/* Main Content */}
            <div className="flex gap-4">
                {/* Icon/Thumbnail */}
                <div className="shrink-0 w-16 h-20 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-slate-500">
                    {resource.imageUrl && !resource.imageUrl.includes('unsplash') ? (
                        <img src={resource.imageUrl} className="w-full h-full object-cover rounded-md" alt="" />
                    ) : (
                        <FileText className="w-8 h-8 opacity-50" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight mb-1 hover:text-teal-400 cursor-pointer truncate">
                        {resource.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <span className="font-semibold px-1.5 py-0.5 bg-white/10 rounded text-slate-300 capitalize">{resource.category}</span>
                        <span>•</span>
                        <span>{new Date(resource.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>124 Reads</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold ring-2 ring-white/10">
                            {resource.owner.charAt(0)}
                        </div>
                        <span className="text-sm text-slate-300 hover:underline cursor-pointer hover:text-white">{resource.owner}</span>
                        <span className="text-xs text-slate-500">from KL University</span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2">
                        {isResearch ? (
                            <button className="px-4 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-sm font-bold hover:bg-blue-500/30 transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        ) : (
                            <button className="px-4 py-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded text-sm font-bold hover:bg-teal-500/30 transition-colors flex items-center gap-2">
                                Request Item
                            </button>
                        )}

                        <button className="px-3 py-1.5 text-slate-400 border border-white/10 rounded text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
                            <Bookmark className="w-4 h-4" />
                            Save
                        </button>
                        <button className="px-3 py-1.5 text-slate-400 border border-white/10 rounded text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
