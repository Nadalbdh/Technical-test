import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../context/UserContext';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state } = useUserContext();

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('bg-gray-800');
    document.body.classList.toggle('text-white');
  };

  return (
    <header className="flex justify-between items-center px-4 py-6">
      <Link to="/" className="text-2xl font-bold">
        User
      </Link>
      <div className="flex items-center">
        <button
          className="p-1 text-gray-700 dark:text-gray-300"
          onClick={handleDarkModeToggle}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <span className="ml-4 text-gray-700 dark:text-gray-300">
          {state.user ? `Hello, ${state.user.username}` : 'Guest'}
        </span>
        {/* Add other user-related components or actions here */}
      </div>
    </header>
  );
}

export default Header;
