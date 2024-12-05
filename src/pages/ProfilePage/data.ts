import { ProfileData } from './types';

export const profileData: ProfileData = {
  name: "John Developer",
  title: "Senior Software Engineer",
  bio: "Passionate about creating seamless user experiences and writing clean, maintainable code. Always eager to learn new technologies and solve complex problems.",
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Git", "GraphQL"],
  experience: [
    {
      company: "Tech Corp",
      position: "Senior Developer",
      years: "2020 - Present",
      description: "Leading development of scalable web applications"
    },
    {
      company: "Start Up Inc",
      position: "Full Stack Developer",
      years: "2018 - 2020",
      description: "Built innovative solutions for emerging markets"
    }
  ],
  funFacts: [
    "I once debugged code in my sleep",
    "My cat writes better code than me",
    "I think CSS is actually easy",
    "I use tabs AND spaces",
    "I debug with console.log"
  ]
};
