import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

export const WeatherStats = ({
  temperature,
  description,
  humidity,
  windSpeed,
  visibility,
}: Props) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-orange-800">
          <Thermometer className="h-5 w-5" />
          <span>Temperatura</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-orange-900">{temperature}°C</p>
        <p className="text-sm text-orange-700">{description}</p>
      </CardContent>
    </Card>

    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Droplets className="h-5 w-5" />
          <span>Umidade</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-blue-900">{humidity}%</p>
        <p className="text-sm text-blue-700">Umidade relativa</p>
      </CardContent>
    </Card>

    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-green-800">
          <Wind className="h-5 w-5" />
          <span>Vento</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-green-900">{windSpeed}</p>
        <p className="text-sm text-green-700">km/h</p>
      </CardContent>
    </Card>

    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-purple-800">
          <Eye className="h-5 w-5" />
          <span>Visibilidade</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-purple-900">{visibility}</p>
        <p className="text-sm text-purple-700">km</p>
      </CardContent>
    </Card>
  </div>
);
