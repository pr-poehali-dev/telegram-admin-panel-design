import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import DashboardStats from "@/components/DashboardStats";
import TicketsTable from "@/components/TicketsTable";
import ActivityChart from "@/components/ActivityChart";
import IntegrationsPanel from "@/components/IntegrationsPanel";
import BroadcastPanel from "@/components/BroadcastPanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ActivityChart />
              <IntegrationsPanel />
            </div>
            <TicketsTable />
          </div>
        );
      case "tickets":
        return <TicketsTable />;
      case "broadcasts":
        return <BroadcastPanel />;
      case "integrations":
        return <IntegrationsPanel />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Раздел "{activeSection}" в разработке
            </h2>
            <p className="text-gray-500">
              Скоро здесь появится новый функционал
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeSection === "dashboard" && "Дашборд"}
                {activeSection === "tickets" && "Заявки"}
                {activeSection === "support" && "Поддержка"}
                {activeSection === "broadcasts" && "Рассылки"}
                {activeSection === "integrations" && "Интеграции"}
                {activeSection === "analytics" && "Аналитика"}
              </h1>
              <p className="text-gray-500 mt-1">
                Управление сервисным ботом и обработка заявок
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">АД</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto h-full">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Index;
