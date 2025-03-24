
import { useState } from 'react';
import { 
  Loader2, 
  Clipboard, 
  Check, 
  Search, 
  Plus,
  Minus,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

const ResultsSection = ({ loading, questions, onExport }) => {
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editText, setEditText] = useState('');

  // If no questions are provided, display a placeholder
  if (!questions || questions.length === 0) {
    return (
      <div className="card animate-fade-in">
        <h2 className="font-heading text-2xl font-semibold mb-4">Generated Questions</h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground text-center">
              Generating questions based on your syllabus...
              <br />
              <span className="text-sm">This may take a moment.</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Clipboard className="w-8 h-8" />
            </div>
            <p className="text-center mb-2">No questions generated yet.</p>
            <p className="text-sm text-center">
              Upload your syllabus and configure your preferences to generate questions.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Toggle question expansion
  const toggleExpanded = (id) => {
    setExpandedQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(qId => qId !== id) 
        : [...prev, id]
    );
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter questions based on search query
  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (q.options && q.options.some(opt => 
      opt.text.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  // Start editing a question
  const startEditing = (question) => {
    setEditingQuestion(question.id);
    setEditText(question.text);
  };

  // Save edited question
  const saveEdit = (id) => {
    // Here you would typically update the question in your state or backend
    toast.success('Question updated successfully');
    setEditingQuestion(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingQuestion(null);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  // Delete question
  const deleteQuestion = (id) => {
    // Here you would typically remove the question from your state or backend
    toast.success('Question removed');
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="font-heading text-2xl font-semibold mb-4">Generated Questions</h2>
      
      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-10 py-2 pr-4 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button 
          className="btn-primary whitespace-nowrap flex-shrink-0"
          onClick={() => onExport(questions)}
        >
          <Download className="w-4 h-4 mr-2" />
          Export All
        </button>
      </div>
      
      {/* Questions List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {filteredQuestions.map((question, index) => (
          <div 
            key={question.id} 
            className="rounded-lg border border-border overflow-hidden transition-all hover:border-muted-foreground"
          >
            <div className="flex items-start p-4">
              <div className="mr-3 mt-1 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1">
                {editingQuestion === question.id ? (
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></textarea>
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md"
                        onClick={() => saveEdit(question.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <p className="font-medium mb-1">{question.text}</p>
                      <div className="flex gap-1 ml-2 flex-shrink-0">
                        <button 
                          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => copyToClipboard(question.text)}
                          title="Copy question"
                        >
                          <Clipboard className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => startEditing(question)}
                          title="Edit question"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => deleteQuestion(question.id)}
                          title="Delete question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground space-x-3 mb-2">
                      <span className="px-2 py-1 bg-secondary rounded-full">
                        {question.type}
                      </span>
                      <span className="px-2 py-1 bg-secondary rounded-full">
                        {question.difficulty} difficulty
                      </span>
                    </div>
                  </>
                )}
                
                {question.type === 'Multiple Choice' && !editingQuestion && (
                  <div className={`mt-3 space-y-2 ${!expandedQuestions.includes(question.id) && 'hidden'}`}>
                    {question.options.map((option, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-start px-3 py-2 rounded-md ${
                          option.correct 
                            ? 'bg-green-50 border border-green-100' 
                            : 'bg-secondary/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                          option.correct 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-secondary text-muted-foreground'
                        }`}>
                          {option.correct ? <Check className="w-3 h-3" /> : idx + 1}
                        </div>
                        <span className="text-sm">{option.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'Multiple Choice' && (
                  <button
                    className="mt-2 text-xs flex items-center text-primary hover:text-primary/80 transition-colors"
                    onClick={() => toggleExpanded(question.id)}
                  >
                    {expandedQuestions.includes(question.id) ? (
                      <>
                        <Minus className="w-3 h-3 mr-1" /> Hide Options
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1" /> Show Options
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state for search */}
      {filteredQuestions.length === 0 && searchQuery && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No questions match your search.</p>
          <button 
            className="text-primary hover:text-primary/80 text-sm mt-2"
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
