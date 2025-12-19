/**
 * Public Layout
 * Layout para páginas públicas (landing page, sobre, etc)
 */

import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Public Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Health Pro
            </span>
          </Link>
          
          <nav className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Começar Grátis
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Public Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>© 2024 Health Pro. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Consulte sempre seu médico antes de iniciar qualquer tratamento.
          </p>
        </div>
      </footer>
    </>
  );
}
