import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Sidebar
            tagline: 'Manage your money wisely.',
            menu: 'Menu',
            closeMenu: 'Close navigation menu',
            expandSidebar: 'Expand sidebar',
            collapseSidebar: 'Collapse sidebar',
            mainNavigation: 'Main navigation',
            changeLanguage: 'Change language',
            lightMode: 'Light mode',
            darkMode: 'Dark mode',
            switchToLightMode: 'Switch to light mode',
            switchToDarkMode: 'Switch to dark mode',
            yourName: 'Your Name',

            // Navigation
            dashboard: 'Dashboard',
            transactions: 'Transactions',
            categories: 'Categories',
            reports: 'Reports',
            settings: 'Settings',

            // Dashboard
            dashboardPage: {
                personalFinance: 'Personal Finance',
                title: 'Financial Dashboard',
                description: 'Track your income, expenses and balance.',
                addTransaction: 'Add Transaction',
                totalIncome: 'Total Income',
                totalBalance: 'Total Balance',
                totalExpenses: 'Total Expenses',
                closeForm: 'Close form',
            },

            // TransactionForm
            TransactionForm: {
                addTransaction: 'Add Transaction',
                title: 'Title',
                amount: 'Amount',
                type: 'Type',
                date: 'Date',
                category: 'Category',
                example: 'Groceries',
                expense: 'Expense',
                income: 'Income',
                food: 'Food',
                transport: 'Transport',
                shopping: 'Shopping',
                bills: 'Bills',
                other: 'Other',
                salary: 'Salary',
            },

            // TransactionList
            TransactionList: {
                recentTransactions: 'Recent Transactions',
                noTransactions: 'No transactions yet.',
            },

            // common
            common: {
                edit: 'Edit',
                delete: 'Delete',
            },
        },
    },

    fa: {
        translation: {
            // Sidebar
            tagline: 'هوشمندانه پولت را مدیریت کن.',
            menu: 'منو',
            closeMenu: 'بستن منو',
            expandSidebar: 'باز کردن نوار کناری',
            collapseSidebar: 'جمع کردن نوار کناری',
            mainNavigation: 'ناوبری اصلی',
            changeLanguage: 'تغییر زبان',
            lightMode: 'حالت روشن',
            darkMode: 'حالت تاریک',
            switchToLightMode: 'تغییر به حالت روشن',
            switchToDarkMode: 'تغییر به حالت تاریک',
            yourName: 'نام شما',

            // Navigation
            dashboard: 'داشبورد',
            transactions: 'تراکنش‌ها',
            categories: 'دسته‌بندی‌ها',
            reports: 'گزارش‌ها',
            settings: 'تنظیمات',

            // Dashboard
            dashboardPage: {
                personalFinance: 'مدیریت مالی شخصی',
                title: 'داشبورد مالی',
                description:
                    'درآمد، هزینه‌ها و موجودی حساب خود را مدیریت کنید.',
                addTransaction: 'افزودن تراکنش',
                totalIncome: 'مجموع درآمد',
                totalBalance: 'موجودی کل',
                totalExpenses: 'مجموع هزینه‌ها',
                closeForm: 'بستن فرم',
            },

            // TransactionForm
            TransactionForm: {
                addTransaction: 'اضافه کردن تراکنش',
                title: 'عنوان',
                amount: 'مبلغ',
                type: 'نوع',
                date: 'تاریخ',
                category: 'دسته‌بندی',
                example: 'برای مثال: خوراکی',
                expense: 'هزینه',
                income: 'درآمد',
                food: 'غذا و خوراکی',
                transport: 'حمل و نقل',
                shopping: 'خرید کردن',
                bills: 'صورت‌حساب‌ها',
                other: 'دیگر',
                salary: 'حقوق',
            },

            // TransactionList
            TransactionList: {
                recentTransactions: 'تراکنش‌های اخیر',
                noTransactions: 'هنور تراکنشی وجود ندارد.',
            },

            // common
            common: {
                edit: 'ویرایش',
                delete: 'حذف',
            },
        },
    },
};

function updateDocumentLanguage(language: string) {
    const currentLanguage = language.startsWith('fa') ? 'fa' : 'en';

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
}

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') === 'fa' ? 'fa' : 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

updateDocumentLanguage(i18n.language);

i18n.on('languageChanged', (language) => {
    updateDocumentLanguage(language);

    localStorage.setItem('language', language.startsWith('fa') ? 'fa' : 'en');
});

export default i18n;
