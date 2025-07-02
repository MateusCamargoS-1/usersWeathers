import { Users as UsersIcon, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const UserEmptyState = ({ searchTerm }: { searchTerm: string }) => {
  const title = searchTerm ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado";
  const message = searchTerm
    ? "Tente ajustar os termos de busca"
    : "Comece cadastrando seu primeiro usuário";

  return (
    <Card className="text-center py-12 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
      <CardContent>
        <UsersIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{message}</p>
        {!searchTerm && (
          <Link to="/users/new">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Cadastrar Usuário
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
