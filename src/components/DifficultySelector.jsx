
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const DifficultySelector = ({ onDifficultyChange }) => {
  const [difficultyLevel, setDifficultyLevel] = useState(50);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setDifficultyLevel(newValue);
    onDifficultyChange(newValue);
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  // Determine difficulty label and color based on the value
  const getDifficultyInfo = (value) => {
    if (value < 25) {
      return { label: 'Easy', color: 'bg-green-500' };
    } else if (value < 50) {
      return { label: 'Moderate', color: 'bg-blue-500' };
    } else if (value < 75) {
      return { label: 'Challenging', color: 'bg-yellow-500' };
    } else {
      return { label: 'Advanced', color: 'bg-red-500' };
    }
  };

  const difficultyInfo = getDifficultyInfo(difficultyLevel);

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading text-2xl font-semibold">Difficulty Level</h2>
        <div className="relative">
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={toggleTooltip}
            aria-label="Difficulty level information"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          
          {showTooltip && (
            <div className="absolute right-0 z-10 mt-2 w-64 p-4 rounded-lg glass shadow-lg animate-fade-in">
              <p className="text-sm text-foreground mb-2">
                The difficulty level determines the complexity of generated questions:
              </p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span>0-25%: Basic recall and simple concepts</span>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <span>26-50%: Application of concepts</span>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  <span>51-75%: Analysis and problem-solving</span>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  <span>76-100%: Advanced evaluation and creation</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Adjust the slider to set the difficulty level of your questions.
      </p>
      
      {/* Current difficulty display */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${difficultyInfo.color} mr-2`}></div>
          <span className="font-medium">{difficultyInfo.label}</span>
        </div>
        <span className="text-muted-foreground font-mono">{difficultyLevel}%</span>
      </div>
      
      {/* Slider */}
      <div className="relative mb-8">
        <input
          type="range"
          min="0"
          max="100"
          value={difficultyLevel}
          onChange={handleSliderChange}
          className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              #10b981 0%, 
              #10b981 25%, 
              #3b82f6 25%, 
              #3b82f6 50%, 
              #eab308 50%, 
              #eab308 75%, 
              #ef4444 75%, 
              #ef4444 100%)`
          }}
        />
        
        {/* Custom thumb styling */}
        <style jsx="true">{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid hsl(var(--primary));
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid hsl(var(--primary));
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
          }
        `}</style>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
      </div>
    </div>
  );
};

export default DifficultySelector;
