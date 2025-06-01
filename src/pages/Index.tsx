import Hero from "@/components/Hero";
import LanguageSelector from "@/components/LanguageSelector";
import LessonGrid from "@/components/LessonGrid";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Hero />
      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-12">
        <LanguageSelector />
        <ProgressTracker />
        <LessonGrid />
      </div>
    </div>
  );
};

export default Index;
