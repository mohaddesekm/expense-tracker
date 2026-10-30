import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import {
    Wallet,
    LayoutDashboard,
    ArrowLeftRight,
    Tags,
    ChartNoAxesCombined,
    Settings,
    Sun,
    Moon,
    UserRound,
    PanelLeftClose,
    PanelLeftOpen,
    X,
    Languages,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

type MenuItem = {
    id: 'dashboard' | 'transactions' | 'categories' | 'reports' | 'settings';
    label: string;
    icon: typeof LayoutDashboard;
    href: string;
};

type SideMenuProps = {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isMobileOpen: boolean;
    onCloseMobile: () => void;
};

const menuItem: MenuItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/',
    },
    {
        id: 'transactions',
        label: 'Transactions',
        icon: ArrowLeftRight,
        href: 'transactions',
    },
    {
        id: 'categories',
        label: 'Categories',
        icon: Tags,
        href: '/categories',
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: ChartNoAxesCombined,
        href: '/reports',
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];

export default function SideMenu({
    isCollapsed,
    onToggleCollapse,
    isMobileOpen,
    onCloseMobile,
}: SideMenuProps) {
    const [isDark, setIsDard] = useState(() => {
        const savedTheme = localStorage.getItem('theme');

        return savedTheme === 'dark';
    });

    const isPersian = i18n.resolvedLanguage?.startsWith('fa') ?? false;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const handleThemeToggle = () => {
        setIsDard((prev) => !prev);
    };

    const handleLanguageToggle = () => {
        void i18n.changeLanguage(isPersian ? 'en' : 'fa');
    };

    const { t } = useTranslation();

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onCloseMobile}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-dvh flex-col border-r border-slate-200 bg-white text-slate-800 shadow-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-800 md:sticky md:top-0 md:translate-x-0 md:shadow-none
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'md:w-20' : 'w-72 md:w-64'}
                `}
            >
                {/* Header */}
                <div className="flex min-h-24 items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Wallet size={25} />
                    </div>

                    <div
                        className={`min-w-0 flex-1 ${isCollapsed ? 'md:hidden' : ''}`}
                    >
                        <h2 className="truncate text-lg font-bold dark:text-white text-slate-900">
                            Pennywise
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {t('tagline')}
                        </p>
                    </div>

                    {/* Collapse button: desktop */}
                    <button
                        type="button"
                        aria-label={
                            isCollapsed
                                ? t('expandSidebar')
                                : t('collapseSidebar')
                        }
                        onClick={onToggleCollapse}
                        className={`hidden md:inline-flex rounded-lg p-2 text-slate-500 transition duration-300 bg-white border-t border-b ${isPersian ? 'border-l' : 'border-r'} border-slate-300 dark:border-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:text-white cursor-pointer`}
                    >
                        {isCollapsed ? <PanelLeftClose /> : <PanelLeftOpen />}
                    </button>

                    {/* Close button: mobile */}
                    <button
                        type="button"
                        aria-label={t('closeMenu')}
                        className="rounded-lg p-2 text-slate-500 transition duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden cursor-pointer"
                        onClick={onCloseMobile}
                    >
                        <X size={21} />
                    </button>
                </div>

                {/* Navigation */}
                <nav
                    aria-label={t('mainNavigation')}
                    className="flex-1 space-y-2 overflow-y-auto scrollbar-hide p-3"
                >
                    <p
                        className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 ${
                            isCollapsed ? 'hidden' : ''
                        }`}
                    >
                        {t('menu')}
                    </p>

                    {menuItem.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.id}
                                to={item.href}
                                end={item.href === '/'}
                                onClick={onCloseMobile}
                                title={isCollapsed ? item.label : undefined}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-3 py-3 transition duration-300 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
                                    } ${isCollapsed ? 'md:justify-center' : ''}`
                                }
                            >
                                <Icon size={21} className="shrink-0" />
                                <span
                                    className={isCollapsed ? 'md:hidden' : ''}
                                >
                                    {t(item.id)}
                                </span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Language toggle */}
                <div className="border-t border-slate-200 p-3 dark:border-slate-700">
                    <button
                        type="button"
                        title={isCollapsed ? t('changeLanguage') : undefined}
                        aria-label={t('changeLanguage')}
                        onClick={handleLanguageToggle}
                        className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 ${
                            isCollapsed ? 'md:justify-center' : ''
                        }`}
                    >
                        <Languages size={21} className="shrink-0" />

                        <span className={isCollapsed ? 'md:hidden' : ''}>
                            {isPersian ? 'English' : 'فارسی'}
                        </span>
                    </button>
                </div>

                {/* Theme toggle */}
                <div className="border-t border-slate-200 p-3 dark:border-slate-700">
                    <button
                        type="button"
                        title={
                            isCollapsed
                                ? t(isDark ? 'lightMode' : 'darkMode')
                                : undefined
                        }
                        aria-label={t(
                            isDark ? 'switchToLightMode' : 'switchToDarkMode',
                        )}
                        onClick={handleThemeToggle}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 cursor-pointer ${
                            isCollapsed ? 'md:justify-center' : ''
                        }`}
                    >
                        {isDark ? (
                            <Sun size={21} className="shrink-0" />
                        ) : (
                            <Moon size={21} className="shrink-0" />
                        )}
                        <span className={isCollapsed ? 'md:hidden' : ''}>
                            {t(isDark ? 'lightMode' : 'darkMode')}
                        </span>
                    </button>
                </div>

                {/* User profile */}
                <div className="border-t border-slate-200 p-3 dark:border-slate-700">
                    <div
                        className={`flex items-center gap-3 rounded-xl p-2 ${isCollapsed ? 'md:justify-center' : ''}`}
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                            <UserRound />
                        </div>
                        <div
                            className={`min-w-0 flex-1 ${isCollapsed ? 'md:hidden' : ''}`}
                        >
                            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {t('yourName')}
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                you@example.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
