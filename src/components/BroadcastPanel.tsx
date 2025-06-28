import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface BroadcastMessage {
  id: string;
  title: string;
  text: string;
  media: string[];
  keyboard: KeyboardButton[][];
  recipients: number;
  status: "draft" | "scheduled" | "sent";
  scheduledAt?: string;
  sentAt?: string;
}

interface KeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
}

const BroadcastPanel = () => {
  const [message, setMessage] = useState({
    title: "",
    text: "",
    media: [] as string[],
    keyboard: [[]] as KeyboardButton[][],
    recipients: "all",
    scheduledAt: "",
  });

  const [keyboardRow, setKeyboardRow] = useState({
    text: "",
    url: "",
    callback_data: "",
  });
  const [activeTab, setActiveTab] = useState("create");

  // Пример истории рассылок
  const broadcastHistory: BroadcastMessage[] = [
    {
      id: "1",
      title: "Акция на услуги",
      text: "Скидка 20% на все услуги до конца месяца!",
      media: [],
      keyboard: [[{ text: "Узнать больше", url: "https://example.com" }]],
      recipients: 1234,
      status: "sent",
      sentAt: "2024-01-15 14:30",
    },
    {
      id: "2",
      title: "Новая функция",
      text: "Представляем новую возможность в нашем сервисе",
      media: ["photo1.jpg"],
      keyboard: [],
      recipients: 856,
      status: "scheduled",
      scheduledAt: "2024-01-20 10:00",
    },
  ];

  const addKeyboardButton = () => {
    if (!keyboardRow.text) return;

    const newButton: KeyboardButton = {
      text: keyboardRow.text,
      ...(keyboardRow.url && { url: keyboardRow.url }),
      ...(keyboardRow.callback_data && {
        callback_data: keyboardRow.callback_data,
      }),
    };

    const newKeyboard = [...message.keyboard];
    if (newKeyboard[newKeyboard.length - 1].length < 3) {
      newKeyboard[newKeyboard.length - 1].push(newButton);
    } else {
      newKeyboard.push([newButton]);
    }

    setMessage({ ...message, keyboard: newKeyboard });
    setKeyboardRow({ text: "", url: "", callback_data: "" });
  };

  const removeKeyboardButton = (rowIndex: number, buttonIndex: number) => {
    const newKeyboard = message.keyboard
      .map((row, rIdx) =>
        rIdx === rowIndex ? row.filter((_, bIdx) => bIdx !== buttonIndex) : row,
      )
      .filter((row) => row.length > 0);

    if (newKeyboard.length === 0) newKeyboard.push([]);
    setMessage({ ...message, keyboard: newKeyboard });
  };

  const handleSendBroadcast = () => {
    console.log("Отправка рассылки:", message);
    // Здесь будет логика отправки
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="create">Создать рассылку</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Send" size={20} />
                Новая рассылка
              </CardTitle>
              <CardDescription>
                Создайте сообщение для отправки пользователям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Название рассылки
                </label>
                <Input
                  placeholder="Введите название для внутреннего использования"
                  value={message.title}
                  onChange={(e) =>
                    setMessage({ ...message, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Текст сообщения
                </label>
                <Textarea
                  placeholder="Введите текст сообщения..."
                  value={message.text}
                  onChange={(e) =>
                    setMessage({ ...message, text: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Медиафайлы
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Icon
                    name="Upload"
                    size={24}
                    className="mx-auto text-gray-400 mb-2"
                  />
                  <p className="text-sm text-gray-500 mb-2">
                    Перетащите файлы или нажмите для выбора
                  </p>
                  <Button variant="outline" size="sm">
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить файлы
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Клавиатура
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      placeholder="Текст кнопки"
                      value={keyboardRow.text}
                      onChange={(e) =>
                        setKeyboardRow({ ...keyboardRow, text: e.target.value })
                      }
                    />
                    <Input
                      placeholder="URL (опционально)"
                      value={keyboardRow.url}
                      onChange={(e) =>
                        setKeyboardRow({ ...keyboardRow, url: e.target.value })
                      }
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Callback data"
                        value={keyboardRow.callback_data}
                        onChange={(e) =>
                          setKeyboardRow({
                            ...keyboardRow,
                            callback_data: e.target.value,
                          })
                        }
                      />
                      <Button onClick={addKeyboardButton} size="sm">
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {message.keyboard.map(
                      (row, rowIndex) =>
                        row.length > 0 && (
                          <div key={rowIndex} className="flex gap-2">
                            {row.map((button, buttonIndex) => (
                              <Badge
                                key={buttonIndex}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {button.text}
                                <button
                                  onClick={() =>
                                    removeKeyboardButton(rowIndex, buttonIndex)
                                  }
                                  className="ml-1 hover:text-red-500"
                                >
                                  <Icon name="X" size={12} />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Получатели
                  </label>
                  <Select
                    value={message.recipients}
                    onValueChange={(value) =>
                      setMessage({ ...message, recipients: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        Все пользователи (2,345)
                      </SelectItem>
                      <SelectItem value="active">
                        Активные пользователи (1,876)
                      </SelectItem>
                      <SelectItem value="new">
                        Новые пользователи (469)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Время отправки
                  </label>
                  <Input
                    type="datetime-local"
                    value={message.scheduledAt}
                    onChange={(e) =>
                      setMessage({ ...message, scheduledAt: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Предварительный просмотр</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 max-w-md">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  {message.text && (
                    <p className="text-sm mb-3">{message.text}</p>
                  )}
                  {message.keyboard.some((row) => row.length > 0) && (
                    <div className="space-y-1">
                      {message.keyboard.map(
                        (row, rowIndex) =>
                          row.length > 0 && (
                            <div key={rowIndex} className="flex gap-1">
                              {row.map((button, buttonIndex) => (
                                <button
                                  key={buttonIndex}
                                  className="flex-1 bg-blue-500 text-white text-xs py-1 px-2 rounded"
                                >
                                  {button.text}
                                </button>
                              ))}
                            </div>
                          ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={handleSendBroadcast}
              className="flex items-center gap-2"
            >
              <Icon name="Send" size={16} />
              {message.scheduledAt ? "Запланировать" : "Отправить сейчас"}
            </Button>
            <Button variant="outline">
              <Icon name="Save" size={16} className="mr-1" />
              Сохранить как черновик
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>История рассылок</CardTitle>
              <CardDescription>
                Все отправленные и запланированные рассылки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {broadcastHistory.map((broadcast) => (
                  <div
                    key={broadcast.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{broadcast.title}</h4>
                          <Badge
                            variant={
                              broadcast.status === "sent"
                                ? "default"
                                : broadcast.status === "scheduled"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {broadcast.status === "sent" && "Отправлено"}
                            {broadcast.status === "scheduled" &&
                              "Запланировано"}
                            {broadcast.status === "draft" && "Черновик"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {broadcast.text.length > 100
                            ? broadcast.text.substring(0, 100) + "..."
                            : broadcast.text}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{broadcast.recipients} получателей</span>
                          {broadcast.sentAt && (
                            <span>Отправлено: {broadcast.sentAt}</span>
                          )}
                          {broadcast.scheduledAt && (
                            <span>Запланировано: {broadcast.scheduledAt}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Copy" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BroadcastPanel;
