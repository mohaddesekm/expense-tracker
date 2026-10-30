import './App.css';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router';

import SideMenu from './components/SideMenu';

import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { Menu } from 'lucide-react';

export default function App() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedCollapsed = localStorage.getItem('sidebarCollapsed');

        return savedCollapsed === 'true';
    });

    useEffect(() => {
        localStorage.setItem(
            'sidebarCollapsed',
            isCollapsed ? 'true' : 'false',
        );
    }, [isCollapsed]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 md:flex">
            <SideMenu
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />

            <div className="min-w-0 flex-1">
                {/* Mobile header */}
                <header
                    dir="ltr"
                    className="fixed inset-x-0 top-0 z-40 flex items-center border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:hidden"
                >
                    <button
                        type="button"
                        aria-label="Open navigation menu"
                        onClick={() => setIsMobileOpen(true)}
                        className="rounded-lg px-2.5 py-2 text-slate-700 transition duration-300 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                    >
                        <Menu />
                    </button>
                    <span className="ml-3 font-semibold text-slate-900 dark:text-white">
                        Pennywise
                    </span>
                </header>

                {/* Page content */}
                <div className="pt-17.5 md:pt-0">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route
                            path="/transactions"
                            element={<TransactionsPage />}
                        />
                        <Route
                            path="/categories"
                            element={<CategoriesPage />}
                        />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route
                            path="*"
                            element={
                                <main className="p-6 text-slate-900 dark:text-white flex flex-col items-center">
                                    <h1 className="text-2xl font-bold">
                                        404 - Page Not Found
                                    </h1>
                                    <p className="mt-2 mb-18 text-slate-500 dark:text-slate-400">
                                        The page you are looking for does not
                                        exist.
                                    </p>

                                    <Link
                                        to="/"
                                        className="w-40 text-center cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                </main>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
