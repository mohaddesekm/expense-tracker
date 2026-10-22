import type { Transaction } from '../../types';

type TransactionListProps = {
    transactions: Transaction[];
};

export default function TransactionList({
    transactions,
}: TransactionListProps) {
    return (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
                Recent Transactions
            </h2>

            {transactions.length === 0 ? (
                <p className="text-sm text-slate-500">No transactions yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500">
                                <th className="px-3 py-3 font-medium">Title</th>
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
                                    className="border-b border-slate-100 last:border-0"
                                >
                                    <td className="px-3 py-4 font-medium text-slate-900">
                                        {transaction.title}
                                    </td>

                                    <td className="px-3 py-4 text-slate-500">
                                        {transaction.date}
                                    </td>

                                    <td className="px-3 py-4">
                                        <span
                                            className={
                                                transaction.type === 'income'
                                                    ? 'text-emerald-600'
                                                    : 'text-rose-600'
                                            }
                                        >
                                            {transaction.type}
                                        </span>
                                    </td>

                                    <td className="px-3 py-4 text-right font-semibold text-slate-900">
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
