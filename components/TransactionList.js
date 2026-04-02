const TransactionList = () => {
    const { transactions, role, deleteTransaction } = useAppContext();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterType, setFilterType] = React.useState('all');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingTx, setEditingTx] = React.useState(null);

    const filteredTransactions = React.useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  t.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || t.type === filterType;
            return matchesSearch && matchesType;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, searchTerm, filterType]);

    const handleEdit = (tx) => {
        setEditingTx(tx);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingTx(null);
        setIsModalOpen(true);
    };

    return (
        <div className="card" data-name="transaction-list">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                <h3 className="text-xl font-bold">Recent Transactions</h3>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="relative w-full sm:w-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <div className="icon-search text-slate-400"></div>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="input-field pl-10 py-2 border w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="input-field py-2 px-3 border w-full sm:w-auto"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <button onClick={() => exportToCSV(transactions)} className="btn btn-secondary w-full sm:w-auto" title="Export CSV">
                        <div className="icon-download mr-2"></div> Export
                    </button>
                    {role === 'admin' && (
                        <button onClick={handleAdd} className="btn btn-primary w-full sm:w-auto">
                            <div className="icon-plus mr-2"></div> Add New
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Description</th>
                            <th className="pb-3 font-medium">Category</th>
                            <th className="pb-3 font-medium text-right">Amount</th>
                            {role === 'admin' && <th className="pb-3 font-medium text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map(tx => (
                                <tr key={tx.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="py-4 text-sm whitespace-nowrap">{tx.date}</td>
                                    <td className="py-4 font-medium">{tx.description}</td>
                                    <td className="py-4">
                                        <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-300">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className={`py-4 text-right font-medium whitespace-nowrap ${tx.type === 'income' ? 'text-secondary' : ''}`}>
                                        {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                                    </td>
                                    {role === 'admin' && (
                                        <td className="py-4 text-right whitespace-nowrap">
                                            <button onClick={() => handleEdit(tx)} className="text-slate-400 hover:text-primary mr-3 transition-colors">
                                                <div className="icon-pencil text-lg"></div>
                                            </button>
                                            <button onClick={() => deleteTransaction(tx.id)} className="text-slate-400 hover:text-danger transition-colors">
                                                <div className="icon-trash text-lg"></div>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={role === 'admin' ? 5 : 4} className="py-8 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="icon-inbox text-4xl mb-2 opacity-50"></div>
                                        <p>No transactions found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TransactionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                transactionToEdit={editingTx}
            />
        </div>
    );
};