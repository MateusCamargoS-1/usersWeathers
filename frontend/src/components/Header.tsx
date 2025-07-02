import { Link } from "react-router-dom";
import { Cloud, Home, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600 bg-clip-text">
              Users & Weather
            </h1>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end items-center gap-2">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Button>
            </Link>
            <Link to="/users">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 bg-blue-100 text-blue-700"
              >
                <UsersIcon className="h-4 w-4" />
                <span>Usuários</span>
              </Button>
            </Link>
            <Link to="/weather">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Cloud className="h-4 w-4" />
                <span>Clima</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
