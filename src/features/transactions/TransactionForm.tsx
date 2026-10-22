import { useEffect, useState, useRef } from 'react';
import type { NewTransaction } from '../../types';

type TransactionFormProps = {
    onAdd: (transaction: NewTransaction) => void;
    isOpen: boolean;
};

export default function TransactionForm({
    onAdd,
    isOpen,
}: TransactionFormProps) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [date, setDate] = useState('');
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const timeoutId = window.setTimeout(() => {
            titleInputRef.current?.focus();
        }, 50);

        return () => window.clearTimeout(timeoutId);
    }, [isOpen]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!title.trim() || amount <= 0 || !date) {
            return;
        }

        onAdd({
            title: title.trim(),
            amount,
            type,
            date,
        });

        setTitle('');
        setAmount(0);
        setType('expense');
        setDate('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"
        >
            <h2 className="mb-5 text-lg font-bold text-slate-900">
                Add Transaction
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                    Title
                    <input
                        ref={titleInputRef}
                        className="mt-2 w-full rounded-lg border border-slate-300 p-3"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="e.g. Groceries"
                        required
                    />
                </label>

                <label className="text-sm font-medium text-slate-700">
                    Amount
                    <input
                        className="mt-2 w-full rounded-lg border border-slate-300 p-3"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={amount === 0 ? '' : amount}
                        onChange={(event) =>
                            setAmount(Number(event.target.value))
                        }
                        required
                    />
                </label>

                <label className="text-sm font-medium text-slate-700">
                    Type
                    <select
                        className="mt-2 w-full rounded-lg border border-slate-300 p-3"
                        value={type}
                        onChange={(event) =>
                            setType(event.target.value as 'income' | 'expense')
                        }
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </label>

                <label className="text-sm font-medium text-slate-700">
                    Date
                    <input
                        className="mt-2 w-full rounded-lg border border-slate-300 p-3"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />
                </label>
            </div>

            <button
                type="submit"
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Add Transaction
            </button>
        </form>
    );
}
