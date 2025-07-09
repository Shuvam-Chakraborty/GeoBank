// App.jsx
import React from "react";
import './index.css'
import MainDashboard from "./MainDashBoard";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900 drop-shadow-sm">
          🌐 GeoBank Insights Dashboard
        </h1>
        <MainDashboard />
      </div>
    </div>
  );
}
