import { useEffect, useState, useRef } from 'react';
import type {
    NewTransaction,
    Transaction,
    TransactionCategory,
} from '../../types';
import { useTranslation } from 'react-i18next';

type TransactionFormProps = {
    onAdd: (transaction: NewTransaction) => void;
    isOpen: boolean;
    editingTransaction: Transaction | null;
    onUpdate: (transaction: Transaction) => void;
};

export default function TransactionForm({
    onAdd,
    isOpen,
    editingTransaction,
    onUpdate,
}: TransactionFormProps) {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [date, setDate] = useState('');
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [category, setCategory] = useState<TransactionCategory>('food');

    useEffect(() => {
        if (!isOpen) return;

        const timeoutId = window.setTimeout(() => {
            titleInputRef.current?.focus();
        }, 50);

        return () => window.clearTimeout(timeoutId);
    }, [isOpen]);

    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setAmount(editingTransaction.amount);
            setType(editingTransaction.type);
            setDate(editingTransaction.date);
            setCategory(editingTransaction.category);
        } else {
            setTitle('');
            setAmount(0);
            setType('expense');
            setDate('');
            setCategory('other');
        }
    }, [editingTransaction]);

    function handleTypeChange(newType: 'income' | 'expense') {
        setType(newType);
        setCategory(newType === 'income' ? 'salary' : 'other');
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!title.trim() || amount <= 0 || !date) {
            return;
        }

        if (editingTransaction) {
            onUpdate({
                ...editingTransaction,
                title,
                amount,
                type,
                date,
                category,
            });
        } else {
            onAdd({
                title: title.trim(),
                amount,
                type,
                date,
                category,
            });
        }

        setTitle('');
        setAmount(0);
        setType('expense');
        setDate('');
        setCategory('food');
    }

    const inputClasses =
        'mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-blue-400';

    const labelClasses =
        'text-sm font-medium text-slate-700 dark:text-slate-300';

    const categories: TransactionCategory[] =
        type === 'expense'
            ? ['food', 'transport', 'shopping', 'bills', 'other']
            : ['salary', 'other'];

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
        >
            <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">
                {t('TransactionForm.addTransaction')}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className={labelClasses}>
                    {t('TransactionForm.title')}
                    <input
                        ref={titleInputRef}
                        className={inputClasses}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder={t('TransactionForm.example')}
                        required
                    />
                </label>

                <label className={labelClasses}>
                    {t('TransactionForm.amount')}
                    <input
                        className={inputClasses}
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={amount === 0 ? '' : amount}
                        onChange={(event) =>
                            setAmount(Number(event.target.value))
                        }
                        placeholder="0.00"
                        required
                    />
                </label>

                <label className={labelClasses}>
                    {t('TransactionForm.type')}
                    <select
                        className={inputClasses}
                        value={type}
                        onChange={(event) =>
                            handleTypeChange(
                                event.target.value as 'income' | 'expense',
                            )
                        }
                    >
                        <option value="expense">
                            {t('TransactionForm.expense')}
                        </option>
                        <option value="income">
                            {t('TransactionForm.income')}
                        </option>
                    </select>
                </label>

                <label className={labelClasses}>
                    {t('TransactionForm.date')}
                    <input
                        className={inputClasses}
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />
                </label>

                <label className={labelClasses}>
                    {t('TransactionForm.category')}
                    <select
                        className={inputClasses}
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value as TransactionCategory,
                            )
                        }
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {t(`TransactionForm.${item}`)}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <button
                type="submit"
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
                {t('TransactionForm.addTransaction')}
            </button>
        </form>
    );
}
