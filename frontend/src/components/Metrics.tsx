import { useEffect, useState } from "react";
import { fetchTimeMetrics, TimeMetricsResponse } from "../api/api";
import { Card, CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { useTodoContext } from "../context/TodoContext";

export const TimeMetrics = () => {
  const [metrics, setMetrics] = useState<TimeMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const { todos } = useTodoContext();

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await fetchTimeMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching time metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [todos]); // Re-fetch metrics when todos change
  // This ensures that the metrics are updated whenever the todo list changes

  if (loading) return <p>Loading...</p>;
  if (!metrics) return <p>No data available.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      <Card>
        <CardContent>
          <Typography variant="h6">Overall</Typography>
          <Typography>{metrics.overall}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Low</Typography>
          <Typography>{metrics.low}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Medium</Typography>
          <Typography>{metrics.medium}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">High</Typography>
          <Typography>{metrics.high}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
