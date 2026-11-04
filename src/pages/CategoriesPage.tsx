import { useCategories } from '../features/categories/useCategories';
import { categoryIcons } from '../features/categories/categoryIcons';
import CategoryForm from '../features/categories/CategoryForm';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function CategoriesPage() {
    const { categories, addCategory } = useCategories();
    const { t } = useTranslation();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-50 p-6 pl-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <header>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition duration-300 cursor-pointer"
                >
                    {t('categoriesPage.addCategory')}
                </button>
            </header>

            {/* <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Organize your income and expenses by category.
                    </p>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-slate-600 dark:text-slate-400">
                        Your categories will appear here.
                    </p>
                </section>
            </div> */}

            {/* <div>
                {categories.map((category) => {
                    const Icon = categoryIcons[category.icon];
                    return (
                        <div key={category.id}>
                            <Icon size={20} />
                            <span>{category.icon}</span>
                        </div>
                    );
                })}
            </div> */}

            {isFormOpen && (
                <CategoryForm
                    onAdd={(category) => {
                        addCategory(category);
                        setIsFormOpen(false);
                    }}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </main>
    );
}
