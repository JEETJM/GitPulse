import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">GitPulse</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="glass rounded-full p-3"
        >
          {darkMode ?
            <Sun size={22} />
          : <Moon size={22} />}
        </button>
      </div>
    </nav>
  );
}
