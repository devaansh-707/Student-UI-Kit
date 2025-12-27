import { useState, useEffect } from 'react';
import { ResourceCard } from '../components/ResourceCard';
import { AddResourceForm } from '../components/AddResourceForm';
import { Plus, Search, Filter, SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react';
import { Resource } from '../../types';
import { initialResources } from '../../data/initialResources';

interface ResourceSharingProps {
  initialShowAddForm?: boolean;
}

export function ResourceSharing({ initialShowAddForm = false }: ResourceSharingProps) {
  const [showAddForm, setShowAddForm] = useState(initialShowAddForm);

  useEffect(() => {
    if (initialShowAddForm) {
      setShowAddForm(true);
    }
  }, [initialShowAddForm]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Initialize from localStorage or use seed data
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('campus_resources_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse resources', e);
      }
    }
    return initialResources;
  });

  // Persist to localStorage whenever resources change
  useEffect(() => {
    localStorage.setItem('campus_resources_v4', JSON.stringify(resources));
  }, [resources]);

  const handleAddResource = (newResource: Resource) => {
    setResources([newResource, ...resources]);
  };

  const handleRequest = (id: string) => {
    alert('Request sent to resource owner! They will contact you soon.');
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Browse Resources</h2>
          <p className="text-slate-500 mt-1">Discover {resources.length} items available for borrowing today</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">List Item</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search textbooks, electronics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 text-slate-700 appearance-none font-medium cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="textbook">Textbooks</option>
              <option value="electronics">Electronics</option>
              <option value="supplies">Supplies</option>
              <option value="research">Research/Publications</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors" title="Filter Options">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No matches found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              {...resource}
              onRequest={handleRequest}
            />
          ))}
        </div>
      )}

      {showAddForm && (
        <AddResourceForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddResource}
        />
      )}
    </div>
  );
}
