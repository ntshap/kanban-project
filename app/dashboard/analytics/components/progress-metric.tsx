'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressMetricProps {
  title: string;
  value: number;
  target: number;
  description?: string;
}

export function ProgressMetric({
  title,
  value,
  target,
  description,
}: ProgressMetricProps) {
  const percentage = Math.min(Math.round((value / target) * 100), 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-sm text-muted-foreground">
          {value} / {target}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={percentage} />
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
