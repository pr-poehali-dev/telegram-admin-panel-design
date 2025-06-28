import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ActivityChart = () => {
  const data = [
    { name: "Пн", requests: 45, resolved: 40 },
    { name: "Вт", requests: 52, resolved: 48 },
    { name: "Ср", requests: 38, resolved: 35 },
    { name: "Чт", requests: 61, resolved: 55 },
    { name: "Пт", requests: 55, resolved: 50 },
    { name: "Сб", requests: 32, resolved: 30 },
    { name: "Вс", requests: 28, resolved: 25 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Активность за неделю
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Bar dataKey="requests" fill="#1976D2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" fill="#0288D1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Заявки</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Решено</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
