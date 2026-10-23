import type { Transaction } from '../../types';

type TransactionListProps = {
    transactions: Transaction[];
};

export default function TransactionList({
    transactions,
}: TransactionListProps) {
    return (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">
                Recent Transactions
            </h2>

            {transactions.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    No transactions yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <th className="px-3 py-3 font-medium">Title</th>
                                <th className="px-3 py-3 font-medium">Category</th>
                                <th className="px-3 py-3 font-medium">Date</th>
                                <th className="px-3 py-3 font-medium">Type</th>
                                <th className="px-3 py-3 text-right font-medium">
                                    Amount
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                                >
                                    <td className="px-3 py-4 font-medium text-slate-900 dark:text-slate-100">
                                        {transaction.title}
                                    </td>

                                    <td className="px-3 py-4 font-semibold text-slate-900 dark:text-slate-100">
                                        {transaction.category.toUpperCase()}
                                    </td>

                                    <td className="px-3 py-4 text-slate-500 dark:text-slate-400">
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
                                            {transaction.type}
                                        </span>
                                    </td>

                                    <td className="px-3 py-4 text-right font-semibold text-slate-900 dark:text-slate-100">
                                        {transaction.amount.toLocaleString()} $
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
