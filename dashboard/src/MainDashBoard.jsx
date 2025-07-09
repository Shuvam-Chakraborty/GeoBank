// MainDashboard.jsx

import React, { useState } from "react";
import {
  ShieldCheck,
  LineChart,
  AlertTriangle,
  SearchCheck,
} from "lucide-react";
import ClassificationInsightsTab from "./ClassificationInsightsTab";
import RegressionInsightsTab from "./RegressionInsightsTab";
import AnomalyInsightsTab from "./AnomalyInsightsTab";
import LimeInsightsTab from "./LimeInsightsTab";

const MainDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("classification");

  const tabs = [
    {
      key: "classification",
      label: "Classification",
      icon: <ShieldCheck className="w-4 h-4 mr-2" />,
    },
    {
      key: "regression",
      label: "Regression",
      icon: <LineChart className="w-4 h-4 mr-2" />,
    },
    {
      key: "anomaly",
      label: "Anomaly Detection",
      icon: <AlertTriangle className="w-4 h-4 mr-2" />,
    },
    {
      key: "lime",
      label: "LIME Explanations",
      icon: <SearchCheck className="w-4 h-4 mr-2" />,
    },
  ];

  const renderTab = () => {
    switch (selectedTab) {
      case "classification":
        return <ClassificationInsightsTab />;
      case "regression":
        return <RegressionInsightsTab />;
      case "anomaly":
        return <AnomalyInsightsTab />;
      case "lime":
        return <LimeInsightsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          GeoBank Model Insights Dashboard
        </h1>
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedTab === tab.key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {renderTab()}
      </div>
      <footer className="text-center text-sm text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} GeoBank Analytics
      </footer>
    </div>
  );
};

export default MainDashboard;
