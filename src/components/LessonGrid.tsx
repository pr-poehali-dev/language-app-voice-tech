import LessonCard from "@/components/LessonCard";

const lessons = [
  {
    id: 1,
    title: "Базовые фразы",
    description: "Изучите основные фразы для повседневного общения",
    type: "vocabulary",
    duration: "15 мин",
    difficulty: "Легко",
    completed: true,
    progress: 100,
    exercises: 12,
  },
  {
    id: 2,
    title: "Произношение звуков",
    description: "Практика правильного произношения сложных звуков",
    type: "pronunciation",
    duration: "20 мин",
    difficulty: "Средне",
    completed: false,
    progress: 65,
    exercises: 18,
  },
  {
    id: 3,
    title: "Диалоги в кафе",
    description: "Разговорные навыки для заказа еды и напитков",
    type: "conversation",
    duration: "25 мин",
    difficulty: "Средне",
    completed: false,
    progress: 30,
    exercises: 15,
  },
  {
    id: 4,
    title: "Грамматика: Present Simple",
    description: "Основы простого настоящего времени",
    type: "grammar",
    duration: "30 мин",
    difficulty: "Легко",
    completed: false,
    progress: 0,
    exercises: 20,
  },
  {
    id: 5,
    title: "Числа и даты",
    description: "Изучение чисел, дат и времени",
    type: "vocabulary",
    duration: "18 мин",
    difficulty: "Легко",
    completed: false,
    progress: 0,
    exercises: 14,
  },
  {
    id: 6,
    title: "Речевая практика",
    description: "Интерактивная беседа с ИИ-ассистентом",
    type: "speaking",
    duration: "35 мин",
    difficulty: "Сложно",
    completed: false,
    progress: 0,
    exercises: 8,
  },
];

const LessonGrid = () => {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-gray-800 mb-2">
          Уроки и упражнения
        </h2>
        <p className="text-gray-600">Выберите урок для продолжения обучения</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default LessonGrid;
