import { useState } from 'react';
import { Check } from 'lucide-react';

const questionTypes = [
  {
    id: 'mcq',
    title: 'Multiple Choice',
    description: 'Questions with multiple options and one or more correct answers.',
    icon: '📋'
  },
  {
    id: 'shortAnswer',
    title: 'Short Answer',
    description: 'Brief responses requiring a few words or sentences.',
    icon: '✏️'
  },
  {
    id: 'longAnswer',
    title: 'Long Answer',
    description: 'Extended responses requiring detailed explanations.',
    icon: '📝'
  },
  
  
  {
    id: 'fillblanks',
    title: 'Fill in the Blanks',
    description: 'Sentences with missing words that must be filled in.',
    icon: '📄'
  }
];

const QuestionTypeSelector = ({ onSelectionChange }) => {
  const [selectedTypes, setSelectedTypes] = useState(['mcq']);

  const toggleSelection = (typeId) => {
    setSelectedTypes((prevSelected) => {
      // If already selected, remove it (unless it's the last one)
      if (prevSelected.includes(typeId)) {
        if (prevSelected.length > 1) {
          const newSelection = prevSelected.filter(id => id !== typeId);
          onSelectionChange(newSelection);
          return newSelection;
        }
        return prevSelected;
      }
      
      // If not selected, add it
      const newSelection = [...prevSelected, typeId];
      onSelectionChange(newSelection);
      return newSelection;
    });
  };

  const selectAll = () => {
    const allTypeIds = questionTypes.map(type => type.id);
    setSelectedTypes(allTypeIds);
    onSelectionChange(allTypeIds);
  };

  const clearAll = () => {
    // Keep at least one selected
    setSelectedTypes(['mcq']);
    onSelectionChange(['mcq']);
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-semibold">Question Types</h2>
        <div className="flex gap-2 text-sm">
          <button 
            className="text-primary hover:text-primary/80 transition-colors"
            onClick={selectAll}
          >
            Select All
          </button>
          <span className="text-muted-foreground">|</span>
          <button 
            className="text-primary hover:text-primary/80 transition-colors"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Choose the types of questions you want to include in your assessment.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {questionTypes.map((type) => (
          <div 
            key={type.id}
            className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
              selectedTypes.includes(type.id)
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-muted-foreground'
            }`}
            onClick={() => toggleSelection(type.id)}
          >
            {/* Selection indicator */}
            {selectedTypes.includes(type.id) && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            
            {/* Card content */}
            <div className="flex flex-col h-full">
              <div className="text-2xl mb-2">{type.icon}</div>
              <h3 className="font-medium mb-1">{type.title}</h3>
              <p className="text-xs text-muted-foreground">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        <span className="font-medium">Note:</span> You must select at least one question type.
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
