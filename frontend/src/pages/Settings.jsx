
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";


const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          console.error('Invalid token, logging out...');
          handleLogout();
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch user');

        const data = await response.json();
        console.log(data);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Store user in local storage
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPapers = async () => {
      if (!user?._id) return; // Ensure user is available

      try {
        const response = await fetch("http://localhost:5000/api/auth/papers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ createdBy: user._id }), // Now user is guaranteed to exist
        });

        if (!response.ok) {
          throw new Error("Failed to fetch papers");
        }

        const data = await response.json();
        setPapers(data);
        console.log(data);
        console.log(papers);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPapers();
    }
  }, [user]); // Only run when `user` is set

  const downloadPaper = (format) => {
    if (!selectedPaper) return;

    if (format === "pdf") {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(selectedPaper.title, 105, 15, { align: "center" });
      doc.setFontSize(12);
      doc.text("Question Paper", 105, 25, { align: "center" });

      const questionTable = selectedPaper.generateQuestionPaper.map((q, i) => [
        `${i + 1}. [${q.type}]`,
        q.question,
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["No.", "Question"]],
        body: questionTable,
        styles: { fontSize: 10, cellPadding: 5 },
        columnStyles: {
          0: { cellWidth: 20, fontStyle: "bold" },
          1: { cellWidth: 170 },
        },
      });

      if (showAnswers) {
        doc.addPage();
        doc.text("Answer Key", 105, 15, { align: "center" });

        const answerTable = selectedPaper.generateQuestionPaper.map((q, i) => [
          `${i + 1}. [${q.type}]`,
          q.question,
          q.answer,
        ]);

        autoTable(doc, {
          startY: 30,
          head: [["No.", "Question", "Answer"]],
          body: answerTable,
          styles: { fontSize: 10, cellPadding: 5 },
          columnStyles: {
            0: { cellWidth: 20, fontStyle: "bold" },
            1: { cellWidth: 120 },
            2: { cellWidth: 50, textColor: "green" },
          },
        });
      }

      doc.save(`${selectedPaper.title}.pdf`);
    } else if (format === "docx") {
      let content = `${selectedPaper.title}\n\nQUESTION PAPER\n\n`;
      selectedPaper.generateQuestionPaper.forEach((q, i) => {
        content += `${i + 1}. [${q.type}] ${q.question}\n\n`;
      });

      if (showAnswers) {
        content += `\n\nANSWER KEY\n\n`;
        selectedPaper.generateQuestionPaper.forEach((q, i) => {
          content += `${i + 1}. [${q.type}] ${q.question}\nAnswer: ${q.answer}\n\n`;
        });
      }

      const blob = new Blob([content], { type: "application/msword" });
      saveAs(blob, `${selectedPaper.title}.docx`);
    } else if (format === "csv") {
      const csvContent = "data:text/csv;charset=utf-8," +
        selectedPaper.generateQuestionPaper.map(q => `${q.type},"${q.question}","${showAnswers ? q.answer : ''}"`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${selectedPaper.title}.csv`);
      document.body.appendChild(link);
      link.click();
    }
  };

  const handleExport = () => {
    if (questions.length === 0) {
      toast.error('No questions to export');
      return;
    }

    setShowExportOptions(true);
  };
  
  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // If using cookies, remove it as well
    // Cookies.remove("token");

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of PaperLabs.",
    });

    navigate("/login");
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-6 px-4 md:px-8 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                  }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('papers')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                  }`}
              >
                <Bell className="w-5 h-5" />
                <span>Papers</span>
              </button>



              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      readOnly
                      id="name"
                      type="text"
                      defaultValue={user?.name}
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      readOnly
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                </form>
              </div>
            )}
            {/* this is static make it dynamic any one first make paper routes vedant or rupesh */}
            {activeTab === 'papers' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Your Papers & Downloads</h2>

                {/* Demo Papers List */}
                <div className="space-y-4 p-6">
                  {!selectedPaper ? (
                    <div className="space-y-4">
                      {papers.map((paper, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:shadow-lg"
                          onClick={() => setSelectedPaper(paper)}
                        >
                          <div>
                            <h3 className="font-semibold text-lg">{paper.title}</h3>
                            <p className="text-sm text-gray-500">{paper.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
                      <div className="flex justify-between items-center">
                        <button
                          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                          onClick={() => setSelectedPaper(null)}
                        >
                          Back to Papers
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          onClick={() => setShowAnswers(!showAnswers)}
                        >
                          {showAnswers ? "Show Question Paper" : "Show Answer Key"}
                        </button>
                      </div>

                      <h2 className="text-2xl font-bold text-center">{selectedPaper.title}</h2>

                      {!showAnswers ? (
                        <div className="border border-gray-400 p-6 rounded-lg bg-gray-50 space-y-6">
                          <h3 className="text-xl font-semibold text-center underline">Question Paper</h3>
                          {selectedPaper.generateQuestionPaper.map((q, i) => (
                            <div key={i} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                              <p className="font-semibold text-lg">{i + 1}. [{q.type}]</p>
                              <p className="text-md">{q.question}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border border-gray-400 p-6 rounded-lg bg-gray-50 space-y-6">
                          <h3 className="text-xl font-semibold text-center underline">Answer Key</h3>
                          {selectedPaper.generateQuestionPaper.map((q, i) => (
                            <div key={i} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                              <p className="font-semibold text-lg">{i + 1}. [{q.type}]</p>
                              <p className="text-md">{q.question}</p>
                              <p className="text-green-600 font-semibold mt-2">Answer: {q.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Download All Papers */}
                <div className="flex justify-end space-x-2">
            <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg" onClick={() => downloadPaper("pdf")}>Download PDF</button>
            
            <button className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg" onClick={() => downloadPaper("csv")}>Download CSV</button>
          </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
