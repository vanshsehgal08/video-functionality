import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import NavLinks from './NavLinks';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-green-600 dark:bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="font-bold text-xl">GreenQuest</span>
          </Link>
          <div className="flex items-center space-x-4">
            <NavLinks currentPath={location.pathname} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
