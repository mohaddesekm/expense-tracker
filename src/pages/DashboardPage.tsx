import { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import type { Transaction, NewTransaction } from '../types';
import {
    calculateBalance,
    calculateExpenses,
    calculateIncome,
} from '../utils/transactions';
import TransactionForm from '../features/transactions/TransactionForm';
import TransactionList from '../features/transactions/TransactionList';

export default function DashboardPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [transactionList, setTransactionList] = useState<Transaction[]>(
        () => {
            const savedTransactions = localStorage.getItem('transactions');

            if (!savedTransactions) {
                return [];
            }

            try {
                const parsedTransactions = JSON.parse(savedTransactions);

                if (!Array.isArray(parsedTransactions)) {
                    return [];
                }

                return parsedTransactions.map((transaction) => ({
                    ...transaction,
                    category: transaction.category ?? 'other',
                })) as Transaction[];
            } catch {
                return [];
            }
        },
    );

    const balance = calculateBalance(transactionList);
    const income = calculateIncome(transactionList);
    const expenses = calculateExpenses(transactionList);

    function handleAddTransaction(newTransaction: NewTransaction) {
        const transaction: Transaction = {
            ...newTransaction,
            id: crypto.randomUUID(),
        };

        setTransactionList((currentTransactions) => [
            transaction,
            ...currentTransactions,
        ]);

        setIsFormOpen(false);
    }

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactionList));
    }, [transactionList]);

    useEffect(() => {
        localStorage.setItem('transaction', JSON.stringify(transactionList));
    }, [transactionList]);

    return (
        <main className="min-h-screen bg-slate-50 p-6 pl-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Personal Finance
                        </p>

                        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                            Financial Dashboard
                        </h1>

                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Track your income, expenses, and balance.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsFormOpen(true)}
                        className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-blue-700"
                    >
                        + Add Transaction
                    </button>
                </header>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <SummaryCard
                        title="Total Income"
                        amount={income}
                        type="income"
                    />

                    <SummaryCard
                        title="Total Balance"
                        amount={balance}
                        type="balance"
                    />

                    <SummaryCard
                        title="Total Expenses"
                        amount={expenses}
                        type="expenses"
                    />
                </section>

                <TransactionList transactions={transactionList} />

                {/* Add Transaction Modal */}
                <div
                    aria-hidden={!isFormOpen}
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm transition-opacity duration-300 ${
                        isFormOpen
                            ? 'visible opacity-100'
                            : 'invisible opacity-0'
                    }`}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsFormOpen(false);
                        }
                    }}
                >
                    <div
                        className={`relative w-full max-w-xl transform transition-all duration-300 ease-out ${
                            isFormOpen
                                ? 'translate-y-0 scale-100'
                                : 'translate-y-4 scale-95'
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            aria-label="Close form"
                            tabIndex={isFormOpen ? 0 : -1}
                            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-slate-600 shadow transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                            ×
                        </button>

                        <TransactionForm
                            onAdd={handleAddTransaction}
                            isOpen={isFormOpen}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
