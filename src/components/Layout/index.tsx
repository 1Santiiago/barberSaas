"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const LayoutComponent = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/clients", label: "Clientes" },
    { to: "/appointments", label: "Agendamentos" },
    { to: "/plans", label: "Planos" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
            Barber<span className="text-gray-900 dark:text-gray-100">Plus</span>
          </div>

          {/* MENU DESKTOP */}
          <nav className="md:hidden flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300 max-[750px]:hidden">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-colors ${
                  location.pathname === to
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* BOTÃO MOBILE */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Abrir menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <nav className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col p-6 gap-6 animate-slide-in md:hidden">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Menu
              </span>
              <button
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`block transition-colors text-base ${
                    location.pathname === to
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 transition-all">
        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm p-4 sm:p-6 transition-colors">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-center py-4 text-sm">
        BarberPlus &copy; {new Date().getFullYear()} — Todos os direitos
        reservados.
      </footer>
    </div>
  );
};
