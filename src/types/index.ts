export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    note?: string;
};

export type NewTransaction = Omit<Transaction, 'id'>;
