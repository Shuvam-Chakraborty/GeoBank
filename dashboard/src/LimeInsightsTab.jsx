import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const LimeInsightsTab = () => {
  const [limeData, setLimeData] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/lime_explanations")
      .then((res) => res.json())
      .then((data) => {
        console.log("LIME response:", data);
        if (Array.isArray(data)) {
          setLimeData(data);
        } else if (Array.isArray(data?.summaries)) {
          setLimeData(data.summaries);
        } else {
          console.error("Unexpected LIME data format:", data);
          setLimeData([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load LIME summaries:", err);
      });
  }, []);

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">LIME Explanations for Top 10 Branches</h2>

      {limeData.length === 0 && (
        <p className="text-gray-500 text-sm">No LIME explanations available.</p>
      )}

      {limeData.map((entry) => (
        <Card key={entry.index} className="shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">
                Branch #{entry.index} | Predicted Log(Deposits):{" "}
                {entry.predicted_log_deposit?.toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpand(entry.index)}
              >
                {expanded[entry.index] ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>

            {expanded[entry.index] && Array.isArray(entry.explanation) && (
              <div className="mt-3">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pr-4 py-1">Feature</th>
                      <th className="py-1">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.explanation.map((e, i) => (
                      <tr key={i} className="border-b">
                        <td className="pr-4 py-1 whitespace-nowrap">{e.feature}</td>
                        <td className="py-1">{e.weight.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a
                  href={`http://localhost:8000/lime_html/${entry.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  View HTML Explanation
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LimeInsightsTab;
