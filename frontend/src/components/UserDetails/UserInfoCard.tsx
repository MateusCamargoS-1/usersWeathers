import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, User, X } from "lucide-react";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    lastLogin?: string;
    status: "active" | "inactive";
  };
  onEdit: () => void;
  onDelete: () => void;
  deleteLoading: boolean;
}

export const UserInfoCard = ({ user, onEdit, onDelete, deleteLoading }: Props) => {
  return (
    <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl text-gray-800 font-semibold">{user.name}</h2>
        <div className="flex justify-center mt-2">
          <Badge
            variant={user.status === 'active' ? 'default' : 'secondary'}
            className={user.status === 'active' ? 'bg-green-100 text-green-800' : ''}
          >
            {user.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <InfoItem icon={<Mail className="h-5 w-5 text-blue-600" />} label="Email" value={user.email} />
        <InfoItem
          icon={<Calendar className="h-5 w-5 text-green-600" />}
          label="Data de Cadastro"
          value={new Date(user.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          })}
        />
        {user.lastLogin && (
          <InfoItem
            icon={<User className="h-5 w-5 text-purple-600" />}
            label="Último Acesso"
            value={new Date(user.lastLogin).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          />
        )}
        <InfoItem
          icon={<User className="h-5 w-5 text-gray-600" />}
          label="ID do Usuário"
          value={`#${user.id}`}
        />
      </div>

      <div className="pt-6 border-t mt-6 flex gap-4">
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={deleteLoading}
          className="flex-1"
        >
          {deleteLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Excluindo...</span>
            </div>
          ) : (
            <>
              <X className="h-4 w-4 mr-2" />
              Excluir
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onEdit} className="flex-1">
          Editar
        </Button>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);
