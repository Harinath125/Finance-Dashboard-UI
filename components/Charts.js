const Charts = () => {
    const { transactions, theme } = useAppContext();
    const trendCanvasRef = React.useRef(null);
    const breakdownCanvasRef = React.useRef(null);
    const trendChartRef = React.useRef(null);
    const breakdownChartRef = React.useRef(null);

    const textColor = theme === 'dark' ? '#cbd5e1' : '#475569';
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    React.useEffect(() => {
        if (!trendCanvasRef.current || !breakdownCanvasRef.current) return;

        // Prepare Trend Data (Balance over time)
        const sortedTrans = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
        let currentBalance = 0;
        const trendLabels = [];
        const trendData = [];

        sortedTrans.forEach(t => {
            currentBalance += t.type === 'income' ? Number(t.amount) : -Number(t.amount);
            trendLabels.push(t.date);
            trendData.push(currentBalance);
        });

        // Prepare Categorical Data (Expenses by category)
        const expenses = transactions.filter(t => t.type === 'expense');
        const categoryTotals = {};
        expenses.forEach(t => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
        });
        
        const catLabels = Object.keys(categoryTotals);
        const catData = Object.values(categoryTotals);
        const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'];

        // Destroy previous charts
        if (trendChartRef.current) trendChartRef.current.destroy();
        if (breakdownChartRef.current) breakdownChartRef.current.destroy();

        // Initialize Trend Chart
        trendChartRef.current = new window.ChartJS(trendCanvasRef.current, {
            type: 'line',
            data: {
                labels: trendLabels.length ? trendLabels : ['No Data'],
                datasets: [{
                    label: 'Balance',
                    data: trendData.length ? trendData : [0],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: gridColor } },
                    y: { ticks: { color: textColor }, grid: { color: gridColor } }
                }
            }
        });

        // Initialize Breakdown Chart
        breakdownChartRef.current = new window.ChartJS(breakdownCanvasRef.current, {
            type: 'doughnut',
            data: {
                labels: catLabels.length ? catLabels : ['No Data'],
                datasets: [{
                    data: catData.length ? catData : [1],
                    backgroundColor: catData.length ? colors.slice(0, catLabels.length) : ['#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { color: textColor } }
                }
            }
        });

        return () => {
            if (trendChartRef.current) trendChartRef.current.destroy();
            if (breakdownChartRef.current) breakdownChartRef.current.destroy();
        };
    }, [transactions, theme]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-name="charts-section">
            <div className="card flex flex-col h-96">
                <h3 className="text-lg font-bold mb-4">Balance Trend</h3>
                <div className="flex-1 relative">
                    <canvas ref={trendCanvasRef}></canvas>
                </div>
            </div>
            <div className="card flex flex-col h-96">
                <h3 className="text-lg font-bold mb-4">Expenses Breakdown</h3>
                <div className="flex-1 relative">
                    <canvas ref={breakdownCanvasRef}></canvas>
                </div>
            </div>
        </div>
    );
};