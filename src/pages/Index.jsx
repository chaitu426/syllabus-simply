
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Award, Upload, Settings, Download } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  // Refs for scroll animations
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);

  // Handle intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            // Once the animation is added, we no longer need to observe this element
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe elements with the .animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
            AI-Powered Question Generator
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
            Create Perfect Test Papers from Your Syllabus in Seconds
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Upload your syllabus and let our AI generate customized questions at any difficulty level, saving you hours of work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
              Try It Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              Learn More
            </a>
          </div>

          {/* Hero Image/Mockup */}
          <div className="mt-16 w-full max-w-5xl mx-auto relative animate-fade-in glass p-6 rounded-2xl shadow-xl" style={{ animationDelay: '400ms' }}>
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="PaperLabs Dashboard Preview" 
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full text-sm font-medium">
              Modern & Intuitive Interface
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Designed for Educators, Powered by AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines the question creation process, allowing you to focus on what matters most: teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="card hover-lift animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create perfect question papers in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className="relative flex flex-col items-center text-center animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-primary/10 rounded-full text-primary font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%_-_3rem)] w-24 border-t-2 border-dashed border-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center animate-on-scroll opacity-0">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 max-w-2xl">
            Ready to Transform Your Question Creation Process?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of educators who are saving time and creating better assessments with PaperLabs.
          </p>
          <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary/70">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="font-heading text-xl font-bold">PaperLabs</span>
              <p className="text-muted-foreground text-sm mt-2">
                AI-Powered Test Papers for Educators
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="text-center md:text-left">
                <h4 className="font-medium mb-2">Product</h4>
                <ul className="space-y-1">
                  <li><a href="#features" className="text-muted-foreground hover:text-foreground text-sm">Features</a></li>
                  <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground text-sm">How It Works</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Pricing</a></li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-medium mb-2">Company</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PaperLabs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Features data
const features = [
  {
    title: 'Multiple Upload Formats',
    description: 'Upload your syllabus as text, image, or document file for maximum flexibility.',
    icon: Upload
  },
  {
    title: 'Custom Question Types',
    description: 'Generate multiple-choice, short answer, and long answer questions tailored to your needs.',
    icon: Settings
  },
  {
    title: 'Difficulty Control',
    description: 'Set the exact difficulty level for perfectly balanced assessments.',
    icon: Award
  },
  {
    title: 'Syllabus Alignment',
    description: 'Questions are precisely aligned with your curriculum and learning objectives.',
    icon: FileText
  },
  {
    title: 'Export Options',
    description: 'Download your questions in multiple formats for easy integration with your workflow.',
    icon: Download
  },
  {
    title: 'Time-Saving Efficiency',
    description: 'Create complete question sets in minutes instead of hours.',
    icon: CheckCircle
  }
];

// How it works steps
const steps = [
  {
    title: 'Upload Your Syllabus',
    description: 'Upload your syllabus as text, take a photo, or upload a document file.'
  },
  {
    title: 'Customize Your Questions',
    description: 'Select question types and set the difficulty level that matches your needs.'
  },
  {
    title: 'Generate & Export',
    description: 'Our AI generates tailored questions which you can review and export.'
  }
];

export default Index;
