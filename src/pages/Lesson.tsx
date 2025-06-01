import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Урок {id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Play" size={20} />
              Урок готовится к запуску
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Интерактивные уроки с ИИ будут доступны в ближайшее время. Следите
              за обновлениями в нашем сообществе!
            </p>
            <Button
              onClick={() =>
                window.open("https://t.me/+QgiLIa1gFRY4Y2Iy", "_blank")
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Присоединиться к сообществу
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Lesson;
