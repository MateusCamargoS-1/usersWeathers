import { Link } from "react-router-dom";
import { Users, Cloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-blue-600 bg-clip-text">
            Sistema de Usuários e Clima
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-blue-900">Gerenciamento de Usuários</CardTitle>
                  <CardDescription>Cadastre, visualize e gerencie usuários</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Sistema para cadastro e gerenciamento de usuários com filtros por nome e e-mail,
                busca em tempo real.
              </p>
              <Link to="/users">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Acessar Usuários
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-green-100/50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-green-900">Dados Climáticos</CardTitle>
                  <CardDescription>Informações meteorológicas em tempo real</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Consulte dados climáticos das cidades brasileiras com
                gráficos interativos.
              </p>
              <Link to="/weather">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Ver Clima
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Funcionalidades</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Cadastro de Usuários</h4>
              <p className="text-sm text-gray-600">Sistema completo de CRUD com validação</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Dados Meteorológicos</h4>
              <p className="text-sm text-gray-600">Informações em tempo real via API weatherapi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Gráficos Interativos</h4>
              <p className="text-sm text-gray-600">Visualização de dados com charts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Mapa Interativo</h4>
              <p className="text-sm text-gray-600">Visualização da cidade com Leaflet.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Index;
