import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Building, Award, Clock } from 'lucide-react';
import { Journal } from '../types';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard: React.FC<JournalCardProps> = ({ journal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-zinc-300 rounded-lg overflow-hidden border border-white hover:border-blue-600 transition-colors">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl text-black font-semibold">{journal.Name}</h3>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-white">
          
          <div className="flex items-center space-x-2">
              
              <span></span>
            </div>
          
          <div className="grid grid-cols-3 text-black mt-2 gap-4">
            <div className="flex  items-center space-x-2">
              <Building className="w-5 h-5 text-blue-600 text-md" />
              <span>{journal.Publisher}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600 text-md" />
              <span>Impact Factor: {journal.JIF}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600 text-md" />
              <span>First Decision: {journal.Decision_Time} days</span>
            </div>
          </div>

          
        </div>
      )}
    </div>
  );
};

export default JournalCard;