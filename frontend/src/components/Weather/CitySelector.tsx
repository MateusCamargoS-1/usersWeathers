import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CitySelector = ({ cities, selectedCity, onSelectCity }: Props) => (
  <div className="mb-8">
    <div className="bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-lg">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-700">Selecionar Cidade</h3>
      </div>
      <div className="p-4">
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
      </div>
    </div>
  </div>
);
