type SummaryCardType = 'balance' | 'income' | 'expenses';

type CardStyles = {
    icon: string;
    color: string;
};

const cardStyles: Record<SummaryCardType, CardStyles> = {
    balance: {
        icon: '◈',
        color: 'text-blue-600',
    },
    income: {
        icon: '↘',
        color: 'text-emerald-600',
    },
    expenses: {
        icon: '↗',
        color: 'text-rose-600',
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
        <>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className={`text-sm font-medium ${styles.color}`}>
                    <span>{styles.icon}</span> {title}
                </h2>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                    {amount.toLocaleString()} {currency}
                </p>
            </article>
        </>
    );
}
