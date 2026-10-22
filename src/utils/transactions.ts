import type { Transaction } from '../types';

export function calculateIncome(transactions: Transaction[]): number {
    return transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function calculateExpenses(transactions: Transaction[]): number {
    return transactions
        .filter((transactions) => transactions.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function calculateBalance(transactions: Transaction[]): number {
    return calculateIncome(transactions) - calculateExpenses(transactions);
}
