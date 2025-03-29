
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CourseForm from '@/components/CourseForm';
import ProgressBar from '@/components/ProgressBar';
import ResultsCard from '@/components/ResultsCard';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [formData, setFormData] = useState<{
    topic: string;
    skillLevel: string;
    aiEnhanced: boolean;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const { toast } = useToast();

  // Function to generate fake learning path data
  const generateFakeData = (topic: string, skillLevel: string) => {
    // Mock data based on topic and skill level
    const learningPathMap: Record<string, string[]> = {
      "Web Development": [
        "1. HTML & CSS Fundamentals - Create responsive layouts",
        "2. JavaScript Basics - Learn syntax and core concepts",
        "3. Frontend Frameworks - Choose React, Angular, or Vue",
        "4. Backend Development - Node.js and Express",
        "5. Database Integration - SQL and NoSQL options",
        "6. API Design - RESTful and GraphQL approaches",
        "7. Deployment & DevOps - CI/CD pipelines"
      ],
      "Data Science": [
        "1. Programming Basics - Python and libraries",
        "2. Statistics Fundamentals - Probability and inference",
        "3. Data Manipulation - Pandas and data cleaning",
        "4. Data Visualization - Matplotlib and Seaborn",
        "5. Machine Learning Basics - Scikit-learn",
        "6. Deep Learning - TensorFlow or PyTorch",
        "7. Data Science Projects - Portfolio building"
      ],
      "Machine Learning": [
        "1. Mathematics Fundamentals - Linear algebra and calculus",
        "2. Statistical Modeling - Probability distributions",
        "3. ML Algorithms - Classification, regression, clustering",
        "4. Feature Engineering - Selection and transformation",
        "5. Model Evaluation - Metrics and validation",
        "6. Deep Learning - Neural networks and architectures",
        "7. MLOps - Deployment and monitoring"
      ]
    };
    
    // Use specific learning path if available, otherwise use default
    const learningPath = learningPathMap[topic] || [
      "1. Fundamentals - Core concepts and principles",
      "2. Programming Skills - Required languages and tools",
      "3. Specialized Knowledge - Domain-specific techniques",
      "4. Advanced Topics - Deeper understanding of complex areas",
      "5. Project Work - Applied learning through creation",
      "6. Industry Standards - Best practices and workflows",
      "7. Continuous Learning - Keeping up with developments"
    ];
    
    // Projects based on skill level
    const projectsByLevel: Record<string, string[]> = {
      "beginner": [
        "Personal portfolio website",
        "Simple calculator application",
        "To-do list manager",
        "Weather forecast app"
      ],
      "intermediate": [
        "E-commerce platform with payment integration",
        "Social media dashboard with analytics",
        "Content management system",
        "Real-time chat application"
      ],
      "advanced": [
        "AI-powered recommendation system",
        "Blockchain-based decentralized application",
        "Cloud-native microservices architecture",
        "Computer vision object detection system"
      ]
    };
    
    // Common resources with some personalization
    const resources = [
      "Udemy - Comprehensive video courses for practical skills",
      "Coursera - University-backed learning programs",
      "freeCodeCamp - Free interactive coding challenges",
      "GitHub repositories with example projects",
      "Stack Overflow - Community support for problems",
      `O'Reilly books on ${topic}`
    ];
    
    // Career opportunities
    const careerOpportunities = [
      `${topic.split(' ')[0]} Developer at tech companies`,
      "Freelance consultant for small businesses",
      "Technical lead at startups",
      "Senior specialist at enterprise organizations",
      "Technical educator or course creator"
    ];
    
    return {
      topic,
      skillLevel,
      learningPath,
      projects: projectsByLevel[skillLevel] || projectsByLevel.beginner,
      resources,
      careerOpportunities
    };
  };

  const handleFormSubmit = (data: {
    topic: string;
    skillLevel: string;
    aiEnhanced: boolean;
  }) => {
    setFormData(data);
    setIsLoading(true);
    setResults(null);
    
    toast({
      title: "Request submitted",
      description: `Generating learning path for ${data.topic}`,
    });
  };

  const handleLoadingComplete = () => {
    if (!formData) return;
    
    // Generate fake data based on form inputs
    const resultData = generateFakeData(formData.topic, formData.skillLevel);
    setResults(resultData);
    setIsLoading(false);
    
    toast({
      title: "Learning path ready!",
      description: "Your personalized roadmap has been generated",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-tutorease-darkBlue">
      <Header />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {!formData && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                  <span className="yellow-glow text-tutorease-yellow">AI-Powered</span> Course Navigation
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Get personalized learning paths, course recommendations, and career guidance based on your interests and skill level.
                </p>
              </div>
              
              <CourseForm onSubmit={handleFormSubmit} />
            </div>
          )}
          
          {isLoading && <ProgressBar isLoading={isLoading} onComplete={handleLoadingComplete} />}
          
          {results && <ResultsCard data={results} />}
          
          {(formData || results) && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  setFormData(null);
                  setResults(null);
                }}
                className="text-tutorease-yellow underline hover:text-tutorease-lightYellow"
              >
                Start a new search
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t border-tutorease-yellow/20">
        <div className="container text-center text-white/50 text-sm">
          © 2023 TUTOREASE | AI-Powered Learning Paths
        </div>
      </footer>
    </div>
  );
};

export default Index;
