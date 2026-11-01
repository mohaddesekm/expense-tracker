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

export type CategoryType = 'income' | 'expense';

export type Category = {
    id: string;
    name: string;
    type: CategoryType;
    icon: CategoryIconName;
};

export type CategoryIconName =
    | 'Utensils'
    | 'CarFront'
    | 'ShoppingBag'
    | 'House'
    | 'Package'
    | 'Wallet'
    | 'Gift';
