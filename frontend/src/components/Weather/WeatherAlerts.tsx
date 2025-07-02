import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  alerts: string[];
}

export const WeatherAlerts = ({ alerts }: Props) => {
  if (!alerts.length) return null;

  return (
    <Card className="mb-6 border-l-4 border-l-orange-500 bg-orange-50/80 backdrop-blur-sm">
      <CardContent className="pt-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-800 mb-1">Alerta Meteorológico</h3>
            {alerts.map((alert, i) => (
              <p key={i} className="text-orange-700">{alert}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
