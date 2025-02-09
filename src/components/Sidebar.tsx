import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Cpu } from 'lucide-react';
import { FilterCriteria, LLMModel } from '../types';

const publishers = [
  "Elsevier",
  "Springer",
  "Wiley",
  "Taylor & Francis",
  "MDPI",
  "IEEE",
  "SAGE",
  "Oxford University Press",
  "Cambridge University Press",
  "Nature Publishing Group"
];

const llmModels: { id: LLMModel; name: string; description: string }[] = [
  { id: 'faiss', name: 'FAISS', description: 'Efficient similarity search and clustering' },
  { id: 'gemini-pro', name: 'Gemini', description: "Google's top AI model for text analysis" },
  { id: 'mixtral', name: 'Mixtral', description: "Mistral AI's mixture-of-experts model" },
  { id: 'openai', name: 'OpenAI', description: 'Powerful state-of-the-art model' }
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSearch: (criteria: FilterCriteria) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onSearch }) => {
  const [impactFactor, setImpactFactor] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [firstDecisionTime, setFirstDecisionTime] = useState<number>(30);
  const [publisherSearch, setPublisherSearch] = useState('');
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedLLM, setSelectedLLM] = useState<LLMModel>('faiss');

  const filteredPublishers = publishers.filter(publisher =>
    publisher.toLowerCase().includes(publisherSearch.toLowerCase())
  );

  const handlePublisherClick = (publisher: string) => {
    if (!selectedPublishers.includes(publisher)) {
      setSelectedPublishers([...selectedPublishers, publisher]);
    }
    setPublisherSearch('');
  };

  const handleSearch = () => {
    if(publisherSearch !== ''){
      setSelectedPublishers([...selectedPublishers, publisherSearch]);
    }
    selectedPublishers.push(publisherSearch);
    onSearch({
      impactFactor,
      firstDecisionTime,
      publisher: selectedPublishers.join(' ') || publisherSearch, // Space-separated string
      llmModel: selectedLLM
    });
    
  
  console.log(selectedPublishers.join(' ') || publisherSearch)
  };
  

  return (
    <div className="relative z-10">
          <button
      onClick={onToggle}
      className={`fixed md:top-6  -left-20 bg-blue-900 p-2 rounded-full shadow-lg transition-all z-20
        ${isOpen ? 'md:translate-x-0 translate-x-64 md:left-64 top-8' : 'md:left-9 left-2 top-8'}`}
        >
      {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>


      <div
        className={`fixed left-0 top-0 h-screen sidebar bg-zinc-300 border-r border-zinc-300 transition-all duration-300 overflow-y-auto ${
          isOpen ? 'md:w-80 w-56' : 'w-0'
        }`}
      >
        {isOpen && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl text-black font-bold mb-6">Filter Criteria</h2>

            {/* LLM Model Selection */}
            <div className="space-y-3">
              <label className="text-sm text-black font-medium flex items-center gap-2">
                <Cpu className="w-4 h-4 text-black" />
                Select AI Model
              </label>
              <div className="space-y-2">
                {llmModels.map(model => (
                  <div
                    key={model.id}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      selectedLLM === model.id
                        ? 'bg-blue-600 border-2'
                        : 'bg-zinc-400 text-black border-white hover:border-blue-600 border-2'
                    }`}
                    onClick={() => setSelectedLLM(model.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedLLM === model.id ? 'bg-white' : 'bg-blue-900'
                        }`}
                      />
                      <span className="font-semibold">{model.name}</span>
                    </div>
                    <p className={`text-sm ${selectedLLM === model.id ? 'text-white' : 'text-black'}`}>
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Factor */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">
                Minimum Impact Factor:
              </label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.1"
                value={impactFactor}
                onChange={e => setImpactFactor(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter minimum impact factor"
              />
            </div>

            {/* Publisher Selection */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">Preferred Publishers</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search publishers..."
                  value={publisherSearch}
                  onChange={e => setPublisherSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-800 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-2.5 text-black">
                  <Search size={20} />
                </div>
              </div>

              {/* Display selected publishers as tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedPublishers.map((publisher, index) => (
                  publisher !=='' && (<div
                    key={index}
                    className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {publisher}
                    <button
                      onClick={() => setSelectedPublishers(selectedPublishers.filter(p => p !== publisher))}
                      className="text-white hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>)
                ))}
              </div>

              {/* Display filtered publishers as dropdown */}
              {publisherSearch && (
  <div className="mt-2 bg-white border text-black border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
    {filteredPublishers.map((publisher, index) => (
      publisher !== '' && ( // Check if publisher is not an empty string
        <div
          key={index}
          className="p-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => handlePublisherClick(publisher)}
        >
          {publisher}
        </div>
      )
    ))}
  </div>
)}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium"
            >
              Find Journals
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;