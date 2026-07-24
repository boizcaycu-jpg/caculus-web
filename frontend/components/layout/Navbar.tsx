'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, User as UserIcon, ShieldAlert, Award, FileText, Phone, LayoutDashboard, Menu, X } from 'lucide-react';
import { TokenPayload } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  // Hide main nav in exam room mode for full immersion
  if (pathname.includes('/room')) {
    return null;
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="bg-crimson text-white font-extrabold text-2xl tracking-tighter px-3 py-1 rounded-md shadow-xs">
              CACULUS
            </span>
            <div className="hidden sm:flex flex-col border-l border-slate-300 pl-3">
              <span className="text-xs font-bold text-slate-800 tracking-wider">TSA EXAMINATION</span>
              <span className="text-[10px] text-slate-500 font-medium">ĐÁNH GIÁ TƯ DUY NĂNG LỰC</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              pathname === '/dashboard' ? 'text-crimson' : 'text-slate-600 hover:text-crimson'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Tổng quan
          </Link>
          <Link
            href="/exams"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              pathname.startsWith('/exams') ? 'text-crimson' : 'text-slate-600 hover:text-crimson'
            }`}
          >
            <FileText className="w-4 h-4" />
            Phòng khảo thí
          </Link>
          <Link
            href="/documents"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              pathname === '/documents' ? 'text-crimson' : 'text-slate-600 hover:text-crimson'
            }`}
          >
            <FileText className="w-4 h-4" />
            Tài liệu
          </Link>
          <Link
            href="/leaderboard"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              pathname === '/leaderboard' ? 'text-crimson' : 'text-slate-600 hover:text-crimson'
            }`}
          >
            <Award className="w-4 h-4" />
            Bảng xếp hạng
          </Link>
          <Link
            href="/contact"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              pathname === '/contact' ? 'text-crimson' : 'text-slate-600 hover:text-crimson'
            }`}
          >
            <Phone className="w-4 h-4" />
            Liên hệ
          </Link>

          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm font-bold text-amber-700 bg-amber-50 border border-amber-300 px-3 py-1 rounded-md hover:bg-amber-100 transition"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Admin Panel
            </Link>
          )}
        </nav>

        {/* User Account Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-800">{user.name}</div>
                <div className="text-[11px] font-mono text-slate-500">{user.studentId} • {user.role.toUpperCase()}</div>
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-2 text-slate-500 hover:text-crimson hover:bg-rose-50 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-crimson hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow-xs"
            >
              Đăng nhập
            </Link>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-crimson focus:outline-none"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
          <Link href="/dashboard" className="block text-slate-700 font-medium py-2">Tổng quan</Link>
          <Link href="/exams" className="block text-slate-700 font-medium py-2">Phòng khảo thí</Link>
          <Link href="/documents" className="block text-slate-700 font-medium py-2">Tài liệu ôn tập</Link>
          <Link href="/leaderboard" className="block text-slate-700 font-medium py-2">Bảng xếp hạng</Link>
          <Link href="/contact" className="block text-slate-700 font-medium py-2">Liên hệ trợ giúp</Link>
          {user?.role === 'admin' && (
            <Link href="/admin" className="block text-amber-700 font-bold py-2">Quản trị Admin</Link>
          )}
        </div>
      )}
    </header>
  );
}
