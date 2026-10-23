type SummaryCardType = 'balance' | 'income' | 'expenses';

type CardStyles = {
    icon: string;
    color: string;
};

const cardStyles: Record<SummaryCardType, CardStyles> = {
    balance: {
        icon: '◈',
        color: 'text-blue-600 dark:text-blue-400',
    },
    income: {
        icon: '↗',
        color: 'text-emerald-600 dark:text-emerald-400',
    },
    expenses: {
        icon: '↘',
        color: 'text-rose-600 dark:text-rose-400',
    },
};

type SummaryCardProps = {
    title: string;
    amount: number;
    currency?: string;
    type: SummaryCardType;
};

export default function SummaryCard({
    title,
    amount,
    currency = '$',
    type,
}: SummaryCardProps) {
    const styles = cardStyles[type];

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            <h2
                className={`flex items-center gap-2 text-sm font-medium ${styles.color}`}
            >
                <span aria-hidden="true">{styles.icon}</span>
                {title}
            </h2>

            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {amount.toLocaleString()} {currency}
            </p>
        </article>
    );
}
