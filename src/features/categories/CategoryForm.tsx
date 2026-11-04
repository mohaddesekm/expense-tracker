import { useTranslation } from 'react-i18next';
import type { Category, CategoryType, CategoryIconName } from '../../types';
import { categoryIcons } from './categoryIcons';
import React, { useState } from 'react';

type CategoryFormProps = {
    onAdd: (category: Omit<Category, 'id'>) => void;
    onCancel: () => void;
};

const iconNames = Object.keys(categoryIcons) as CategoryIconName[];

export default function CategoryForm({ onAdd, onCancel }: CategoryFormProps) {
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [type, setType] = useState<CategoryType>('expense');
    const [icon, setIcon] = useState<CategoryIconName>('Utensils');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) return;

        onAdd({
            name: trimmedName,
            type,
            icon,
        });

        setName('');
        setType('expense');
        setIcon('Utensils');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="mb-2 block text-sm font-medium">
                    {t('categoriesPage.categoryName')}
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={t('categoriesPage.categoryName')}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    {t('categoriesPage.all')}
                </label>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={`rounded-xl px-4 py-2 transition duration-300 ${
                            type === 'expense'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                    >
                        {t('categoriesPage.expense')}
                    </button>

                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={`rounded-xl px-4 py-2 transition duration-300 ${
                            type === 'income'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                    >
                        {t('categoriesPage.income')}
                    </button>
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    {t('categoriesPage.selectIcon')}
                </label>

                <div className="grid grid-cols-5 gap-3">
                    {iconNames.map((iconName) => {
                        const Icon = categoryIcons[iconName];

                        return (
                            <button
                                key={iconName}
                                type="button"
                                onClick={() => setIcon(iconName)}
                                aria-pressed={icon === iconName}
                                className={`flex items-center justify-center rounded-xl border p-3 transition duration-300 ${
                                    icon === iconName
                                        ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950'
                                        : 'border-slate-200 dark:border-slate-700'
                                }`}
                            >
                                <Icon size={22} />
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl px-4 py-2 text-slate-600 dark:text-slate-300"
                >
                    {' '}
                    {t('categoriesPage.cancel')}
                </button>

                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="rounded-xl bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {' '}
                    {t('categoriesPage.save')}
                </button>
            </div>
        </form>
    );
}
