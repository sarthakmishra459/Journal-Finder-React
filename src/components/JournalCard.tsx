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
        <h3 className="md:text-xl text-md text-black font-semibold">
          Rank: {journal.id} {journal.Name}
        </h3>

        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isExpanded && (
        <div className="md:p-4 md:pt-0 p-1 border-t border-white">
          
          <div className="flex items-center space-x-2">
              
              <span></span>
            </div>
          
          <div className="grid grid-cols-3 text-black md:mt-2 mt-1 md:gap-4 gap-1">
            <div className="flex  items-center space-x-2">
              <Building className="w-10 h-12 text-blue-600 md:text-[18px] text-sm" />
              <span className='md:text-[18px] text-sm'>{journal.Publisher}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-10 h-12 text-blue-600 text-sm" />
              <span className='md:text-[18px] text-sm'>Impact Factor: {journal.JIF}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-10 h-12 text-blue-600 text-sm" />
              <span className='md:text-[18px] text-sm'>First Decision: {journal.Decision_Time} days</span>
            </div>
          </div>

          
        </div>
      )}
    </div>
  );
};

export default JournalCard;