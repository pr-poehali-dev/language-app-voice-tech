import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            <Icon name="Zap" size={16} />
            <span>Новая технология речевого обучения</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-montserrat leading-tight">
            Изучайте языки
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              говоря вслух
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Революционная платформа с ИИ-технологиями распознавания речи для
            эффективного изучения иностранных языков
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Начать обучение
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              <Icon name="Mic" size={20} className="mr-2" />
              Попробовать речь
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
