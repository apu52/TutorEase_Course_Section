
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// List of topics
const topics = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Blockchain",
  "Game Development",
  "Embedded Systems",
  "Robotics",
  "Computer Networks",
  "Database Management",
  "UI/UX Design",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Software Engineering",
  "Computer Architecture"
];

interface CourseFormProps {
  onSubmit: (formData: {
    topic: string;
    skillLevel: string;
    aiEnhanced: boolean;
  }) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [aiEnhanced, setAiEnhanced] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !skillLevel) return;
    
    onSubmit({
      topic,
      skillLevel,
      aiEnhanced
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 card-gradient p-6 rounded-lg animate-fade-in">
      <h2 className="text-xl font-bold text-tutorease-yellow mb-4">Find Your Perfect Learning Path</h2>
      
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-white">Topic you want to learn</Label>
        <Select value={topic} onValueChange={setTopic} required>
          <SelectTrigger id="topic" className="bg-tutorease-blue/50 border-tutorease-yellow/30 text-white">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-tutorease-blue border-tutorease-yellow/30 text-white">
            {topics.map((t) => (
              <SelectItem key={t} value={t} className="hover:bg-tutorease-darkBlue/50">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skill-level" className="text-white">Your skill level</Label>
        <Select value={skillLevel} onValueChange={setSkillLevel} required>
          <SelectTrigger id="skill-level" className="bg-tutorease-blue/50 border-tutorease-yellow/30 text-white">
            <SelectValue placeholder="Select your level" />
          </SelectTrigger>
          <SelectContent className="bg-tutorease-blue border-tutorease-yellow/30 text-white">
            <SelectItem value="beginner" className="hover:bg-tutorease-darkBlue/50">
              Beginner
            </SelectItem>
            <SelectItem value="intermediate" className="hover:bg-tutorease-darkBlue/50">
              Intermediate
            </SelectItem>
            <SelectItem value="advanced" className="hover:bg-tutorease-darkBlue/50">
              Advanced
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="ai-enhanced" className="text-white">
          AI-enhanced personalized recommendations
        </Label>
        <Switch
          id="ai-enhanced"
          checked={aiEnhanced}
          onCheckedChange={setAiEnhanced}
          className="data-[state=checked]:bg-tutorease-yellow"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-tutorease-yellow hover:bg-tutorease-darkYellow text-tutorease-darkBlue font-semibold transition-all"
      >
        Generate Learning Path
      </Button>
    </form>
  );
};

export default CourseForm;
