import { MapPin, User, ArrowRight, FileText, Download } from 'lucide-react';
import { Resource } from '../../types';

interface ResourceCardProps extends Resource {
  onRequest: (id: string) => void;
}

export function ResourceCard({
  id,
  title,
  category,
  description,
  owner,
  location,
  availability,
  condition,
  price,
  imageUrl,
  link,
  onRequest
}: ResourceCardProps) {
  const isAvailable = availability === 'available';
  const isResearch = category === 'research';

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${isResearch
            ? 'bg-blue-50/90 text-blue-700 border-blue-200'
            : isAvailable
              ? 'bg-white/90 text-indigo-600 border-indigo-100'
              : 'bg-white/90 text-slate-500 border-slate-200'
            }`}>
            {isResearch ? 'Open Access' : (availability === 'available' ? 'Available Now' : 'Borrowed')}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          {isResearch ? (
            <span className="text-white font-bold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Research Paper
            </span>
          ) : (
            price === 0 ? (
              <span className="text-white font-bold text-lg">Free</span>
            ) : (
              <span className="text-white font-bold text-lg">₹{price}<span className="text-sm font-normal text-white/80">/week</span></span>
            )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-xs font-medium text-slate-500 capitalize">
              {isResearch ? 'Digital Format' : `${condition} Condition`}
            </span>
          </div>

          <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-auto">
          <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              {owner}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              {location}
            </div>
          </div>

          <button
            onClick={() => {
              if (isResearch && link) {
                window.open(link, '_blank', 'noopener,noreferrer');
              } else {
                onRequest(id);
              }
            }}
            disabled={!isAvailable && !isResearch}
            className={`w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${(isAvailable || isResearch)
              ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-md hover:shadow-lg'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
          >
            {isResearch ? (
              <>
                Read Paper
                <Download className="w-4 h-4" />
              </>
            ) : (
              isAvailable ? (
                <>
                  Request Item
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                'Currently Unavailable'
              )
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
