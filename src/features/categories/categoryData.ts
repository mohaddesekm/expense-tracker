import type { Category } from '../../types';

export const defaultCategories: Category[] = [
    // Expense categories
    {
        id: 'food',
        name: 'Food',
        type: 'expense',
        icon: 'Utensils',
    },
    {
        id: 'transport',
        name: 'Transport',
        type: 'expense',
        icon: 'CarFront',
    },
    {
        id: 'shopping',
        name: 'Shopping',
        type: 'expense',
        icon: 'ShoppingBag',
    },
    {
        id: 'bills',
        name: 'Bills',
        type: 'expense',
        icon: 'House',
    },
    {
        id: 'expense-other',
        name: 'Other',
        type: 'expense',
        icon: 'Package',
    },

    // Income categories
    {
        id: 'salary',
        name: 'Salary',
        type: 'income',
        icon: 'Wallet',
    },
    {
        id: 'income-other',
        name: 'Other',
        type: 'income',
        icon: 'Gift',
    },
];
