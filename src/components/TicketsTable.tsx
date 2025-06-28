import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const TicketsTable = () => {
  const tickets = [
    {
      id: "#1247",
      user: "Александр К.",
      subject: "Проблема с интеграцией API",
      status: "open",
      priority: "high",
      created: "2 часа назад",
      assignee: "Мария С.",
    },
    {
      id: "#1246",
      user: "Елена М.",
      subject: "Вопрос по настройке бота",
      status: "in-progress",
      priority: "medium",
      created: "4 часа назад",
      assignee: "Дмитрий А.",
    },
    {
      id: "#1245",
      user: "Игорь П.",
      subject: "Запрос на новую функцию",
      status: "pending",
      priority: "low",
      created: "6 часов назад",
      assignee: "Не назначен",
    },
    {
      id: "#1244",
      user: "Анна В.",
      subject: "Ошибка в работе webhook",
      status: "resolved",
      priority: "high",
      created: "1 день назад",
      assignee: "Сергей К.",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      open: { variant: "destructive" as const, label: "Открыта" },
      "in-progress": { variant: "default" as const, label: "В работе" },
      pending: { variant: "secondary" as const, label: "Ожидает" },
      resolved: { variant: "outline" as const, label: "Решена" },
    };

    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    const colors = {
      high: "text-red-500",
      medium: "text-yellow-500",
      low: "text-green-500",
    };

    return (
      <Icon
        name="AlertCircle"
        size={16}
        className={colors[priority as keyof typeof colors]}
      />
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Активные заявки
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Icon name="Plus" size={16} />
            <span>Новая заявка</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID / Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тема
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Приоритет
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Исполнитель
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Создана
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {ticket.id}
                    </div>
                    <div className="text-sm text-gray-500">{ticket.user}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {ticket.subject}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(ticket.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    {getPriorityIcon(ticket.priority)}
                    <span className="text-sm text-gray-700 capitalize">
                      {ticket.priority}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ticket.assignee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ticket.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsTable;
