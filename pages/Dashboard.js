const Dashboard = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto" data-name="dashboard-page">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track and understand your financial activity.</p>
                </div>
                
                <SummaryCards />
                <Insights />
                <Charts />
                <TransactionList />
            </div>
        </Layout>
    );
};