import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Exercise {
  id: string;
  type: "audio" | "translation";
  question: string;
  options: string[];
  correct: number;
  audio?: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const ExerciseCard = ({ exercise, onComplete }: ExerciseCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setShowFeedback(true);
    setIsAnswered(true);

    const isCorrect = index === exercise.correct;

    // Отправляем результат после небольшой задержки
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1500);
  };

  const playAudio = () => {
    if (exercise.audio) {
      const audio = new Audio(exercise.audio);
      audio.play().catch(console.error);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return selectedOption === index
        ? "bg-primary text-primary-foreground"
        : "bg-white hover:bg-gray-50";
    }

    if (index === exercise.correct) {
      return "bg-green-100 border-green-500 text-green-800";
    }

    if (index === selectedOption && index !== exercise.correct) {
      return "bg-red-100 border-red-500 text-red-800";
    }

    return "bg-gray-50 text-gray-500";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          {exercise.type === "audio" && <Icon name="Volume2" size={24} />}
          {exercise.type === "translation" && (
            <Icon name="Languages" size={24} />
          )}
          {exercise.type === "audio" ? "Аудирование" : "Перевод"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Вопрос */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium">{exercise.question}</h3>

          {exercise.type === "audio" && exercise.audio && (
            <Button
              variant="outline"
              size="lg"
              onClick={playAudio}
              className="rounded-full"
            >
              <Icon name="Play" size={20} />
              Воспроизвести
            </Button>
          )}
        </div>

        {/* Варианты ответов */}
        <div className="space-y-3">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${getOptionStyle(index)}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && index === exercise.correct && (
                  <Icon name="Check" size={20} className="text-green-600" />
                )}
                {showFeedback &&
                  index === selectedOption &&
                  index !== exercise.correct && (
                    <Icon name="X" size={20} className="text-red-600" />
                  )}
              </div>
            </button>
          ))}
        </div>

        {/* Обратная связь */}
        {showFeedback && (
          <div
            className={`p-4 rounded-lg text-center ${
              selectedOption === exercise.correct
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {selectedOption === exercise.correct ? (
              <div className="text-green-800">
                <Icon name="CheckCircle" size={24} className="mx-auto mb-2" />
                <p className="font-medium">Правильно! 🎉</p>
              </div>
            ) : (
              <div className="text-red-800">
                <Icon name="XCircle" size={24} className="mx-auto mb-2" />
                <p className="font-medium">Неправильно</p>
                <p className="text-sm mt-1">
                  Правильный ответ: {exercise.options[exercise.correct]}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
