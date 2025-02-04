import React, { useState } from 'react';
import { BookTextIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { Journal, FilterCriteria } from './types';
import { FadeLoader } from 'react-spinners';
import { ExpandableJournalCards } from './components/PopupCard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [abstract, setAbstract] = useState('');
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (criteria: FilterCriteria) => {
    setJournals([]);
    setLoading(true); // Set loading to true before making the API call

    try {
      const payload = {
        abstract,
        criteria: {
          impactFactor: criteria.impactFactor,
          firstDecisionTime: criteria.firstDecisionTime,
          publisher: criteria.publisher || '',
          llmModel: criteria.llmModel,
        },
      };

      const response = await fetch('https://sarthak005-deploy-fastapi-application.hf.space/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.result) {
          console.log('Journals:', data.result);
          setJournals(data.result);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } else {
        console.error('Failed to fetch journals:', response.statusText);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false); // Stop showing spinner after the API call completes
    }
  };

  return (
    <div className="min-h-screen bg-white from-red-900 to-black text-gray-100 overflow-y-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center ml-10 justify-center space-x-3">
            <BookTextIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-medium font-mono  text-blue-600 tracking-widest">
              Journal Finder
            </h1>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            onSearch={handleSearch}
          />

          {/* Main Content */}
          <div className={`flex-1 transition-all ${isSidebarOpen ? 'md:ml-80 mr-0' : 'md:ml-0 mr-4'}`}>
            {/* Abstract Input */}
            <div className="bg-zinc-300 sidebar  rounded-lg p-6 mb-6">
              <label className="block text-lg text-black font-semibold mb-2">
                Enter Your Abstract:
              </label>
              <textarea
                className="w-full h-40 px-0 py-2 bg-zinc-300  sidebar  rounded-lg focus:border-white  resize-none text-black"
                placeholder="Paste your abstract here..."
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </div>

            {/* Journal List */}
            <div className="space-y-4">
              
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <FadeLoader color="#2563EB" />
                </div>
              
            
              ) : (
                
                  <ExpandableJournalCards journals={journals} />
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
