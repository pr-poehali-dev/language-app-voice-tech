import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string;
  difficulty: string;
  completed: boolean;
  progress: number;
  exercises: number;
}

interface LessonCardProps {
  lesson: Lesson;
}

const getTypeIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    vocabulary: "BookOpen",
    pronunciation: "Mic",
    conversation: "MessageCircle",
    grammar: "PenTool",
    speaking: "Volume2",
  };
  return icons[type] || "BookOpen";
};

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    vocabulary: "bg-blue-100 text-blue-700",
    pronunciation: "bg-green-100 text-green-700",
    conversation: "bg-purple-100 text-purple-700",
    grammar: "bg-orange-100 text-orange-700",
    speaking: "bg-red-100 text-red-700",
  };
  return colors[type] || "bg-gray-100 text-gray-700";
};

const LessonCard = ({ lesson }: LessonCardProps) => {
  const navigate = useNavigate();

  const handleLessonClick = () => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {lesson.completed && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-500 text-white rounded-full p-1">
            <Icon name="Check" size={16} />
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${getTypeColor(lesson.type)}`}>
            <Icon name={getTypeIcon(lesson.type) as any} size={20} />
          </div>
          <Badge variant="outline" className="text-xs">
            {lesson.difficulty}
          </Badge>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
          {lesson.title}
        </CardTitle>

        <p className="text-sm text-gray-600 line-clamp-2">
          {lesson.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="FileText" size={14} />
            <span>{lesson.exercises} упр.</span>
          </div>
        </div>

        {lesson.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Прогресс</span>
              <span className="text-gray-800 font-medium">
                {lesson.progress}%
              </span>
            </div>
            <Progress value={lesson.progress} className="h-2" />
          </div>
        )}

        <Button
          className="w-full"
          variant={lesson.completed ? "outline" : "default"}
          onClick={handleLessonClick}
        >
          {lesson.completed ? (
            <>
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Повторить
            </>
          ) : lesson.progress > 0 ? (
            <>
              <Icon name="Play" size={16} className="mr-2" />
              Продолжить
            </>
          ) : (
            <>
              <Icon name="Play" size={16} className="mr-2" />
              Начать
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
