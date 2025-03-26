
import { useState, useRef } from 'react';
import { Upload, FileText, Image, X, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const UploadSection = ({ onSyllabusUploaded }) => {
  const [uploadMethod, setUploadMethod] = useState('text');
  const [syllabusText, setSyllabusText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(false);
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setSyllabusText(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Please upload a PDF, Word, Text, or image file.');
      return;
    }

    setUploadedFile(file);
  };

  const handleSubmit = async () => {
    if (uploadMethod === "text" && !syllabusText.trim()) {
        toast.error("Please enter syllabus content.");
        return;
    }

    if ((uploadMethod === "file" || uploadMethod === "image") && !uploadedFile) {
        toast.error(`Please upload a ${uploadMethod === "file" ? "document" : "image"} first.`);
        return;
    }

    try {
        setIsUploading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Save syllabus data
        const syllabusData = {
            type: uploadMethod,
            content: uploadMethod === "text" ? syllabusText : uploadedFile, // Save file if uploaded
            timestamp: new Date().toISOString(),
        };

        toast.success("Syllabus uploaded successfully!");
        onSyllabusUploaded(syllabusData);
    } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload syllabus. Please try again.");
    } finally {
        setIsUploading(false);
    }
};


  const clearUpload = () => {
    if (uploadMethod === 'text') {
      setSyllabusText('');
    } else {
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleInfoExpand = () => {
    setExpandedInfo(!expandedInfo);
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-semibold">Upload Syllabus</h2>
        <button 
          className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={toggleInfoExpand}
        >
          {expandedInfo ? 'Hide Info' : 'Show Info'}
          <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${expandedInfo ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {expandedInfo && (
        <div className="bg-secondary/40 rounded-lg p-4 mb-6 text-sm text-muted-foreground animate-fade-in">
          <p className="mb-2">You can upload your syllabus in three ways:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Enter syllabus text directly</li>
            <li>Upload a document file (PDF, Word, Text)</li>
            <li>Upload an image of your syllabus</li>
          </ul>
          <p className="mt-2">
            Our AI will analyze your syllabus to generate relevant questions tailored to your curriculum.
          </p>
        </div>
      )}

      {/* Upload Method Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMethod === 'text' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary hover:bg-secondary/70 text-foreground'
          }`}
          onClick={() => setUploadMethod('text')}
        >
          <FileText className="mr-2 w-4 h-4" />
          Text Input
        </button>
        <button 
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMethod === 'file' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary hover:bg-secondary/70 text-foreground'
          }`}
          onClick={() => setUploadMethod('file')}
        >
          <Upload className="mr-2 w-4 h-4" />
          Document Upload
        </button>
        {/* <button 
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMethod === 'image' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary hover:bg-secondary/70 text-foreground'
          }`}
          onClick={() => setUploadMethod('image')}
        >
          <Image className="mr-2 w-4 h-4" />
          Image Upload
        </button> */}
      </div>

      {/* Text Input */}
      {uploadMethod === 'text' && (
        <div className="mb-6 animate-fade-in">
          <textarea
            className="w-full min-h-[200px] p-4 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Paste your syllabus content here..."
            value={syllabusText}
            onChange={handleTextChange}
          ></textarea>
          {syllabusText && (
            <div className="flex justify-end mt-2">
              <button 
                className="text-sm text-muted-foreground hover:text-destructive flex items-center"
                onClick={clearUpload}
              >
                <X className="w-4 h-4 mr-1" /> Clear text
              </button>
            </div>
          )}
        </div>
      )}

      {/* File Upload */}
      {(uploadMethod === 'file' || uploadMethod === 'image') && (
        <div className="mb-6 animate-fade-in">
          <div 
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/30 transition-colors cursor-pointer"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept={uploadMethod === 'file' 
                ? ".pdf,.doc,.docx,.txt" 
                : "image/jpeg,image/png,image/jpg"
              }
              onChange={handleFileUpload}
            />
            
            {!uploadedFile ? (
              <div className="flex flex-col items-center">
                {uploadMethod === 'file' ? (
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                ) : (
                  <Image className="w-12 h-12 text-muted-foreground mb-4" />
                )}
                <p className="text-muted-foreground mb-2">
                  {uploadMethod === 'file' 
                    ? 'Upload PDF, Word, or text document' 
                    : 'Upload JPG or PNG image of your syllabus'
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Click to browse or drag and drop
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 text-primary p-3 rounded-full mb-3">
                  {uploadMethod === 'file' ? (
                    <FileText className="w-8 h-8" />
                  ) : (
                    <Image className="w-8 h-8" />
                  )}
                </div>
                <p className="font-medium text-foreground mb-1">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground mb-3">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
                <button 
                  className="text-sm text-destructive hover:text-destructive/80 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearUpload();
                  }}
                >
                  <X className="w-4 h-4 mr-1" /> Remove file
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button 
        className="btn-primary w-full flex items-center justify-center"
        onClick={handleSubmit}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Upload Syllabus
          </>
        )}
      </button>
    </div>
  );
};

export default UploadSection;
