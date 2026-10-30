import type { Transaction } from '../../types';
import { useTranslation } from 'react-i18next';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

type TransactionListProps = {
    transactions: Transaction[];
    onDelete: (id: string) => void;
    onEdit: (Transaction: Transaction) => void;
};

export default function TransactionList({
    transactions,
    onDelete,
    onEdit,
}: TransactionListProps) {
    const { t, i18n } = useTranslation();
    const isPersian = i18n.resolvedLanguage?.startsWith('fa') ?? false;

    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    return (
        <section
            dir={isPersian ? 'rtl' : 'ltr'}
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
        >
            <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">
                {t('TransactionList.recentTransactions')}
            </h2>

            {transactions.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('TransactionList.noTransactions')}
                </p>
            ) : (
                <div className="scrollbar-hide overflow-x-auto">
                    <table className="w-full text-start text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <th className="px-3 py-3 font-medium text-start">
                                    {t('TransactionForm.title')}
                                </th>
                                <th className="px-3 py-3 font-medium text-start">
                                    {t('TransactionForm.amount')}
                                </th>
                                <th className="px-3 py-3 font-medium text-start">
                                    {t('TransactionForm.date')}
                                </th>
                                <th className="px-3 py-3 font-medium text-start">
                                    {t('TransactionForm.type')}
                                </th>
                                <th className="px-3 py-3 font-medium text-start">
                                    {t('TransactionForm.category')}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                                >
                                    {/* <td className="relative flex items-center gap-2 text-nowrap px-3 py-4 font-medium text-slate-900 dark:text-slate-100"> */}
                                    <td className="relative px-3 py-4 font-medium text-slate-900 dark:text-slate-100">
                                        <div className="flex w-fit items-center gap-2 whitespace-nowrap">
                                            <button
                                                type="button"
                                                className="cursor-pointer text-slate-400 dark:text-slate-600"
                                                onClick={() =>
                                                    setOpenMenuId(
                                                        openMenuId ===
                                                            transaction.id
                                                            ? null
                                                            : transaction.id,
                                                    )
                                                }
                                            >
                                                <EllipsisVertical size={18} />
                                            </button>

                                            <span>{transaction.title}</span>
                                        </div>

                                        {openMenuId === transaction.id && (
                                            <div className="flex flex-col mt-2 gap-2 absolute -top-8 inset-s-12 dark:bg-slate-900 bg-slate-200 z-90 border rounded-2xl overflow-hidden dark:border-slate-200 border-slate-700">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onEdit(transaction);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
                                                >
                                                    {t('common.edit')}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onDelete(
                                                            transaction.id,
                                                        );
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="rounded-lg px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700"
                                                >
                                                    {t('common.delete')}
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                    <td className="text-nowrap px-3 py-4 font-semibold text-slate-900 dark:text-slate-100">
                                        {transaction.amount.toLocaleString()} $
                                    </td>

                                    <td className="text-nowrap px-3 py-4 text-slate-500 dark:text-slate-400">
                                        {transaction.date}
                                    </td>

                                    <td className="px-3 py-4">
                                        <span
                                            className={
                                                transaction.type === 'income'
                                                    ? 'font-medium text-emerald-600 dark:text-emerald-400'
                                                    : 'font-medium text-rose-600 dark:text-rose-400'
                                            }
                                        >
                                            {t(
                                                `TransactionForm.${transaction.type}`,
                                            )}
                                        </span>
                                    </td>
                                    <td className="text-nowrap px-3 py-4 font-semibold text-slate-900 dark:text-slate-100">
                                        {t(
                                            `TransactionForm.${transaction.category}`,
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
