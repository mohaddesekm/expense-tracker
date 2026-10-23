export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-slate-50 p-6 pl-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto max-w-7xl">
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
            </div>
        </main>
    );
}
