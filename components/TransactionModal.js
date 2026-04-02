const TransactionModal = ({ isOpen, onClose, transactionToEdit }) => {
    const { addTransaction, updateTransaction } = useAppContext();
    
    const [formData, setFormData] = React.useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        category: CATEGORIES[0],
        type: 'expense'
    });

    React.useEffect(() => {
        if (transactionToEdit) {
            setFormData(transactionToEdit);
        } else {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                amount: '',
                category: CATEGORIES[0],
                type: 'expense'
            });
        }
    }, [transactionToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transactionToEdit) {
            updateTransaction(transactionToEdit.id, formData);
        } else {
            addTransaction(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" data-name="transaction-modal">
            <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <div className="icon-x text-xl"></div>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Type</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="type" value="expense" checked={formData.type === 'expense'} onChange={e => setFormData({...formData, type: e.target.value})} className="text-primary focus:ring-primary" />
                                <span>Expense</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="type" value="income" checked={formData.type === 'income'} onChange={e => setFormData({...formData, type: e.target.value})} className="text-primary focus:ring-primary" />
                                <span>Income</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label className="label">Date</label>
                        <input required type="date" className="input-field p-2 border" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>

                    <div>
                        <label className="label">Amount</label>
                        <input required type="number" step="0.01" min="0" className="input-field p-2 border" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
                    </div>

                    <div>
                        <label className="label">Category</label>
                        <select className="input-field p-2 border" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="label">Description</label>
                        <input required type="text" className="input-field p-2 border" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="e.g., Groceries" />
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};