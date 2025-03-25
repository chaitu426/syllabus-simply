
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, ChevronLeft, Download, User } from 'lucide-react';
import { toast } from 'sonner';

// Import components
import UploadSection from '../components/UploadSection';
import QuestionTypeSelector from '../components/QuestionTypeSelector';
import DifficultySelector from '../components/DifficultySelector';
import ResultsSection from '../components/ResultsSection';
import ExportOptions from '../components/ExportOptions';

const Dashboard = () => {
  // State for uploaded syllabus
  const [syllabus, setSyllabus] = useState(null);
  
  // State for selected question types
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState(['mcq']);
  
  // State for difficulty level
  const [difficultyLevel, setDifficultyLevel] = useState(50);
  
  // State for generated questions
  const [questions, setQuestions] = useState([]);
  
  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Export modal state
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Handle syllabus upload
  const handleSyllabusUploaded = (data) => {
    setSyllabus(data);
    toast.success('Syllabus uploaded successfully!');
  };

  // Handle question type selection
  const handleQuestionTypeChange = (types) => {
    setSelectedQuestionTypes(types);
  };

  // Handle difficulty level change
  const handleDifficultyChange = (level) => {
    setDifficultyLevel(level);
  };

  // Generate questions
  const generateQuestions = () => {
    // Validate if syllabus is uploaded
    if (!syllabus) {
      toast.error('Please upload a syllabus first');
      return;
    }

    setIsGenerating(true);

    // Simulate API call to generate questions
    setTimeout(() => {
      // Generate mock questions based on selected types and difficulty
      const mockQuestions = generateMockQuestions(selectedQuestionTypes, difficultyLevel);
      setQuestions(mockQuestions);
      setIsGenerating(false);
      toast.success('Questions generated successfully!');
    }, 2000);
  };

  // Handle export
  const handleExport = () => {
    if (questions.length === 0) {
      toast.error('No questions to export');
      return;
    }
    
    setShowExportOptions(true);
  };

  // Close export modal
  const closeExportModal = () => {
    setShowExportOptions(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background sticky top-0 z-40 w-full border-b border-border">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="hidden md:block h-6 w-px bg-border" />
            <h1 className="hidden md:block font-heading font-medium">PaperLabs Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to="/" className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors" title="Home">
              <Home className="w-5 h-5" />
            </Link>
            <Link to="/Settings" className="text-foreground/90 hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-1 space-y-8">
            <UploadSection onSyllabusUploaded={handleSyllabusUploaded} />
            <QuestionTypeSelector onSelectionChange={handleQuestionTypeChange} />
            <DifficultySelector onDifficultyChange={handleDifficultyChange} />
            
            {/* Generate Button */}
            <button 
              className="btn-primary w-full flex items-center justify-center"
              onClick={generateQuestions}
              disabled={isGenerating || !syllabus}
            >
              {isGenerating ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : (
                'Generate Questions'
              )}
            </button>
          </div>
          
          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <ResultsSection 
              loading={isGenerating} 
              questions={questions} 
              onExport={handleExport} 
            />
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {showExportOptions && (
        <ExportOptions 
          questions={questions}
          onClose={closeExportModal}
        />
      )}
    </div>
  );
};

// Helper function to generate mock questions
const generateMockQuestions = (types, difficulty) => {
  const questions = [];
  const difficultyLabel = getDifficultyLabel(difficulty);
  
  // Map the internal type IDs to display names
  const typeMap = {
    'mcq': 'Multiple Choice',
    'shortAnswer': 'Short Answer',
    'longAnswer': 'Long Answer',
    'truefalse': 'True/False',
    'matching': 'Matching',
    'fillblanks': 'Fill in the Blanks'
  };
  
  // Generate 1-3 questions for each selected type
  types.forEach(type => {
    const numQuestions = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numQuestions; i++) {
      const questionObj = {
        id: `q-${Math.random().toString(36).substring(2, 9)}`,
        type: typeMap[type],
        difficulty: difficultyLabel,
        text: getRandomQuestion(type, difficulty)
      };
      
      // Add options for multiple choice questions
      if (type === 'mcq') {
        questionObj.options = getRandomOptions();
      }
      
      questions.push(questionObj);
    }
  });
  
  return questions;
};

// Helper to get a difficulty label
const getDifficultyLabel = (level) => {
  if (level < 25) return 'Easy';
  if (level < 50) return 'Moderate';
  if (level < 75) return 'Challenging';
  return 'Advanced';
};

// Helper to generate random question text
const getRandomQuestion = (type, difficulty) => {
  const questions = {
    mcq: [
      'What is the primary function of mitochondria in a cell?',
      'Which of the following best describes the process of photosynthesis?',
      'In the context of Newton\'s laws, what happens to an object when forces acting on it are balanced?',
      'Which literary device is characterized by giving human qualities to non-human objects?',
      'What was the main cause of World War I according to the text?'
    ],
    shortAnswer: [
      'Explain the difference between renewable and non-renewable energy sources.',
      'Describe the water cycle in your own words.',
      'What are the key components of a thesis statement?',
      'Explain how supply and demand affect market prices.',
      'Describe the function of DNA in heredity.'
    ],
    longAnswer: [
      'Analyze the themes of power and corruption in George Orwell\'s "Animal Farm".',
      'Evaluate the impact of the Industrial Revolution on modern society.',
      'Discuss the environmental and social implications of globalization.',
      'Compare and contrast the American and French Revolutions.',
      'Explain how climate change affects biodiversity and suggest potential solutions.'
    ],
    truefalse: [
      'Mitosis is the process of cell division that results in four haploid daughter cells.',
      'The Declaration of Independence was signed in 1776.',
      'Water is a compound made up of two hydrogen atoms and one oxygen atom.',
      'Shakespeare wrote the play "The Great Gatsby".',
      'The law of conservation of energy states that energy cannot be created or destroyed.'
    ],
    matching: [
      'Match each element with its correct atomic symbol.',
      'Match each author with their corresponding literary work.',
      'Match each historical figure with their major contribution.',
      'Match each mathematical formula with its correct application.',
      'Match each country with its capital city.'
    ],
    fillblanks: [
      'The process by which plants make their own food using sunlight is called _______.',
      'The three branches of the U.S. government are _______, _______, and _______.',
      'In the equation E = mc², E represents _______, m represents _______, and c represents _______.',
      'The four primary states of matter are _______, _______, _______, and _______.',
      'The _______ is the powerhouse of the cell.'
    ]
  };
  
  // Get random question for the given type
  const typeQuestions = questions[type] || questions.mcq;
  return typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
};

// Helper to generate random options for MCQs
const getRandomOptions = () => {
  const options = [
    { text: 'It is the site of protein synthesis', correct: false },
    { text: 'It produces energy in the form of ATP', correct: true },
    { text: 'It stores genetic information', correct: false },
    { text: 'It regulates water balance in the cell', correct: false }
  ];
  
  return options;
};

export default Dashboard;
