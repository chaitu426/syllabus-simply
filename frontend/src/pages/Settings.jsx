
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


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
                <div className="space-y-4">
      {!selectedPaper ? (
        // Show list of papers
        papers.map((paper, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-border rounded-lg bg-background cursor-pointer"
            onClick={() => setSelectedPaper(paper)}
          >
            <div>
              <h3 className="font-medium">{paper.title}</h3>
              <p className="text-sm text-muted-foreground">{paper.date}</p>
            </div>

            <div className="flex items-center gap-3">
              <select className="border border-border p-2 rounded-lg">
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="txt">TXT</option>
              </select>

              <button
                className="btn-primary px-3 py-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Downloading ${paper.title}`);
                }}
              >
                Download
              </button>

              <button
                className="btn-danger px-3 py-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Deleting ${paper.title}`);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        // Show selected paper in question format
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <button className="btn-secondary" onClick={() => setSelectedPaper(null)}>
              Back to Papers
            </button>
            <button className="btn-primary" onClick={() => setShowAnswers(!showAnswers)}>
              {showAnswers ? "Show Question Paper" : "Show Answer Key"}
            </button>
          </div>

          <h2 className="text-lg font-semibold">{selectedPaper.title}</h2>

          {/* Toggle View: Question Paper OR Answer Key */}
          {!showAnswers ? (
            // Question Paper Format
            <div className="p-4 border border-border rounded-lg bg-background">
              <h3 className="font-medium mb-3 text-center">Question Paper</h3>
              <ul className="space-y-4">
                {selectedPaper.generateQuestionPaper.map((q, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-semibold">{i + 1}. [{q.type}]</span> {q.question}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // Answer Key Format
            <div className="p-4 border border-border rounded-lg bg-background">
              <h3 className="font-medium mb-3 text-center">Answer Key</h3>
              <ul className="space-y-4">
                {selectedPaper.generateQuestionPaper.map((q, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-semibold">{i + 1}. [{q.type}]</span> {q.question}  
                    <span className="text-green-500 font-semibold"> → {q.answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>

                {/* Download All Papers */}
                <button className="btn-primary mt-6" onClick={() => alert("Downloading all papers")}>
                  Download All Papers
                </button>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
