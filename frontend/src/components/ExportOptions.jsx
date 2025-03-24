
import { useState } from 'react';
import { Check, Download, FileText, Table, Copy, X } from 'lucide-react';
import { toast } from 'sonner';

const ExportOptions = ({ questions, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);

  const handleExport = async () => {
    if (!questions || questions.length === 0) {
      toast.error('No questions to export');
      return;
    }

    setExportLoading(true);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success(`Successfully exported ${questions.length} questions as ${selectedFormat.toUpperCase()}`);
      
      // Close the export dialog
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export questions. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-2xl shadow-xl max-w-md w-full animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-heading text-xl font-semibold">Export Questions</h3>
          <button 
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium mb-3">Export Format</h4>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map(format => (
                <div 
                  key={format.id}
                  className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                    selectedFormat === format.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  {/* Selection indicator */}
                  {selectedFormat === format.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  {/* Format content */}
                  <div className="flex items-center">
                    <format.icon className="w-8 h-8 mr-3 text-primary" />
                    <div>
                      <h5 className="font-medium">{format.title}</h5>
                      <p className="text-xs text-muted-foreground">{format.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Options</h4>
            <label className="flex items-center space-x-2 cursor-pointer">
              <div 
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  includeAnswers ? 'bg-primary border-primary' : 'border-input'
                }`}
                onClick={() => setIncludeAnswers(!includeAnswers)}
              >
                {includeAnswers && <Check className="w-3 h-3 text-white" />}
              </div>
              <span>Include answers</span>
            </label>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button 
              className="btn-primary w-full flex justify-center items-center"
              onClick={handleExport}
              disabled={exportLoading}
            >
              {exportLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : (
                <Download className="w-5 h-5 mr-2" />
              )}
              {exportLoading ? 'Exporting...' : 'Download Questions'}
            </button>
            
            <button 
              className="btn-secondary w-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const exportFormats = [
  {
    id: 'pdf',
    title: 'PDF Document',
    description: 'Formatted document ready for printing',
    icon: FileText
  },
  {
    id: 'docx',
    title: 'Word Document',
    description: 'Editable Microsoft Word format',
    icon: FileText
  },
  {
    id: 'csv',
    title: 'CSV Spreadsheet',
    description: 'Importable into Excel or Google Sheets',
    icon: Table
  },
  {
    id: 'txt',
    title: 'Plain Text',
    description: 'Simple text format, easy to copy and paste',
    icon: Copy
  }
];

export default ExportOptions;
