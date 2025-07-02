import { Card, CardContent } from "@/components/ui/card";
import { Cloud } from "lucide-react";

export const EmptyState = () => (
  <Card className="text-center py-12 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
    <CardContent>
      <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecione uma cidade</h3>
      <p className="text-gray-500">
        Escolha uma cidade brasileira para visualizar os dados climáticos em tempo real
      </p>
    </CardContent>
  </Card>
);
