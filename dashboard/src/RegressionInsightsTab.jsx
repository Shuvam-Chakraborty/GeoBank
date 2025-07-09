import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const RegressionInsightsTab = () => {
  const [regressionResults, setRegressionResults] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/regression_results")
      .then((res) => res.json())
      .then((data) => setRegressionResults(data))
      .catch((err) => console.error("Failed to load regression results", err));
  }, []);

  if (!regressionResults) return <div>Loading regression insights...</div>;

  return (
    <div className="grid gap-4 p-4">
      <h2 className="text-xl font-semibold">Regression Model Summary</h2>
      <Card>
        <CardContent className="space-y-2 p-4">
          <p><strong>RMSE:</strong> {regressionResults["RMSE"].toLocaleString()}</p>
          <p><strong>RMSLE:</strong> {regressionResults["RMSLE"]}</p>
          <p><strong>R² Score:</strong> {regressionResults["R^2"]}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegressionInsightsTab;
