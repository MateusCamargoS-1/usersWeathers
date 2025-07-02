import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export const UserCard = ({ user }: { user: User }) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg text-gray-800 truncate">{user.name}</span>
          <Badge variant="secondary" className="ml-2">#{user.id}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-700 truncate">{user.email}</p>
          </div>
          {user.createdAt && (
            <div>
              <p className="text-sm text-gray-500">Cadastrado em</p>
              <p className="text-gray-700">
                {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          )}
          <Link to={`/users/${user.id}`} className="block">
            <Button
              variant="outline"
              className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
