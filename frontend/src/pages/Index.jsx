import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Award, Upload, Settings, Download } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="inline-block mb-6 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
            AI-Powered Question Generator
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Create Perfect Test Papers from Your Syllabus in Seconds
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Upload your syllabus and let our AI generate customized questions at any difficulty level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link to="/dashboard" className="btn-primary flex items-center gap-2">
              Try It Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how-it-works" className="btn-secondary">Learn More</a>
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
