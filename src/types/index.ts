export type TransactionCategory =
    | 'food'
    | 'transport'
    | 'shopping'
    | 'bills'
    | 'salary'
    | 'other';

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    category: TransactionCategory;
    date: string;
    note?: string;
};

export type NewTransaction = Omit<Transaction, 'id'>;
