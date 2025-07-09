import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const AnomalyInsightsTab = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/anomaly_summary")
      .then((res) => res.json())
      .then(setSummary)
      .catch((err) =>
        console.error("Failed to load anomaly summary:", err)
      );
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Anomaly Summary</h2>
      <p>Total Branches: {summary.total_branches}</p>
      <p>
        Detected Anomalies: {summary.anomaly_count} (
        {summary.anomaly_percentage}%)
      </p>
      <h3 className="text-lg font-medium mt-4">Top Anomalies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summary.top_anomalies.map((anomaly, index) => (
          <Card key={index}>
            <CardContent>
              <p>
                <b>Bank:</b> {anomaly.bank_name}
              </p>
              <p>
                <b>Lat/Lon:</b> {anomaly.latitude}, {anomaly.longitude}
              </p>
              <p>
                <b>Total Deposits:</b> ${anomaly.total_deposits.toLocaleString()}
              </p>
              <p>
                <b>Anomaly Score:</b> {anomaly.anomaly_score.toFixed(4)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnomalyInsightsTab;
