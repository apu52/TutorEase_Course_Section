
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Terminal, BookOpen, ChevronRight } from 'lucide-react';
import RoadmapSection from './RoadmapSection';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultsCardProps {
  data: {
    topic: string;
    skillLevel: string;
    learningPath: any[];
    projects: any[];
    resources: any[];
    careerOpportunities: any[];
  };
}

const ResultsCard: React.FC<ResultsCardProps> = ({ data }) => {
  const [showExportOption, setShowExportOption] = useState(false);
  const [exportConfirmed, setExportConfirmed] = useState(false);
  const [showCoursesDialog, setShowCoursesDialog] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [courseDetails, setCourseDetails] = useState<null | {
    id: string;
    title: string;
    instructor: string;
    difficulty: string;
    rating: number;
    skills: string[];
    description: string;
  }>(null);

  const handleExportPDF = () => {
    // Simulate PDF download
    setExportConfirmed(true);
    setTimeout(() => {
      console.log("Exporting to PDF...");
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8,");
      element.setAttribute("download", `${data.topic.replace(/\s+/g, '_')}_roadmap.pdf`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const mockCourses = [
    {
      id: "132",
      title: "Web Development With Rust",
      rating: 5.0,
      difficulty: "Beginner"
    },
    {
      id: "396",
      title: "Web Design For Everybody: Basics Of Web Development & Coding",
      rating: 4.8,
      difficulty: "Beginner"
    },
    {
      id: "1606",
      title: "Introduction To Web Development",
      rating: 4.7,
      difficulty: "Beginner"
    },
    {
      id: "605",
      title: "Backend Web Development With Go: Build An E-Manual Server",
      rating: 4.8,
      difficulty: "Beginner"
    },
    {
      id: "196",
      title: "JavaScript Essentials for Modern Web Development",
      rating: 4.7,
      difficulty: "Beginner"
    }
  ];

  const handleCourseIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;
    
    // Find the course by ID
    const course = mockCourses.find(c => c.id === courseId);
    
    if (course) {
      setCourseDetails({
        id: course.id,
        title: course.title,
        instructor: "Dr. Jane Smith",
        difficulty: course.difficulty,
        rating: course.rating,
        skills: ["Programming", "Web Technologies", "System Design"],
        description: "Cutting-edge course exploring the latest trends and techniques in web development, tailored for beginner learners."
      });
    } else {
      // Default course details if not found
      setCourseDetails({
        id: courseId,
        title: "Custom Course",
        instructor: "Various Instructors",
        difficulty: "Self-paced",
        rating: 4.5,
        skills: ["Programming", "Web Technologies"],
        description: "A personalized course tailored to your learning objectives and skill level."
      });
    }
  };

  // Transform data format for RoadmapSection
  const transformLearningPath = () => {
    // This is a basic transformation based on the screenshots
    // In a real app, you'd have a more sophisticated transformation based on your data structure
    
    return [
      {
        text: `Foundations of ${data.topic} (${data.skillLevel}) - 4-6 weeks`,
        color: "green-400",
        description: `Build core knowledge and fundamental skills in ${data.topic}. Focus on understanding basic principles and becoming familiar with essential tools.`,
        subItems: [
          {
            text: "Key Concepts:",
            color: "cyan-400",
            subItems: [
              { text: `${data.topic} basics`, color: "white" },
              { text: "Core principles", color: "white" },
              { text: "Fundamental tools and techniques", color: "white" }
            ]
          },
          {
            text: "Milestones:",
            color: "pink-400",
            subItems: [
              { text: `Complete first ${data.topic} exercise`, color: "white" },
              { text: `Build simple ${data.topic} project`, color: "white" }
            ]
          },
          {
            text: "Practice Activities:",
            color: "cyan-400",
            subItems: [
              { text: `Daily ${data.topic} exercises`, color: "white" },
              { text: "Follow beginner tutorials", color: "white" }
            ]
          }
        ]
      },
      {
        text: `${data.topic} Skill Development (Intermediate) - 8-12 weeks`,
        color: "green-400",
        description: `Deepen understanding of ${data.topic} and apply more advanced concepts. Focus on building practical skills through hands-on projects and implementation.`,
        subItems: [
          {
            text: "Key Concepts:",
            color: "cyan-400",
            subItems: [
              { text: `Advanced ${data.topic} techniques`, color: "white" },
              { text: "Applied projects", color: "white" },
              { text: "Specialized tools", color: "white" }
            ]
          },
          {
            text: "Milestones:",
            color: "pink-400",
            subItems: [
              { text: `Complete medium complexity ${data.topic} project`, color: "white" },
              { text: "Solve real-world problems", color: "white" }
            ]
          },
          {
            text: "Practice Activities:",
            color: "cyan-400",
            subItems: [
              { text: "Implement sample projects", color: "white" },
              { text: "Participate in forums/discussions", color: "white" }
            ]
          }
        ]
      },
      {
        text: `${data.topic} Mastery & Specialization (Advanced) - 12-16 weeks`,
        color: "green-400",
        description: `Develop expert-level skills in ${data.topic} with focus on real-world application. Specialize in specific areas and build a professional portfolio.`,
        subItems: [
          {
            text: "Key Concepts:",
            color: "cyan-400",
            subItems: [
              { text: "Industry best practices", color: "white" },
              { text: "Specialized frameworks", color: "white" },
              { text: "Performance optimization", color: "white" }
            ]
          }
        ]
      }
    ];
  };

  // Transform projects data for the table
  const transformProjects = () => {
    return [
      {
        name: `Beginner Project: ${data.topic} Fundamentals Application`,
        description: `Apply basic ${data.topic} concepts in a simple project to practice fundamentals and gain confidence.`,
        complexity: "Low",
        time: "1-2 weeks"
      },
      {
        name: `Intermediate Project: Interactive ${data.topic} Application`,
        description: `Create a more complex application using intermediate ${data.topic} skills with greater functionality and sophistication.`,
        complexity: "Medium",
        time: "3-4 weeks"
      },
      {
        name: `Capstone Project: Advanced ${data.topic} Implementation`,
        description: `Apply all learned skills in a comprehensive ${data.topic} project that showcases mastery and solves a real-world problem.`,
        complexity: "High",
        time: "6-8 weeks"
      }
    ];
  };

  // Transform resources data for display
  const transformResources = () => {
    return {
      books: [
        `Introduction to ${data.topic}`,
        `Advanced ${data.topic} Techniques`,
        `Mastering ${data.topic}`
      ],
      courses: [
        `${data.topic} for Beginners`,
        `Professional ${data.topic} Masterclass`
      ],
      communities: [
        "Stack Overflow",
        "Reddit",
        `${data.topic} Discord Servers`
      ],
      tools: [
        `${data.topic} Development Environment`,
        "Version Control",
        "Testing Frameworks"
      ],
      practice: [
        "Codecademy",
        "Exercism",
        "LeetCode"
      ]
    };
  };

  const learningPathData = transformLearningPath();
  const projectsData = transformProjects();
  const resourcesData = transformResources();

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#121212] p-6 rounded-lg border border-tutorease-yellow/30 font-mono">
      {/* Title Section */}
      <div className="border border-cyan-400/30 p-4 mb-6 bg-[#0c1e35] rounded">
        <div className="text-center">
          <div className="text-cyan-400 text-xl border-b border-cyan-400/30 pb-2 mb-2">
            YOUR PERSONALIZED LEARNING JOURNEY
          </div>
        </div>
      </div>
      
      {/* Learning Path Section */}
      <div className="space-y-8">
        <div className="text-white font-bold">Learning Path</div>
        <div className="pl-2 border-l-2 border-tutorease-yellow/30 space-y-4">
          {learningPathData.map((item, index) => (
            <RoadmapItem key={index} item={item} level={0} />
          ))}
        </div>
        
        {/* Projects Section */}
        <div className="border border-tutorease-yellow/30 rounded p-4 bg-[#0c1e35]/50">
          <div className="text-center text-cyan-400 mb-4 border-b border-cyan-400/30 pb-2">Recommended Projects</div>
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="border-b border-tutorease-yellow/20">
                <TableHead className="text-left text-tutorease-yellow">Project Name</TableHead>
                <TableHead className="text-left text-tutorease-yellow">Description</TableHead>
                <TableHead className="text-left text-tutorease-yellow">Complexity</TableHead>
                <TableHead className="text-left text-tutorease-yellow">Est. Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map((project, index) => (
                <TableRow key={index} className="border-b border-tutorease-yellow/10">
                  <TableCell className="text-cyan-400">{project.name}</TableCell>
                  <TableCell className="text-white/80">{project.description}</TableCell>
                  <TableCell className={`
                    ${project.complexity === 'Low' ? 'text-green-400' : 
                      project.complexity === 'Medium' ? 'text-yellow-400' : 
                      'text-red-400'}
                  `}>
                    {project.complexity}
                  </TableCell>
                  <TableCell className="text-yellow-400">{project.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Learning Resources */}
        <div className="border border-tutorease-yellow/30 rounded p-4 bg-[#0c1e35]/50">
          <div className="text-center text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">Learning Resources</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-yellow-400 font-bold mb-2">Recommended Books:</div>
              <ul className="list-disc pl-5 space-y-1 text-white/90">
                {resourcesData.books.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="text-yellow-400 font-bold mb-2">Online Courses:</div>
              <ul className="list-disc pl-5 space-y-1 text-white/90">
                {resourcesData.courses.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="text-yellow-400 font-bold mb-2">Communities:</div>
              <ul className="list-disc pl-5 space-y-1 text-white/90">
                {resourcesData.communities.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="text-yellow-400 font-bold mb-2">Essential Tools:</div>
              <ul className="list-disc pl-5 space-y-1 text-white/90">
                {resourcesData.tools.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="text-yellow-400 font-bold mb-2">Practice Platforms:</div>
              <ul className="list-disc pl-5 space-y-1 text-white/90">
                {resourcesData.practice.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Career Opportunities */}
        <div className="border border-tutorease-yellow/30 rounded p-4 bg-[#0c1e35]/50">
          <div className="text-center text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">Career Opportunities</div>
          
          <div>
            <div className="text-yellow-400 font-bold mb-2">Career Insights:</div>
            <ul className="list-disc pl-5 space-y-1 text-white/90">
              {data.careerOpportunities.map((opportunity, idx) => (
                <li key={idx}>{opportunity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Export Section */}
      {!exportConfirmed && (
        <div className="mt-8 p-4 bg-[#0c1e35] rounded border border-tutorease-yellow/30">
          <p className="text-green-400 mb-4">Would you like to export this roadmap to a markdown file? (y/n): 
            <button 
              className="ml-2 text-tutorease-yellow hover:underline"
              onClick={handleExportPDF}
            >
              y
            </button>
            <button 
              className="ml-2 text-tutorease-yellow hover:underline"
              onClick={() => setExportConfirmed(true)}
            >
              n
            </button>
          </p>
        </div>
      )}
      
      {/* Course Recommendations */}
      {exportConfirmed && (
        <div className="mt-8 animate-fade-in">
          <div className="p-4 bg-[#0c1e35] rounded border border-tutorease-yellow/30">
            <p className="text-green-400 mb-4">
              {!showCoursesDialog ? (
                <button 
                  className="text-tutorease-yellow hover:underline flex items-center"
                  onClick={() => setShowCoursesDialog(true)}
                >
                  <span>Press Enter to see recommended courses...</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div className="animate-fade-in">
                  <div className="text-center text-white mb-4">Recommended Courses</div>
                  
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="border-b border-tutorease-yellow/20">
                        <TableHead className="text-left text-white">ID</TableHead>
                        <TableHead className="text-left text-white">Course Name</TableHead>
                        <TableHead className="text-left text-white">Rating</TableHead>
                        <TableHead className="text-left text-white">Difficulty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCourses.map((course) => (
                        <TableRow key={course.id} className="border-b border-tutorease-yellow/10">
                          <TableCell className="text-white/80">{course.id}</TableCell>
                          <TableCell className="text-cyan-400">{course.title}</TableCell>
                          <TableCell className="text-yellow-400">{course.rating} ★</TableCell>
                          <TableCell className="text-green-400">{course.difficulty}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6">
                    <p className="text-white/80 mb-2">Use the course ID to get more details about a specific course.</p>
                    
                    <form onSubmit={handleCourseIdSubmit} className="flex items-center gap-2">
                      <label className="text-green-400">Enter a course ID for more details (or 'q' to quit):</label>
                      <Input 
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="bg-[#0c1e35] border-tutorease-yellow/30 text-white max-w-[60px]"
                      />
                      <Button 
                        type="submit" 
                        variant="outline"
                        className="border-tutorease-yellow text-tutorease-yellow hover:bg-tutorease-yellow hover:text-tutorease-darkBlue"
                      >
                        Submit
                      </Button>
                    </form>
                    
                    {courseDetails && (
                      <div className="mt-4 p-4 border border-tutorease-yellow/30 rounded bg-[#0c1e35] animate-fade-in">
                        <div className="text-center text-white border-b border-tutorease-yellow/20 pb-2 mb-3">
                          Course Details
                        </div>
                        <div className="text-cyan-400 text-lg font-bold mb-2">{courseDetails.title}</div>
                        <div className="grid grid-cols-1 gap-1">
                          <div><span className="text-yellow-400">Rating:</span> <span className="text-white">{courseDetails.rating} ★</span></div>
                          <div><span className="text-yellow-400">Difficulty:</span> <span className="text-white">{courseDetails.difficulty}</span></div>
                          <div><span className="text-yellow-400">Skills:</span> <span className="text-white">{courseDetails.skills.join(', ')}</span></div>
                          <div className="mt-2">
                            <div className="text-yellow-400">Description:</div>
                            <div className="text-white/90 mt-1">{courseDetails.description}</div>
                          </div>
                          <div className="mt-3">
                            <Button 
                              variant="outline"
                              className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                            >
                              View Course
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <button 
          className="text-cyan-400 underline hover:text-tutorease-lightYellow"
          onClick={() => window.location.reload()}
        >
          Start a new search
        </button>
      </div>
    </div>
  );
};

// Helper component for RoadmapItem to avoid circular reference
const RoadmapItem: React.FC<{ item: any; level: number }> = ({ item, level }) => {
  const indent = level * 20;
  
  return (
    <div className="relative">
      <div 
        className="flex items-start gap-2" 
        style={{ marginLeft: `${indent}px` }}
      >
        {level > 0 && (
          <div className="flex items-center h-6">
            <span className="text-tutorease-yellow">├── </span>
          </div>
        )}
        <div className="flex flex-col">
          <div 
            className={`${item.highlight ? 'text-tutorease-yellow' : ''} 
                      ${item.italic ? 'italic' : ''} 
                      ${item.color ? `text-${item.color}` : 'text-cyan-400'}`}
          >
            {item.text}
            {item.timeframe && <span className="text-green-400 ml-2">- {item.timeframe}</span>}
          </div>
          
          {item.description && (
            <div className="text-white/90 italic text-sm mt-1">
              {item.description}
            </div>
          )}
        </div>
      </div>
      
      {item.subItems && item.subItems.map((subItem: any, index: number) => (
        <RoadmapItem 
          key={index} 
          item={subItem} 
          level={level + 1} 
        />
      ))}
    </div>
  );
};

export default ResultsCard;
