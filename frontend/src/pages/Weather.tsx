import { useState } from "react";
import { MapPin, AlertTriangle, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FlyToCity from "@/components/FlyToCity";
import { getWeatherByCity } from "@/services/weatherService";
import brazilianCities from "@/utils/cities";

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  alerts: string[];
  hourlyData: Array<{ time: string; temp: number; hour: string }>;
  lat: number;
  lon: number;
}

const CitySelector = ({
  cities,
  selectedCity,
  onSelectCity,
}: {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}) => (
  <Card className="mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-gray-600" />
        <span>Selecionar Cidade</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Select
        value={selectedCity}
        onValueChange={onSelectCity}
        aria-label="Selecionar cidade brasileira"
      >
        <SelectTrigger className="w-full bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400">
          <SelectValue placeholder="Escolha uma cidade brasileira..." />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardContent>
  </Card>
);

const WeatherStats = ({
  temperature,
  description,
  humidity,
  windSpeed,
  visibility,
}: {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
}) => (
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

const WeatherAlerts = ({ alerts }: { alerts: string[] }) => {
  if (!alerts.length) return null;

  return (
    <Card className="mb-6 border-l-4 border-l-orange-500 bg-orange-50/80 backdrop-blur-sm">
      <CardContent className="pt-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-800 mb-1">Alerta Meteorológico</h3>
            {alerts.map((alert, index) => (
              <p key={index} className="text-orange-700">{alert}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TemperatureChart = ({
  city,
  hourlyData,
}: {
  city: string;
  hourlyData: Array<{ time: string; temp: number; hour: string }>;
}) => (
  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <svg
          className="h-5 w-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span>Variação de Temperatura - {city}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} domain={["dataMin - 2", "dataMax + 2"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelFormatter={(value) => `Horário: ${value}`}
              formatter={(value: number) => [`${value.toFixed(1)}°C`, "Temperatura"]}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#1d4ed8", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const WeatherMap = ({
  lat,
  lon,
  city,
  description,
}: {
  lat: number;
  lon: number;
  city: string;
  description: string;
}) => (
  <div
    style={{
      height: "400px",
      width: "100%",
      marginTop: "2rem",
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
    <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          {city} <br /> {description}
        </Popup>
      </Marker>
      <FlyToCity lat={lat} lon={lon} />
    </MapContainer>
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="animate-pulse border-0 shadow-lg">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const EmptyState = () => (
  <Card className="text-center py-12 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
    <CardContent>
      <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecione uma cidade</h3>
      <p className="text-gray-500">
        Escolha uma cidade brasileira para visualizar os dados climáticos em tempo real
      </p>
    </CardContent>
  </Card>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <Card className="bg-red-100 border border-red-500 p-4 mt-4">
    <div className="flex items-center space-x-2 text-red-700">
      <AlertTriangle className="w-6 h-6" />
      <span>{message}</span>
    </div>
  </Card>
);

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCitySelect = async (city: string) => {
    setSelectedCity(city);
    setLoading(true);
    setWeatherData(null);
    setError(null);

    try {
      const result = await getWeatherByCity(city);
      const apiData = result.data;

      const current = apiData.current;
      const forecastHours = apiData.forecast.forecastday[0].hour;

      const mappedData: WeatherData = {
        city: city,
        temperature: Math.round(current.temp_c),
        humidity: current.humidity,
        description: current.condition.text,
        windSpeed: current.wind_kph,
        visibility: current.vis_km,
        uvIndex: current.uv,
        alerts: apiData.alerts?.alert?.map((a: any) => a.headline) || [],
        hourlyData: forecastHours.map((hour: any) => ({
          time: hour.time.split(" ")[1],
          temp: hour.temp_c,
          hour: `${new Date(hour.time).getHours()}h`,
        })),
        lat: apiData.location.lat,
        lon: apiData.location.lon,
      };

      setWeatherData(mappedData);
    } catch (error) {
      setError("Erro ao buscar dados meteorológicos. Por favor, tente novamente.");
      console.error(error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Dados Climáticos</h2>
          <p className="text-gray-600">
            Consulte informações meteorológicas em tempo real das principais cidades brasileiras
          </p>
        </div>

        <CitySelector cities={brazilianCities} selectedCity={selectedCity} onSelectCity={handleCitySelect} />

        {loading && <LoadingSkeleton />}

        {error && <ErrorMessage message={error} />}

        {!selectedCity && !loading && !error && <EmptyState />}

        {weatherData && !loading && !error && (
          <>
            <WeatherAlerts alerts={weatherData.alerts} />
            <WeatherStats
              temperature={weatherData.temperature}
              description={weatherData.description}
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              visibility={weatherData.visibility}
            />
            <TemperatureChart city={weatherData.city} hourlyData={weatherData.hourlyData} />
            <WeatherMap
              lat={weatherData.lat}
              lon={weatherData.lon}
              city={weatherData.city}
              description={weatherData.description}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Weather;