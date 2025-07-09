import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const ClassificationInsightsTab = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/classification_results")
      .then((res) => res.json())
      .then(setResults)
      .catch((err) => console.error("Failed to load classification results:", err));
  }, []);

  if (!results) return <div>Loading...</div>;

  const report = results.classification_report;

  // Get keys that are class labels (not avg or accuracy)
  const labelKeys = Object.keys(report).filter(
    (key) => key !== "accuracy" && !key.includes("avg")
  );

  return (
    <div className="grid gap-4 p-4">
      <h2 className="text-xl font-bold">Classification Summary</h2>

      <Card>
        <CardContent className="p-4">
          <p><strong>Accuracy:</strong> {report.accuracy}</p>
          <p><strong>ROC AUC:</strong> {results.roc_auc}</p>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold mt-4">Classification Report</h3>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">Label</th>
              <th className="border px-2 py-1">Precision</th>
              <th className="border px-2 py-1">Recall</th>
              <th className="border px-2 py-1">F1 Score</th>
              <th className="border px-2 py-1">Support</th>
            </tr>
          </thead>
          <tbody>
            {labelKeys.map((label) => (
              <tr key={label}>
                <td className="border px-2 py-1">{label}</td>
                <td className="border px-2 py-1">{report[label]["precision"]}</td>
                <td className="border px-2 py-1">{report[label]["recall"]}</td>
                <td className="border px-2 py-1">{report[label]["f1-score"]}</td>
                <td className="border px-2 py-1">{report[label]["support"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassificationInsightsTab;
