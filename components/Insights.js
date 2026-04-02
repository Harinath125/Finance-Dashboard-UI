const Insights = () => {
    const { transactions } = useAppContext();

    const insights = React.useMemo(() => {
        if (!transactions.length) return [];
        const res = [];
        
        // Highest spending category
        const expenses = transactions.filter(t => t.type === 'expense');
        if (expenses.length > 0) {
            const catMap = {};
            expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + Number(t.amount); });
            const topCat = Object.keys(catMap).reduce((a, b) => catMap[a] > catMap[b] ? a : b);
            res.push(`Your highest spending category is **${topCat}** with $${catMap[topCat].toFixed(2)}.`);
        }

        // Monthly comparison (mocking current month vs total if spanning multiple)
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
        const exp = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
        
        if (exp > income) {
            res.push("Warning: Your total expenses currently exceed your income.");
        } else if (income > 0) {
            const savingsRate = (((income - exp) / income) * 100).toFixed(1);
            res.push(`Great job! You are saving **${savingsRate}%** of your total income.`);
        }

        return res;
    }, [transactions]);

    if (!insights.length) return null;

    return (
        <div className="card mb-6 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 border-indigo-100 dark:border-indigo-800" data-name="insights">
            <div className="flex items-center mb-3">
                <div className="icon-lightbulb text-indigo-500 text-xl mr-2"></div>
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">Financial Insights</h3>
            </div>
            <ul className="space-y-2">
                {insights.map((text, i) => (
                    <li key={i} className="text-indigo-800 dark:text-indigo-300 flex items-start">
                        <div className="icon-chevron-right mt-1 mr-2 text-sm opacity-70"></div>
                        <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};