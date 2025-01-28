import React from 'react';
import { Building, Award, Clock } from 'lucide-react';
import { Journal } from '../types';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard: React.FC<JournalCardProps> = ({ journal }) => {
  return (
    <div className="relative group hover:md:h-28 hover:h-40 rounded-lg border border-gray-300 hover:border-blue-600 transition-colors bg-white overflow-hidden">
      {/* Default collapsed state */}
      <div
        className="p-4 text-black font-semibold transition-transform delay-150 duration-300 ease-out
        group-hover:opacity-0 group-hover:translate-y-[-10px] group-hover:z-[-10]"
      >
        <h3 className="md:text-xl text-md">
          Rank: {journal.id} {journal.Name}
        </h3>
      </div>

      {/* Expand content on hover */}
      <div
        className="absolute top-0 left-0 w-full h-full p-4 flex flex-col 
        bg-white transform scale-95 gap-1 opacity-0 justify-evenly transition-transform delay-200 duration-300 ease-out
        group-hover:opacity-100 group-hover:scale-100 group-hover:z-10"
      >
        <h3 className="md:text-xl text-sm text-overflow:ellipsis text-black font-semibold mb-4">
          Rank: {journal.id} {journal.Name}
        </h3>

        <div className="grid grid-cols-3 text-black md:gap-4 gap-2">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span className="md:text-[18px] text-sm">{journal.Publisher}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="md:text-[18px] text-sm">Impact Factor: {journal.JIF}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="md:text-[18px] text-sm">First Decision: {journal.Decision_Time} days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
