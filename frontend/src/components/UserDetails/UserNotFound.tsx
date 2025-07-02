import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";

export const UserNotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
    <Card className="text-center p-8 border-0 shadow-lg">
      <CardContent>
        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Usuário não encontrado</h2>
        <p className="text-gray-500 mb-4">O usuário solicitado não existe ou foi removido.</p>
        <Link to="/users">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Usuários
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);
