import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Cpu } from 'lucide-react';
import { FilterCriteria, LLMModel } from '../types';

const publishers = [
  "Elsevier",
  "Springer Nature",
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
  {
    id: 'faiss',
    name: 'FAISS',
    description: 'Facebook AI Similarity Search - Efficient similarity search and clustering'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini',
    description: 'Google\'s most capable AI model for text analysis'
  },
  {
    id: 'mixtral',
    name: 'Mixtral',
    description: 'Mistral AI\'s powerful mixture-of-experts model'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Open AI\'s powerful state of the art model'
  }
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSearch: (criteria: FilterCriteria) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onSearch }) => {
  const [impactFactor, setImpactFactor] = useState<number>(0);
  const [firstDecisionTime, setFirstDecisionTime] = useState<number>(30);
  const [publisherSearch, setPublisherSearch] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedLLM, setSelectedLLM] = useState<LLMModel>('faiss');

  const filteredPublishers = publishers.filter(pub => 
    pub.toLowerCase().includes(publisherSearch.toLowerCase())
  );

  const handleSearch = () => {
    onSearch({
      impactFactor,
      firstDecisionTime,
      publisher: selectedPublisher,
      llmModel: selectedLLM
    });
  };

  return (
    <div className="relative z-10">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`absolute md:-top-16 md:left-60 -top-20 -left-3 bg-blue-900 p-2 rounded-full shadow-lg transition-all z-20 ${
          isOpen ? 'md:translate-x-0 translate-x-64' : 'md:left-7'
        }`}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen  bg-zinc-300 backdrop-blur-sm border-r border-zinc-300 transition-all duration-300 sidebar overflow-y-auto ${
          isOpen ? 'w-80' : 'w-0'
        }`}
      >
        {isOpen && (
          <div className="p-6 space-y-6">
            <h2 className="text-xl text-black font-bold mb-6">Filter Criteria</h2>

            {/* LLM Model Selection */}
            <div className="space-y-3">
              <label className=" text-sm text-black font-medium mb-2 flex items-center gap-2">
                <Cpu className="w-4 text-black h-4" />
                Select AI Model
              </label>
              <div className="space-y-2">
                {llmModels.map((model) => (
                  <div
                    key={model.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
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
                      <span className="font-semibold tracking-wider">{model.name}</span>
                    </div>
                    <p className={`text-sm ${
                          selectedLLM === model.id ? 'text-white' : 'text-black'
                        } font-medium  tracking-wider mt-1 ml-5`}>
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Factor */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">
                Minimum Impact Factor: {impactFactor}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="0.1"
                value={impactFactor}
                onChange={(e) => setImpactFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-700 rounded-lg accent-blue-500 appearance-none cursor-pointer"
              />
            </div>

            {/* First Decision Time */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Maximum First Decision Time (days): {firstDecisionTime}
              </label>
              <input
                type="range"
                min="1"
                max="90"
                value={firstDecisionTime}
                onChange={(e) => setFirstDecisionTime(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-700 accent-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Publisher Search */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">
                Preferred Publisher
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search publishers..."
                  value={publisherSearch}
                  onChange={(e) => setPublisherSearch(e.target.value)}
                  className="w-full px-4 py-2  border-blue-800 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-2.5 text-black">
                  <Search size={20} />
                </div>
              </div>
              {publisherSearch && (
                <div className="mt-2 max-h-40 overflow-y-auto text-black bg-zinc-400 rounded-lg border border-blue-800">
                  {filteredPublishers.map((pub) => (
                    <button
                      key={pub}
                      onClick={() => {
                        setSelectedPublisher(pub);
                        setPublisherSearch('');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-900 transition-colors"
                    >
                      {pub}
                    </button>
                  ))}
                </div>
              )}
              {selectedPublisher && (
                <div className="mt-2 px-4 py-2 bg-blue-600 rounded-lg flex justify-between items-center">
                  <span>{selectedPublisher}</span>
                  <button
                    onClick={() => setSelectedPublisher('')}
                    className="text-blue-300 hover:text-blue-100"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium transition-colors"
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
