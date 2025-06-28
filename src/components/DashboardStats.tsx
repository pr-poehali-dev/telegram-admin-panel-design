import Icon from "@/components/ui/icon";

const DashboardStats = () => {
  const stats = [
    {
      title: "Всего заявок",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "Ticket",
    },
    {
      title: "Активные чаты",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: "MessageCircle",
    },
    {
      title: "Интеграции",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: "Plug",
    },
    {
      title: "Среднее время ответа",
      value: "2.4 мин",
      change: "-8%",
      changeType: "positive",
      icon: "Clock",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon
                name={stat.icon as any}
                size={24}
                className="text-blue-600"
              />
            </div>
            <span
              className={`text-sm font-medium ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            {stat.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
