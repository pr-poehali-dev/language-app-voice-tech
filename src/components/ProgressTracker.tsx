import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const ProgressTracker = () => {
  const stats = [
    { icon: "Target", label: "Изучено слов", value: "1,247", progress: 78 },
    { icon: "Clock", label: "Время занятий", value: "28 ч", progress: 65 },
    { icon: "Flame", label: "Дни подряд", value: "12", progress: 40 },
    { icon: "Trophy", label: "Достижения", value: "8", progress: 88 },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-gray-800 mb-2">
          Ваш прогресс
        </h2>
        <p className="text-gray-600">Отслеживайте успехи в изучении языков</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Icon
                  name={stat.icon as any}
                  size={24}
                  className="text-purple-600"
                />
                <span className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Progress value={stat.progress} className="h-2" />
            </CardContent>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProgressTracker;
