import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PronunciationPracticeProps {
  word: string;
  translation: string;
  targetAccuracy?: number;
  onComplete?: (accuracy: number) => void;
}

const PronunciationPractice = ({
  word,
  translation,
  targetAccuracy = 80,
  onComplete,
}: PronunciationPracticeProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript.toLowerCase().trim();
        setTranscript(result);
        setIsListening(false);
        setAttempts((prev) => prev + 1);

        const calculatedAccuracy = calculateSimilarity(
          word.toLowerCase(),
          result,
        );
        setAccuracy(calculatedAccuracy);

        if (calculatedAccuracy >= targetAccuracy) {
          setIsSuccess(true);
          onComplete?.(calculatedAccuracy);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [word, targetAccuracy, onComplete]);

  const calculateSimilarity = (target: string, spoken: string): number => {
    if (target === spoken) return 100;

    const longer = target.length > spoken.length ? target : spoken;
    const shorter = target.length > spoken.length ? spoken : target;

    if (longer.length === 0) return 100;

    const editDistance = levenshteinDistance(target, spoken);
    return Math.round(((longer.length - editDistance) / longer.length) * 100);
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator,
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const resetPractice = () => {
    setTranscript("");
    setAccuracy(0);
    setAttempts(0);
    setIsSuccess(false);
  };

  const getAccuracyColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccuracyBadge = (score: number) => {
    if (score >= 90) return { variant: "default" as const, text: "Отлично!" };
    if (score >= 80) return { variant: "secondary" as const, text: "Хорошо!" };
    if (score >= 60) return { variant: "outline" as const, text: "Неплохо" };
    return { variant: "destructive" as const, text: "Попробуйте ещё" };
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Icon name="Mic" size={24} />
          Практика произношения
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Слово для произношения */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-primary">{word}</h3>
          <p className="text-muted-foreground">{translation}</p>
        </div>

        {/* Кнопка записи */}
        <div className="flex justify-center">
          <Button
            onClick={isListening ? stopListening : startListening}
            size="lg"
            variant={isListening ? "destructive" : "default"}
            className="rounded-full w-20 h-20"
            disabled={!("webkitSpeechRecognition" in window)}
          >
            <Icon
              name={isListening ? "MicOff" : "Mic"}
              size={32}
              className={isListening ? "animate-pulse" : ""}
            />
          </Button>
        </div>

        {/* Статус */}
        <div className="text-center">
          {!("webkitSpeechRecognition" in window) && (
            <p className="text-sm text-muted-foreground">
              Распознавание речи не поддерживается в этом браузере
            </p>
          )}
          {isListening && (
            <p className="text-sm text-primary animate-pulse">
              Слушаю... Произнесите слово
            </p>
          )}
        </div>

        {/* Результаты */}
        {transcript && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Вы сказали:</p>
              <p className="font-medium">{transcript}</p>
            </div>

            {/* Точность */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Точность</span>
                <span className={`font-bold ${getAccuracyColor(accuracy)}`}>
                  {accuracy}%
                </span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>

            {/* Бадж с оценкой */}
            <div className="flex justify-center">
              <Badge variant={getAccuracyBadge(accuracy).variant}>
                {getAccuracyBadge(accuracy).text}
              </Badge>
            </div>

            {/* Успех */}
            {isSuccess && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Icon
                  name="CheckCircle"
                  size={24}
                  className="text-green-600 mx-auto mb-2"
                />
                <p className="text-green-800 font-medium">
                  Отличное произношение! 🎉
                </p>
              </div>
            )}
          </div>
        )}

        {/* Статистика и действия */}
        {attempts > 0 && (
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-muted-foreground">
              Попыток: {attempts}
            </span>
            <Button variant="outline" size="sm" onClick={resetPractice}>
              <Icon name="RotateCcw" size={16} />
              Сначала
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PronunciationPractice;
