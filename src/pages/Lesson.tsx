import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ExerciseCard from "@/components/ExerciseCard";
import PronunciationPractice from "@/components/PronunciationPractice";

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);

  // Пример данных урока
  const lessonData = {
    title: "Базовые фразы приветствия",
    description: "Изучаем основные способы поздороваться и представиться",
    exercises: [
      {
        type: "translation",
        question: "Переведите фразу: 'Hello, nice to meet you!'",
        options: [
          "Привет, приятно познакомиться!",
          "Добро пожаловать!",
          "До свидания!",
          "Как дела?",
        ],
        correct: 0,
      },
      {
        type: "audio",
        question: "Выберите правильный перевод услышанной фразы",
        audio: "Good morning",
        options: [
          "Добрый вечер",
          "Доброе утро",
          "Спокойной ночи",
          "Добрый день",
        ],
        correct: 1,
      },
      {
        type: "pronunciation",
        word: "Hello",
        translation: "Привет",
      },
    ],
  };

  const progress = ((currentExercise + 1) / lessonData.exercises.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentExercise < lessonData.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const handleFinishLesson = () => {
    navigate("/");
  };

  const currentEx = lessonData.exercises[currentExercise];
  const isComplete = currentExercise >= lessonData.exercises.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Хедер урока */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад
            </Button>

            <div className="flex-1 mx-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {currentExercise + 1} из {lessonData.exercises.length}
                </span>
                <span className="text-sm font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={20} className="text-yellow-500" />
              <span className="font-medium">{score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Контент урока */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{lessonData.title}</h1>
          <p className="text-muted-foreground">{lessonData.description}</p>
        </div>

        {!isComplete ? (
          <div className="flex justify-center">
            {currentEx.type === "pronunciation" ? (
              <PronunciationPractice
                word={currentEx.word}
                translation={currentEx.translation}
              />
            ) : (
              <ExerciseCard exercise={currentEx} onAnswer={handleAnswer} />
            )}
          </div>
        ) : (
          /* Экран завершения */
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
                Урок завершён!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  {score} из {lessonData.exercises.length}
                </p>
                <p className="text-muted-foreground">Правильных ответов</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Точность</span>
                  <span className="font-medium">
                    {Math.round((score / lessonData.exercises.length) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(score / lessonData.exercises.length) * 100}
                  className="h-2"
                />
              </div>

              <Button onClick={handleFinishLesson} className="w-full">
                Продолжить изучение
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Lesson;
