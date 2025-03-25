import { useEffect, useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Award, Upload, Settings, Download } from 'lucide-react';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const featuresRef = useRef(null);
  const navigate = useNavigate();
  const howItWorksRef = useRef(null);
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("Welcome");

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

      // Get the current hour
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // Handle navigation
  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard"); // Go to dashboard if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <div className="inline-block mb-6 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
          AI-Powered Question Generator for Educators
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
          {greeting}, {user?.name ? `Professor ${user.name}` : "Respected Educator"} 👋
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in">
          {user
            ? "Easily generate well-structured test papers tailored to your syllabus. Save time and enhance learning outcomes."
            : "Sign in to access a smarter way to create test papers with AI-driven question generation!"}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
        <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-primary text-white text-lg font-medium rounded-lg shadow-md transition hover:bg-primary/90 flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#how-it-works"
            className="px-6 py-3 border border-primary text-primary text-lg font-medium rounded-lg shadow-md transition hover:bg-primary/10"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>

      <section id="features" ref={featuresRef} className="py-20 bg-secondary/50 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Designed for Educators, Powered by AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 animate-on-scroll">
            Our platform streamlines the question creation process, allowing you to focus on teaching.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card animate-on-scroll">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" ref={howItWorksRef} className="py-20 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 animate-on-scroll">
            Create question papers in three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center animate-on-scroll">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-primary/10 rounded-full text-primary font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary/10 py-20 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            Ready to Transform Your Question Creation Process?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-on-scroll">
            Join thousands of educators who are saving time with PaperLabs.
          </p>
          <Link to="/dashboard" className="btn-primary flex items-center gap-2 animate-on-scroll">
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const features = [
  { title: 'Multiple Upload Formats', description: 'Upload text, images, or documents.', icon: Upload },
  { title: 'Custom Question Types', description: 'Generate MCQs, short and long answers.', icon: Settings },
  { title: 'Difficulty Control', description: 'Set difficulty levels easily.', icon: Award },
  { title: 'Syllabus Alignment', description: 'Questions align with your curriculum.', icon: FileText },
  { title: 'Export Options', description: 'Download in multiple formats.', icon: Download },
  { title: 'Time-Saving Efficiency', description: 'Create question sets in minutes.', icon: CheckCircle }
];

const steps = [
  { title: 'Upload Your Syllabus', description: 'Upload as text, image, or document.' },
  { title: 'Customize Your Questions', description: 'Select types and difficulty levels.' },
  { title: 'Generate & Export', description: 'Review and export AI-generated questions.' }
];

export default Index;
