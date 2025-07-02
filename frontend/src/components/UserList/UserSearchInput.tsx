import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const UserSearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Buscar por nome ou email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400"
      />
    </div>
  );
};
