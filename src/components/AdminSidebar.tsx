import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar = ({
  activeSection,
  onSectionChange,
}: AdminSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
    { id: "tickets", label: "Заявки", icon: "Ticket" },
    { id: "support", label: "Поддержка", icon: "MessageCircle" },
    { id: "integrations", label: "Интеграции", icon: "Plug" },
    { id: "analytics", label: "Аналитика", icon: "BarChart3" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">ServiceBot</h1>
            <p className="text-sm text-gray-500">Админ-панель</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200",
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon
                  name={item.icon as any}
                  size={20}
                  className={
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
