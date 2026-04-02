const SummaryCards = () => {
    const { transactions } = useAppContext();

    const stats = React.useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
        const balance = income - expense;

        return { income, expense, balance };
    }, [transactions]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" data-name="summary-cards">
            <div className="card flex items-center p-6">
                <div className="p-4 rounded-full bg-primary bg-opacity-10 text-primary mr-4">
                    <div className="icon-wallet text-2xl"></div>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Balance</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.balance)}</h3>
                </div>
            </div>
            
            <div className="card flex items-center p-6">
                <div className="p-4 rounded-full bg-secondary bg-opacity-10 text-secondary mr-4">
                    <div className="icon-arrow-down-to-line text-2xl"></div>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.income)}</h3>
                </div>
            </div>

            <div className="card flex items-center p-6">
                <div className="p-4 rounded-full bg-danger bg-opacity-10 text-danger mr-4">
                    <div className="icon-arrow-up-from-line text-2xl"></div>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.expense)}</h3>
                </div>
            </div>
        </div>
    );
};