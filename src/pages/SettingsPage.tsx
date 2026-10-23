export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-slate-50 p-6 pl-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Customize your application preferences.
                    </p>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold">Appearance</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Choose between light and dark themes using the sidebar
                        toggle.
                    </p>
                </section>
            </div>
        </main>
    );
}
