import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ErrorMessage = ({ message }: { message: string }) => (
  <Card className="bg-red-100 border border-red-500 p-4 mt-4">
    <div className="flex items-center space-x-2 text-red-700">
      <AlertTriangle className="w-6 h-6" />
      <span>{message}</span>
    </div>
  </Card>
);
