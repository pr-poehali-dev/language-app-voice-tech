import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ExerciseCard from "@/components/ExerciseCard";
import PronunciationPractice from "@/components/PronunciationPractice";

interface Exercise {
  type: "translation" | "audio";
  question: string;
  options: string[];
  correct: number;
  audio?: string;
}

const lessonData: Record<
  string,
  {
    title: string;
    exercises: Exercise[];
    words: Array<{ word: string; translation: string }>;
  }
> = {
  "1": {
    title: "Базовые фразы",
    exercises: [
      {
        type: "translation",
        question: "Как переводится 'Hello'?",
        options: ["Привет", "Пока", "Спасибо", "Извините"],
        correct: 0,
      },
      {
        type: "audio",
        question: "Что означает это слово?",
        options: ["Хорошо", "Плохо", "Быстро", "Медленно"],
        correct: 0,
        audio: "Good",
      },
      {
        type: "translation",
        question: "Переведите 'Thank you'",
        options: ["Пожалуйста", "Спасибо", "Извините", "До свидания"],
        correct: 1,
      },
    ],
    words: [
      { word: "Hello", translation: "Привет" },
      { word: "Good", translation: "Хорошо" },
      { word: "Thank you", translation: "Спасибо" },
    ],
  },
};

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = lessonData[id || "1"];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card>
          <CardContent className="text-center p-8">
            <h2 className="text-xl font-bold mb-4">Урок не найден</h2>
            <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalExercises = lesson.exercises.length;
  const progress =
    ((currentExercise + (showPronunciation ? lesson.words.length : 0)) /
      (totalExercises + lesson.words.length)) *
    100;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentExercise < totalExercises - 1) {
      setCurrentExercise((prev) => prev + 1);
    } else if (!showPronunciation) {
      setShowPronunciation(true);
      setCurrentWord(0);
    } else if (currentWord < lesson.words.length - 1) {
      setCurrentWord((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePronunciationNext = () => {
    if (currentWord < lesson.words.length - 1) {
      setCurrentWord((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    const score = Math.round((correctAnswers / totalExercises) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Icon name="Trophy" size={24} className="text-yellow-500" />
                Урок завершён!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">🎉</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Ваш результат</h3>
                <div className="text-4xl font-bold text-primary mb-4">
                  {score}%
                </div>
                <p className="text-muted-foreground">
                  Правильных ответов: {correctAnswers} из {totalExercises}
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.reload()}>
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Пройти снова
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  <Icon name="Home" size={16} className="mr-2" />
                  На главную
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
              <p className="text-muted-foreground">Урок {id}</p>
            </div>
          </div>
          <Badge variant="outline">
            {showPronunciation ? "Произношение" : "Упражнения"}
          </Badge>
        </div>

        {/* Прогресс */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Прогресс</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Контент урока */}
        <div className="space-y-8">
          {!showPronunciation ? (
            <ExerciseCard
              exercise={lesson.exercises[currentExercise]}
              onAnswer={handleAnswer}
            />
          ) : (
            <div className="space-y-6">
              <PronunciationPractice
                word={lesson.words[currentWord].word}
                translation={lesson.words[currentWord].translation}
              />
              <div className="flex justify-center">
                <Button onClick={handlePronunciationNext}>
                  {currentWord < lesson.words.length - 1
                    ? "Следующее слово"
                    : "Завершить урок"}
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Индикатор позиции */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {!showPronunciation ? (
            <>
              Упражнение {currentExercise + 1} из {totalExercises}
            </>
          ) : (
            <>
              Слово {currentWord + 1} из {lesson.words.length}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
