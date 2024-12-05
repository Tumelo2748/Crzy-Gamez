export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    years: string;
    description: string;
  }[];
  funFacts: string[];
}
