import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", level: "Beginner", progress: 15 },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
    level: "Intermediate",
    progress: 45,
  },
  { code: "fr", name: "Français", flag: "🇫🇷", level: "Advanced", progress: 75 },
  { code: "es", name: "Español", flag: "🇪🇸", level: "Beginner", progress: 8 },
  { code: "it", name: "Italiano", flag: "🇮🇹", level: "New", progress: 0 },
  { code: "ja", name: "日本語", flag: "🇯🇵", level: "New", progress: 0 },
];

const LanguageSelector = () => {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-gray-800 mb-2">
          Выберите язык для изучения
        </h2>
        <p className="text-gray-600">
          Продолжите обучение или начните изучать новый язык
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <Card
            key={lang.code}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {lang.name}
                    </h3>
                    <Badge
                      variant={lang.level === "New" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {lang.level}
                    </Badge>
                  </div>
                </div>
              </div>

              {lang.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Прогресс</span>
                    <span>{lang.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${lang.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {lang.progress === 0 && (
                <div className="text-center py-2">
                  <span className="text-sm text-gray-500">Начать изучение</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LanguageSelector;
