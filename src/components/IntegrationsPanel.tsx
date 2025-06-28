import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";

const IntegrationsPanel = () => {
  const integrations = [
    {
      name: "Telegram Bot API",
      description: "Основное API для работы с Telegram",
      status: true,
      icon: "MessageSquare",
      lastSync: "2 мин назад",
    },
    {
      name: "Slack Integration",
      description: "Интеграция с рабочими каналами Slack",
      status: true,
      icon: "Hash",
      lastSync: "15 мин назад",
    },
    {
      name: "Discord Webhook",
      description: "Уведомления в Discord каналы",
      status: false,
      icon: "Gamepad2",
      lastSync: "Отключено",
    },
    {
      name: "Email Notifications",
      description: "SMTP для email уведомлений",
      status: true,
      icon: "Mail",
      lastSync: "1 час назад",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Интеграции</h2>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Icon name="Settings" size={16} />
            <span>Настроить</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name={integration.icon as any}
                    size={20}
                    className="text-gray-600"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {integration.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Последняя синхронизация: {integration.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${
                    integration.status
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      integration.status ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  <span>{integration.status ? "Активно" : "Отключено"}</span>
                </div>
                <Switch checked={integration.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPanel;
