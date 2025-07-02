import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getUsers } from "@/services/userServices";
import { ResponsivePagination } from "@/components/ResponsivePagination";

import { UserSearchInput } from "@/components/UserList/UserSearchInput";
import { UserSkeletonList } from "@/components/UserList/UserSkeletonList";
import { UserEmptyState } from "@/components/UserList/UserEmptyState";
import { UserCard } from "@/components/UserList/UserCard";
import { User } from "@/types/UserType";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(searchTerm, searchTerm, page, limit);
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        toast({
          title: "Erro ao carregar usuários",
          description: "Não foi possível carregar os usuários.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchUsers, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, page, toast]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Gerenciamento de Usuários</h2>
            <p className="text-gray-600">Visualize, busque e gerencie todos os usuários cadastrados</p>
          </div>
          <Link to="/users/new">
            <Button className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </Link>
        </div>

        <Card className="mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Buscar Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <UserSearchInput value={searchTerm} onChange={(value) => {
              setPage(1);
              setSearchTerm(value);
            }} />
          </CardContent>
        </Card>

        {loading ? (
          <UserSkeletonList count={limit} />
        ) : users.length === 0 ? (
          <UserEmptyState searchTerm={searchTerm} />
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              {users.length} usuário{users.length !== 1 ? "s" : ""}
              {searchTerm && ` para "${searchTerm}"`}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <ResponsivePagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Users;
