import './App.css';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './features/transactions/TransactionForm';
import TransactionList from './features/transactions/TransactionList';
import { transactions } from './features/transactions/transactionData';
import {
    calculateIncome,
    calculateExpenses,
    calculateBalance,
} from './utils/transactions';
import type { NewTransaction, Transaction } from './types';
import { useState } from 'react';

export default function App() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [transactionList, setTransactionList] =
        useState<Transaction[]>(transactions);

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

    return (
        <main className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-500">
                            Personal Finance
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            Financial Dashboard
                        </h1>
                        <p className="mt-2 text-slate-600">
                            Track your income, expenses, and balance.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsFormOpen(true)}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-blue-700 cursor-pointer"
                    >
                        + Add Transaction
                    </button>
                </header>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <SummaryCard title="Total Income" amount={income} type="income" />

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

                <div
                    aria-hidden={!isFormOpen}
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm transition-opacity duration-300 ${
                        isFormOpen
                            ? 'visible opacity-100 '
                            : 'invisible opacity-0 '
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
                            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-slate-600 shadow hover:bg-slate-100"
                        >
                            ×
                        </button>

                        <TransactionForm onAdd={handleAddTransaction} isOpen={isFormOpen} />
                    </div>
                </div>
            </div>
        </main>
    );
}
