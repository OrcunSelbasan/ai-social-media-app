import { Link, Outlet, useLocation } from 'react-router-dom';
import { Bell, Home, Search, User, PlusSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-primary">Connect</Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home className={`h-5 w-5 ${currentPath === '/' ? 'text-primary' : 'text-gray-500'}`} />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="ghost" size="icon">
                  <Search className={`h-5 w-5 ${currentPath === '/search' ? 'text-primary' : 'text-gray-500'}`} />
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="ghost" size="icon">
                  <PlusSquare className={`h-5 w-5 ${currentPath === '/create' ? 'text-primary' : 'text-gray-500'}`} />
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className={`h-5 w-5 ${currentPath === '/notifications' ? 'text-primary' : 'text-gray-500'}`} />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className={`h-5 w-5 ${currentPath === '/profile' ? 'text-primary' : 'text-gray-500'}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;