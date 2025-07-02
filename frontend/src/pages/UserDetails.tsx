import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Calendar, User, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { deleteUser, getUserById, updateUser } from "@/services/userServices";

import { UserSkeleton } from "@/components/UserDetails/UserSkeleton";
import { UserNotFound } from "@/components/UserDetails/UserNotFound";
import { UserEditModal } from "@/components/UserDetails/UserEditModal";
import { DeleteUserDialog } from "@/components/UserDetails/DeleteUserDialog";

interface UserDetailsData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
}

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteUser = async () => {
    if (!user) return;
    setDeleteError(null);
    setDeleting(true);

    try {
      await deleteUser(user.id);
      setOpenDialog(false);
      alert('Usuário excluído com sucesso.');
      navigate('/users');
    } catch (error) {
      console.error(error);
      setDeleteError('Erro ao excluir usuário. Por favor, tente novamente.');
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(false);

      getUserById(id)
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          setUser(null);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Nome é obrigatório");
      return false;
    }
    if (name.trim().length < 2) {
      setNameError("Nome deve ter pelo menos 2 caracteres");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName() || !user) return;

    setFormLoading(true);
    try {
      const updatedUser = await updateUser(user.id, { name });
      setUser({ ...user, ...updatedUser });
      setIsModalOpen(false);
    } catch {
      alert("Erro ao atualizar usuário, tente novamente.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <UserSkeleton />;
  if (error || !user) return <UserNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/users" className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para Usuários</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">{user.name}</CardTitle>
              <div className="flex justify-center mt-2">
                <Badge
                  variant={user.status === 'active' ? 'default' : 'secondary'}
                  className={user.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                >
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <UserInfoItem
                    icon={<Mail className="h-5 w-5 text-blue-600" />}
                    label="Email"
                    value={user.email}
                    bgColor="bg-blue-50"
                    iconBg="bg-blue-100"
                  />

                  <UserInfoItem
                    icon={<Calendar className="h-5 w-5 text-green-600" />}
                    label="Data de Cadastro"
                    value={new Date(user.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                    bgColor="bg-green-50"
                    iconBg="bg-green-100"
                  />

                  {user.lastLogin && (
                    <UserInfoItem
                      icon={<User className="h-5 w-5 text-purple-600" />}
                      label="Último Acesso"
                      value={new Date(user.lastLogin).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                      bgColor="bg-purple-50"
                      iconBg="bg-purple-100"
                    />
                  )}

                  <UserInfoItem
                    icon={<User className="h-5 w-5 text-gray-600" />}
                    label="ID do Usuário"
                    value={`#${user.id}`}
                    bgColor="bg-gray-50"
                    iconBg="bg-gray-100"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <Button variant="destructive"
                      className="flex-1"
                      onClick={() => setOpenDialog(true)}
                      disabled={deleteLoading}
                      aria-label="Excluir usuário" >
                      {deleteLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Excluindo...</span>
                        </div>
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Excluir Usuário
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => {
                      setName(user.name);
                      setIsModalOpen(true);
                    }}>
                      Editar Usuário
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <UserEditModal
        open={isModalOpen}
        name={name}
        onChangeName={setName}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        nameError={nameError}
        loading={formLoading}
      />

      <DeleteUserDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onConfirm={handleDeleteUser}
        deleting={deleting}
        error={deleteError}
        userName={user.name}
      />
    </div>
  );
};

const UserInfoItem = ({
  icon,
  label,
  value,
  bgColor,
  iconBg
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  iconBg: string;
}) => (
  <div className={`flex items-center space-x-3 p-4 rounded-lg ${bgColor}`}>
    <div className={`p-2 rounded-lg ${iconBg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default UserDetails;
