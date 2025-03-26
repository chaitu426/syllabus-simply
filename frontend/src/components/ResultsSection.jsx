
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
  const toggleExpanded = (index) => {
    setExpandedQuestions((prev) =>
      prev.includes(index) ? prev.filter((qIndex) => qIndex !== index) : [...prev, index]
    );
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //  Filter questions based on search query
  console.log("All Questions:", questions);
  console.log("Search Query:", searchQuery);

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (q.options && q.options.some(opt =>
      opt.text.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );


  console.log("Filtered Questions:", filteredQuestions);
  



  // Start editing a question
  const startEditing = (index, questionText) => {
    setEditingQuestion(index);
    setEditText(questionText);
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


  return (
    <div className="card animate-fade-in">
      <h2 className="font-heading text-2xl font-semibold mb-4">Generated Questions</h2>

      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

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
          <div key={index} className="rounded-lg border border-border overflow-hidden transition-all hover:border-muted-foreground">
            <div className="flex items-start p-4">
              <div className="mr-3 mt-1 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  {index + 1}
                </div>
              </div>

              <div className="flex-1">
                {/* Editing Mode */}
                {editingQuestion === index ? (
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></textarea>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md"
                        onClick={() => saveEdit(index)}
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
                    {/* Question & Copy Button */}
                    <div className="flex items-start justify-between">
                      <p className="font-medium mb-1">{question.question}</p>
                      <div className="flex gap-1 ml-2 flex-shrink-0">
                        <button
                          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => copyToClipboard(question.question)}
                          title="Copy question"
                        >
                          <Clipboard className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Display Based on Question Type */}
                    {question.type === "mcq" && (
                      <>
                        {/* Toggle Options Button */}
                        <button
                          className="mt-2 text-xs flex items-center text-primary hover:text-primary/80 transition-colors"
                          onClick={() => toggleExpanded(index)}
                        >
                          {expandedQuestions.includes(index) ? (
                            <>
                              <Minus className="w-3 h-3 mr-1" /> Hide Options
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 mr-1" /> Show Options
                            </>
                          )}
                        </button>

                        {/* Show Options if Expanded */}
                        {expandedQuestions.includes(index) && (
                          <ul className="mt-2 space-y-1 text-sm">
                            {question.options.map((option, i) => (
                              <li
                                key={i}
                                className={`p-2 rounded-md ${option === question.answer
                                    ? "bg-green-100 text-green-700 font-semibold"
                                    : "bg-gray-100 text-gray-700"
                                  }`}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}

                    {/* Short Answer & Long Answer */}
                    {["shortAnswer", "longAnswer"].includes(question.type) && (
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Answer:</span> {question.answer}
                      </p>
                    )}

                    
                    
                    {/* Fill in the Blanks */}
                    {question.type === "fillblanks" && (
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Answer:</span> <u>{question.answer}</u>
                      </p>
                    )}
                  </>
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
